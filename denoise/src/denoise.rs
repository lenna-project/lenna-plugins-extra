use image::{DynamicImage, GenericImage, GenericImageView, ImageBuffer, Rgb, RgbImage, SubImage};
use randomforest::criterion::Mse;
use randomforest::table::TableBuilder;
use randomforest::RandomForestRegressorOptions;
use statistical::mean;

fn diff(a: &u8, b: &u8) -> u8 {
    match a > b {
        true => a - b,
        false => b - a,
    }
}

fn neighbours(x: u32, y: u32, image: &SubImage<&DynamicImage>, channel: usize) -> [f64; 8] {
    let (w, h) = image.dimensions();
    match (x < 1, y < 1, x > w - 2, y > h - 2) {
        (false, false, false, false) => [
            image.get_pixel(x - 1, y - 1)[channel] as f64,
            image.get_pixel(x, y - 1)[channel] as f64,
            image.get_pixel(x + 1, y - 1)[channel] as f64,
            image.get_pixel(x - 1, y)[channel] as f64,
            image.get_pixel(x + 1, y)[channel] as f64,
            image.get_pixel(x - 1, y + 1)[channel] as f64,
            image.get_pixel(x, y + 1)[channel] as f64,
            image.get_pixel(x + 1, y + 1)[channel] as f64,
        ],
        _ => [
            image.get_pixel(x, y)[channel] as f64,
            image.get_pixel(x, y)[channel] as f64,
            image.get_pixel(x, y)[channel] as f64,
            image.get_pixel(x, y)[channel] as f64,
            image.get_pixel(x, y)[channel] as f64,
            image.get_pixel(x, y)[channel] as f64,
            image.get_pixel(x, y)[channel] as f64,
            image.get_pixel(x, y)[channel] as f64,
        ],
    }
}

pub fn features(image: &SubImage<&DynamicImage>) -> Vec<[f64; 8]> {
    let mut features: Vec<[f64; 8]> = Vec::new();
    for pix in image.pixels() {
        let (x, y) = (pix.0, pix.1);
        features.push(neighbours(x, y, image, 0));
        features.push(neighbours(x, y, image, 1));
        features.push(neighbours(x, y, image, 2));
    }
    features
}

pub fn target(image: &SubImage<&DynamicImage>) -> Vec<f64> {
    let mut target: Vec<f64> = Vec::new();
    for pix in image.pixels() {
        let rgba: image::Rgba<u8> = pix.2;
        let (red, green, blue) = (rgba[0], rgba[1], rgba[2]);
        target.push(red as f64);
        target.push(green as f64);
        target.push(blue as f64);
    }
    target
}

pub fn train_predict(
    view: &SubImage<&DynamicImage>,
    out: &mut SubImage<&mut RgbImage>,
    every: usize,
) {
    let features = features(view);
    let target = target(view);

    let mut table_builder = TableBuilder::new();
    let mut count = 0;
    for (xs, y) in features.iter().zip(target.iter()) {
        count += 1;
        if count == every {
            count = 0;
            table_builder.add_row(xs, *y).unwrap();
        }
    }
    let table = table_builder.build().unwrap();

    let mut regressor = RandomForestRegressorOptions::new();
    //regressor.max_features(std::num::NonZeroUsize::new(256).unwrap());
    //regressor.max_samples(std::num::NonZeroUsize::new(256 * 256).unwrap());
    #[cfg(not(target_arch = "wasm32"))]
    let predictor = regressor.seed(42).parallel().fit(Mse, table);
    #[cfg(target_arch = "wasm32")]
    let predictor = regressor.seed(42).fit(Mse, table);

    for pix in view.pixels() {
        let (x, y) = (pix.0, pix.1);
        let rgba: image::Rgba<u8> = pix.2;
        let (red, green, blue) = (rgba[0], rgba[1], rgba[2]);
        let r = predictor.predict(&neighbours(x, y, view, 0)) as u8;
        let g = predictor.predict(&neighbours(x, y, view, 1)) as u8;
        let b = predictor.predict(&neighbours(x, y, view, 2)) as u8;
        let p0 = diff(&red, &r);
        let p1 = diff(&green, &g);
        let p2 = diff(&blue, &b);
        out.put_pixel(x, y, Rgb([p0, p1, p2]));
    }
}

pub fn error_image(image: &DynamicImage, every: usize, threashold: u8) -> DynamicImage {
    let window_size = 256;
    let (width, height) = image.dimensions();
    let mut error_img = ImageBuffer::<Rgb<u8>, Vec<u8>>::new(width, height);
    let mut y = 0;
    while y < height {
        let mut x = 0;
        while x < width {
            let w = window_size.min(width - x);
            let h = window_size.min(height - y);

            let sub_view = SubImage::new(image, x, y, w, h);
            let mut sub_img = error_img.sub_image(x, y, w, h);
            train_predict(&sub_view, &mut sub_img, every);

            x += window_size;
        }
        y += window_size;
    }
    let mut out: ImageBuffer<Rgb<u8>, Vec<u8>> = image.to_rgb8();
    for pix in DynamicImage::ImageRgb8(error_img).pixels() {
        let (x, y) = (pix.0, pix.1);
        let rgba: image::Rgba<u8> = pix.2;
        let (c0, c1, c2) = (rgba[0], rgba[1], rgba[2]);
        let r = match c0 > threashold {
            true => 255,
            _ => 0,
        };
        let g = match c1 > threashold {
            true => 255,
            _ => 0,
        };
        let b = match c2 > threashold {
            true => 255,
            _ => 0,
        };
        out.put_pixel(x, y, Rgb([r, g, b]));
    }
    DynamicImage::ImageRgb8(out)
}

pub fn denoise(image: &DynamicImage, every: usize, threashold: u8) -> DynamicImage {
    let error_img = error_image(image, every, threashold);
    let (width, height) = image.dimensions();
    let sub_view = SubImage::new(image, 0, 0, width, height);
    let mut out: ImageBuffer<Rgb<u8>, Vec<u8>> = image.to_rgb8();
    for pix in error_img.pixels() {
        let (x, y) = (pix.0, pix.1);
        let rgba: image::Rgba<u8> = pix.2;
        let (c0, c1, c2) = (rgba[0], rgba[1], rgba[2]);

        let r = match c0 > threashold {
            true => mean(&neighbours(x, y, &sub_view, 0)) as u8,
            _ => out.get_pixel(x, y)[0],
        };
        let g = match c1 > threashold {
            true => mean(&neighbours(x, y, &sub_view, 1)) as u8,
            _ => out.get_pixel(x, y)[1],
        };
        let b = match c2 > threashold {
            true => mean(&neighbours(x, y, &sub_view, 2)) as u8,
            _ => out.get_pixel(x, y)[2],
        };
        out.put_pixel(x, y, Rgb([r, g, b]));
    }
    DynamicImage::ImageRgb8(out)
}

#[cfg(test)]
mod tests {
    use crate::*;
    use image::io::Reader;
    use image::GenericImageView;

    #[test]
    fn error_image() {
        let denoise = Denoise::default();
        let mut image = Reader::open("../lenna.png").unwrap().decode().unwrap();
        let image = image.crop(0, 0, 256, 256);
        let (w, h) = image.dimensions();
        let img = denoise::error_image(&image, 4, 10);
        let (w2, h2) = img.dimensions();
        assert_eq!(w, w2);
        assert_eq!(h, h2);
        assert_eq!(denoise.name(), "denoise");
        img.save("error.jpg").unwrap();
    }
}
