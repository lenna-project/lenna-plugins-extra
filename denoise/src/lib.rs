use image::DynamicImage;

use lenna_core::plugins::PluginRegistrar;
use lenna_core::ProcessorConfig;
use lenna_core::{core::processor::ExifProcessor, core::processor::ImageProcessor, Processor};

pub mod denoise;

extern "C" fn register(registrar: &mut dyn PluginRegistrar) {
    registrar.add_plugin(Box::new(Denoise::default()));
}

#[cfg(feature = "plugin")]
lenna_core::export_plugin!(register);

#[derive(Default, Clone)]
pub struct Denoise {
    config: Config,
}

#[derive(Clone, serde::Serialize, serde::Deserialize)]
struct Config {
    samples: usize,
    threshold: u8,
}

impl Default for Config {
    fn default() -> Self {
        Config {
            samples: 64,
            threshold: 20,
        }
    }
}

impl ImageProcessor for Denoise {
    fn process_image(
        &self,
        image: &mut Box<DynamicImage>,
    ) -> Result<(), Box<dyn std::error::Error>> {
        denoise::denoise(&image, self.config.samples, self.config.threshold);
        Ok(())
    }
}

impl ExifProcessor for Denoise {}

impl Processor for Denoise {
    fn name(&self) -> String {
        "denoise".into()
    }

    fn title(&self) -> String {
        "Denoise".into()
    }

    fn author(&self) -> String {
        "chriamue".into()
    }

    fn description(&self) -> String {
        "Plugin to denoise images.".into()
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
lenna_core::export_wasm_plugin!(Denoise);

#[cfg(test)]
mod tests {
    use super::*;
    use image::GenericImageView;

    #[test]
    fn default() {
        let denoise = Denoise::default();
        assert_eq!(denoise.name(), "denoise");
    }

    #[test]
    fn process() {
        let mut denoise = Denoise::default();
        let config = ProcessorConfig {
            id: "denoise".into(),
            config: denoise.default_config(),
        };
        let mut image =
            Box::new(lenna_core::io::read::read_from_file("../lenna.png".into()).unwrap());

        let (w, h) = image.image.dimensions();
        denoise.process(config, &mut image).unwrap();
        let (w2, h2) = image.image.dimensions();
        assert_eq!(w, w2);
        assert_eq!(h, h2);
        assert_eq!(denoise.name(), "denoise");
        image.name = "denoised".to_string();
        lenna_core::io::write::write_to_file(&image, image::ImageOutputFormat::Jpeg(80)).unwrap();
    }
}
