use image::{DynamicImage, Rgba};
use imageproc::drawing::{draw_text_mut};
use rusttype::{Font, Scale};
use lenna_core::plugins::PluginRegistrar;
use lenna_core::ProcessorConfig;
use lenna_core::{ExifProcessor, ImageProcessor, Processor};

extern "C" fn register(registrar: &mut dyn PluginRegistrar) {
    registrar.add_plugin(Box::new(Text::default()));
}

#[cfg(feature = "plugin")]
lenna_core::export_plugin!(register);

#[derive(Default, Clone)]
pub struct Text {
    config: Config,
}

#[derive(Clone, serde::Serialize, serde::Deserialize)]
struct Config {
    text: String,
}

impl Default for Config {
    fn default() -> Self {
        Config {
            text: "Hello World!".to_string(),
        }
    }
}


impl ImageProcessor for Text {
    fn process_image(
        &self,
        image: &mut Box<DynamicImage>,
    ) -> Result<(), Box<dyn std::error::Error>> {

        let mut img = DynamicImage::ImageRgba8(image.to_rgba8());
        let font = Vec::from(include_bytes!("../assets/DejaVuSans.ttf") as &[u8]);
        let font = Font::try_from_vec(font).unwrap();
    
        let height = 12.4;
        let scale = Scale {
            x: height * 2.0,
            y: height,
        };
        draw_text_mut(&mut img, Rgba([0u8, 0u8, 0u8, 255u8]), 0, 0, scale, &font, &self.config.text);
        *image = Box::new(img);
        Ok(())
    }
}


impl ExifProcessor for Text {}

impl Processor for Text {
    fn name(&self) -> String {
        "text".into()
    }

    fn title(&self) -> String {
        "Text".into()
    }

    fn author(&self) -> String {
        "chriamue".into()
    }

    fn description(&self) -> String {
        "Plugin to write text on images.".into()
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
lenna_core::export_wasm_plugin!(Text);

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn default() {
        let text = Text::default();
        assert_eq!(text.name(), "text");
    }
}
