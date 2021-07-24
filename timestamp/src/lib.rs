use exif::{Field, In, Tag, Value};
use lenna_core::plugins::PluginRegistrar;
use lenna_core::ProcessorConfig;
use lenna_core::{core::processor::ExifProcessor, core::processor::ImageProcessor, Processor};

extern "C" fn register(registrar: &mut dyn PluginRegistrar) {
    registrar.add_plugin(Box::new(Timestamp::default()));
}

#[cfg(feature = "plugin")]
lenna_core::export_plugin!(register);

#[derive(Default, Clone)]
pub struct Timestamp {
    config: Config,
}

#[derive(Clone, serde::Serialize, serde::Deserialize)]
struct Config {
    datetime: Option<String>,
}

impl Default for Config {
    fn default() -> Self {
        Config {
            datetime: None
        }
    }
}

impl ImageProcessor for Timestamp {}

impl ExifProcessor for Timestamp {
    fn process_exif(&self, exif: &mut Box<Vec<Field>>) -> Result<(), Box<dyn std::error::Error>> {
        match &self.config.datetime {
            Some(datetime) => {
                exif.push(Field {
                    tag: Tag::DateTime,
                    ifd_num: In::PRIMARY,
                    value: Value::Ascii(vec![datetime.clone().into_bytes()]),
                });
            }
            _ => (),
        };
        Ok(())
    }
}

impl Processor for Timestamp {
    fn name(&self) -> String {
        "timestamp".into()
    }

    fn title(&self) -> String {
        "Timestamp".into()
    }

    fn author(&self) -> String {
        "chriamue".into()
    }

    fn description(&self) -> String {
        "Plugin to change timestamp of images.".into()
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
lenna_core::export_wasm_plugin!(Timestamp);

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn default() {
        let timestamp = Timestamp::default();
        assert_eq!(timestamp.name(), "timestamp");
    }

    #[test]
    fn datetime() {
        let timestamp = Timestamp {
            config: Config {
                datetime: Some("2021:07:24 14:25:10".to_string()),
            },
        };
        assert_eq!(timestamp.name(), "timestamp");
        let mut fields = Box::new(Vec::new());
        assert!(timestamp.process_exif(&mut fields).is_ok());
        assert_eq!(fields.len(), 1);
    }
}
