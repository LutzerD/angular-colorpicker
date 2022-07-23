import { RGBA_Object } from './color-picker/color/color-spaces/rgba';

const randomR = () => {
  return Math.floor(Math.random() * 256);
};
export const randomRGB = () => {
  return `rgb(${randomR()} ${randomR()} ${randomR()})`;
};
export const randomRGBA = (): RGBA_Object => {
  return {
    r: randomR(),
    g: randomR(),
    b: randomR(),
    a: 1,
  };
};
