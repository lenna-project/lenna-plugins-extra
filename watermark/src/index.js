const pkg = import("../pkg");
import { isPayed, pay } from "./payment";

const payAddress = "0xb81C8Fb3e8811C239406F39bdDDF056Ea4B8fF37";
const ethPrice = 0.002;

import Widget from "./Widget";
export const ui = Widget;
export const processor = pkg;
export const name = () => "watermark";
export const description = () => "Plugin to add watermark to image.";
export const process = async (config, image) => {
  if (!(await isPayed(payAddress, ethPrice))) {
    if (!(await pay(payAddress, ethPrice))) {
      return image;
    }
  }
  return import("../pkg").then((processor) => processor.process(config, image));
};
export const defaultConfig = async () => {
  return { watermark: "", x: 0, y: 0 };
};
