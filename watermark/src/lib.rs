use image::{DynamicImage, GenericImageView};
use photon_rs::{base64_to_image, helpers::dyn_image_from_raw, multiple::watermark, PhotonImage};

use lenna_core::plugins::PluginRegistrar;
use lenna_core::{ExifProcessor, ImageProcessor, Processor};

use lenna_core::ProcessorConfig;

extern "C" fn register(registrar: &mut dyn PluginRegistrar) {
    registrar.add_plugin(Box::new(Watermark::default()));
}

#[cfg(feature = "plugin")]
lenna_core::export_plugin!(register);

#[derive(Default, Clone)]
pub struct Watermark {
    config: Config,
}

#[derive(Clone, serde::Serialize, serde::Deserialize)]
struct Config {
    watermark: String,
    x: u32,
    y: u32,
}

impl Default for Config {
    fn default() -> Self {
        Config { watermark: "iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAQAAAAD+Fb1AAAAEElEQVR42mP8X88ABoy4GQB+1gX98SFnuAAAAABJRU5ErkJggg==".to_string(), x: 0, y: 0 }
    }
}

impl ImageProcessor for Watermark {
    fn process_image(
        &self,
        image: &mut Box<DynamicImage>,
    ) -> Result<(), Box<dyn std::error::Error>> {
        let water_mark = base64_to_image(&self.config.watermark);

        let img = DynamicImage::ImageRgba8(image.to_rgba8());
        let mut img: PhotonImage = PhotonImage::new(img.to_bytes(), image.width(), image.height());
        watermark(&mut img, &water_mark, self.config.x, self.config.y);
        let img = dyn_image_from_raw(&img);
        *image = Box::new(img);
        Ok(())
    }
}

impl ExifProcessor for Watermark {}

impl Processor for Watermark {
    fn name(&self) -> String {
        "watermark".into()
    }

    fn title(&self) -> String {
        "Watermark".into()
    }

    fn author(&self) -> String {
        "chriamue".into()
    }

    fn description(&self) -> String {
        "Plugin to watermark images.".into()
    }

    fn process(
        &mut self,
        config: ProcessorConfig,
        image: &mut Box<lenna_core::LennaImage>,
    ) -> Result<(), Box<dyn std::error::Error>> {
        self.config = serde_json::from_value(config.config).unwrap();
        self.process_exif(&mut image.exif).unwrap();
        self.process_image(&mut image.image).unwrap();
        Ok(())
    }

    fn default_config(&self) -> serde_json::Value {
        serde_json::to_value(Config::default()).unwrap()
    }
}

#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;
#[cfg(target_arch = "wasm32")]
lenna_core::export_wasm_plugin!(Watermark);

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn default() {
        let watermark = Watermark::default();
        assert_eq!(watermark.name(), "watermark");
    }
}
