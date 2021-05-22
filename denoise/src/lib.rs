use image::DynamicImage;

use lenna_core::plugins::PluginRegistrar;
use lenna_core::Processor;
use lenna_core::ProcessorConfig;

pub mod denoise;

extern "C" fn register(registrar: &mut dyn PluginRegistrar) {
    registrar.add_plugin(Box::new(Denoise));
}

#[cfg(feature = "plugin")]
lenna_core::export_plugin!(register);

#[derive(Default, Clone)]
pub struct Denoise;

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

    fn process(&self, config: ProcessorConfig, image: DynamicImage) -> DynamicImage {
        let config: Config = serde_json::from_value(config.config).unwrap();
        denoise::denoise(&image, config.samples, config.threshold)
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
    use image::io::Reader;
    use image::GenericImageView;

    #[test]
    fn default() {
        let denoise = Denoise::default();
        assert_eq!(denoise.name(), "denoise");
    }

    #[test]
    fn process() {
        let denoise = Denoise::default();
        let config = ProcessorConfig {
            id: "denoise".into(),
            config: denoise.default_config(),
        };
        let image = Reader::open("../lenna.png").unwrap().decode().unwrap();
        let (w, h) = image.dimensions();
        let img = denoise.process(config, image);
        let (w2, h2) = img.dimensions();
        assert_eq!(w, w2);
        assert_eq!(h, h2);
        assert_eq!(denoise.name(), "denoise");
        img.save("denoised.jpg").unwrap();
    }
}
