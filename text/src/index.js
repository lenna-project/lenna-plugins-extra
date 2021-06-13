const pkg = import('../pkg');
import textIcon from '../assets/text.png';
import Widget from "./Widget";

export const ui = Widget;
export const processor = pkg;
export const name = () => "text";
export const description = () => "Writes text on images.";
export const process = async (config, image) => {
  return import('../pkg').then(processor => processor.process(config, image));
};
export const defaultConfig = async () => {
  return { text: "Hello World!", x: 0, y: 0 };
};
export const icon = () => {
  return textIcon;
}
