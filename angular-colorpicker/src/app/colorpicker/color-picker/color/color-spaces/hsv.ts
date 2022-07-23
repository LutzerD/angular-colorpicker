import {
  PartialColorParser,
  registerFormatter,
  registerParser,
} from '../color';
import { RGBA_Object } from './rgba';

export interface HSVA_Object {
  h: number;
  s: number;
  v: number;
  a: number;
}

const hsvToRgb: PartialColorParser = ({
  h,
  s,
  v,
  a,
}: HSVA_Object): RGBA_Object | null => {
  if (h === undefined || s === undefined || v === undefined || a === undefined)
    return null;
  console.log('trying', h, s, v, a);
  const hueSection = h / 60;
  const chroma = v * s;
  const secondLargestComponent = chroma * (1 - Math.abs((hueSection % 2) - 1));
  const matchValue = v - chroma;

  const rgba = getRgbBySection(
    hueSection,
    chroma,
    matchValue,
    secondLargestComponent,
    a
  );
  console.log(rgba);
  return rgba;
};

function rgbaToHsv({ r, g, b, a }: RGBA_Object): HSVA_Object {
  const dRed = r / 255;
  const dGreen = g / 255;
  const dBlue = b / 255;
  const value = Math.max(Math.max(dRed, dGreen), dBlue);
  const chroma = value - Math.min(Math.min(dRed, dGreen), dBlue);
  const saturation = value === 0 ? 0 : chroma / value;
  let hue;
  if (chroma === 0) {
    hue = 0;
  } else if (value === dRed) {
    hue = 60 * ((dGreen - dBlue) / chroma);
  } else if (value === dGreen) {
    hue = 60 * (2 + (dBlue - dRed) / chroma);
  } else {
    hue = 60 * (4 + (dRed - dGreen) / chroma);
  }
  hue = (hue + 360) % 360;
  return {
    h: hue,
    s: saturation,
    v: value,
    a: a,
  };
}

function getRgbBySection(
  hueSection: number,
  chroma: number,
  matchValue: number,
  secondLargestComponent: number,
  alpha: number
): RGBA_Object {
  function convertToInt(input: number) {
    return Math.round(255 * input);
  }
  let red;
  let green;
  let blue;
  if (hueSection >= 0 && hueSection <= 1) {
    red = convertToInt(chroma + matchValue);
    green = convertToInt(secondLargestComponent + matchValue);
    blue = convertToInt(matchValue);
  } else if (hueSection > 1 && hueSection <= 2) {
    red = convertToInt(secondLargestComponent + matchValue);
    green = convertToInt(chroma + matchValue);
    blue = convertToInt(matchValue);
  } else if (hueSection > 2 && hueSection <= 3) {
    red = convertToInt(matchValue);
    green = convertToInt(chroma + matchValue);
    blue = convertToInt(secondLargestComponent + matchValue);
  } else if (hueSection > 3 && hueSection <= 4) {
    red = convertToInt(matchValue);
    green = convertToInt(secondLargestComponent + matchValue);
    blue = convertToInt(chroma + matchValue);
  } else if (hueSection > 4 && hueSection <= 5) {
    red = convertToInt(secondLargestComponent + matchValue);
    green = convertToInt(matchValue);
    blue = convertToInt(chroma + matchValue);
  } else {
    red = convertToInt(chroma + matchValue);
    green = convertToInt(matchValue);
    blue = convertToInt(secondLargestComponent + matchValue);
  }
  return {
    r: red,
    g: green,
    b: blue,
    a: alpha,
  };
}

export function RegisterHSVColorSpace() {
  registerParser(hsvToRgb, 'object');
  registerFormatter(rgbaToHsv, 'hsv_object');
}
