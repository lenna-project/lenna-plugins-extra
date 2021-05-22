use image::{DynamicImage, GenericImage, GenericImageView, ImageBuffer, Rgb, RgbImage, SubImage};
use randomforest::criterion::Mse;
use randomforest::table::TableBuilder;
use randomforest::RandomForestRegressorOptions;
use std::iter::Sum;
use crate::Denoise;

fn mean<'a, T, I>(iter: I) -> Option<f64>
where
    T: Into<f64> + Sum<&'a T> + 'a,
    I: Iterator<Item = &'a T>,
{
    let mut len = 0;
    let sum = iter
        .map(|t| {
            len += 1;
            t
        })
        .sum::<T>();

    match len {
        0 => None,
        _ => Some(sum.into() / len as f64),
    }
}

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

impl Denoise {
    pub fn features(&self, image: &SubImage<&DynamicImage>) -> Vec<[f64; 8]> {
        let mut features: Vec<[f64; 8]> = Vec::new();
        for pix in image.pixels() {
            let (x, y) = (pix.0, pix.1);
            features.push(neighbours(x, y, image, 0));
            features.push(neighbours(x, y, image, 1));
            features.push(neighbours(x, y, image, 2));
        }
        features
    }

    pub fn target(&self, image: &SubImage<&DynamicImage>) -> Vec<f64> {
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

    pub fn train_predict(&self, view: &SubImage<&DynamicImage>, out: &mut SubImage<&mut RgbImage>) {
        let features = self.features(view);
        let target = self.target(view);

        let mut table_builder = TableBuilder::new();
        for (xs, y) in features.iter().zip(target.iter()) {
            table_builder.add_row(xs, *y).unwrap();
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
            let p = diff(&red, &r) + diff(&green, &g) + diff(&blue, &b);
            out.put_pixel(
                x,
                y,
                Rgb([r, g, b]),
            );
        }
    }

    pub fn denoise(&self, image: &DynamicImage) -> DynamicImage {
        let window_size = 16;
        let threashold = 10;
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
                self.train_predict(&sub_view, &mut sub_img);

                x += window_size;
            }
            y += window_size;
        }
        let sub_view = SubImage::new(image, 0, 0, width, height);
        let mut out: ImageBuffer::<Rgb<u8>, Vec<u8>> = image.to_rgb8();
        for pix in DynamicImage::ImageRgb8(error_img).pixels() {
            let (x, y) = (pix.0, pix.1);
            let rgba: image::Rgba<u8> = pix.2;
            let (c0, c1, c2) = (rgba[0], rgba[1], rgba[2]);
            let r = match c0 > threashold {
                true => mean(neighbours(x, y, &sub_view, 0).iter()).unwrap() as u8,
                _ => out.get_pixel(x,y)[0]
            };
            let g = match c1 > threashold {
                true => mean(neighbours(x, y, &sub_view, 1).iter()).unwrap() as u8,
                _ => out.get_pixel(x,y)[1]
            };
            let b = match c2 > threashold {
                true => mean(neighbours(x, y, &sub_view, 2).iter()).unwrap() as u8,
                _ => out.get_pixel(x,y)[2]
            };
            out.put_pixel(
                x,
                y,
                Rgb(
                    [r, g, b]
                ),
            );
        }
        DynamicImage::ImageRgb8(out)
    }
}
