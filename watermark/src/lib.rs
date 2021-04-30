use image::{DynamicImage, GenericImageView};
use photon_rs::{base64_to_image, helpers::dyn_image_from_raw, multiple::watermark, PhotonImage};

use lenna_core::plugins::PluginRegistrar;
use lenna_core::Processor;
use lenna_core::ProcessorConfig;

extern "C" fn register(registrar: &mut dyn PluginRegistrar) {
    registrar.add_plugin(Box::new(Watermark));
}

#[cfg(feature = "plugin")]
lenna_core::export_plugin!(register);

#[derive(Default, Clone)]
pub struct Watermark;

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

    fn process(&self, config: ProcessorConfig, image: DynamicImage) -> DynamicImage {
        let config: Config = serde_json::from_value(config.config).unwrap();
        let water_mark = base64_to_image(&config.watermark);

        let image = DynamicImage::ImageRgba8(image.to_rgba8());
        let mut image: PhotonImage =
            PhotonImage::new(image.to_bytes(), image.width(), image.height());
        watermark(&mut image, &water_mark, config.x, config.y);
        let img = dyn_image_from_raw(&image);
        img
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
    use image::GenericImageView;

    #[test]
    fn default() {
        let watermark = Watermark::default();
        assert_eq!(watermark.name(), "watermark");
    }

    #[test]
    fn process() {
        let watermark = Watermark::default();
        let config = ProcessorConfig {
            id: "watermark".into(),
            config: watermark.default_config(),
        };
        let image = DynamicImage::new_rgba16(64, 64);
        let (w, h) = image.dimensions();
        let img = watermark.process(config, image);
        let (w2, h2) = img.dimensions();
        assert_eq!(w, w2);
        assert_eq!(h, h2);
        assert_eq!(watermark.name(), "watermark");
        img.save("test.jpg").unwrap();
    }
}
