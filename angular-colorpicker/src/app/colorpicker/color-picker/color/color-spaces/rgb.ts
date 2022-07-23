import {
  PartialColorParser,
  registerFormatter,
  registerParser,
} from '../color';
import { RGBA_Object } from './rgba';

export interface RGB_Object {
  r: number;
  g: number;
  b: number;
}
const fromCSSString: PartialColorParser = (
  cssColor: string
): RGBA_Object | null => {
  const rgbRegex: RegExp = /rgb\(([0-9]+) ([0-9]+) ([0-9]+)\)/g;
  try {
    const [_, r, g, b] = Array.from(rgbRegex.exec(cssColor) as string[]);
    const rgb = {
      r: parseInt(r),
      g: parseInt(g),
      b: parseInt(b),
      a: 1,
    };
    return rgb;
  } catch (error) {
    return null;
  }
};

function toCSSString({ r, g, b }: RGBA_Object): string {
  return `rgb(${r} ${g} ${b})`;
}

function fromRGBObject({ r, g, b }: RGB_Object): RGBA_Object | null {
  if (r === undefined || g === undefined || b === undefined) return null;
  return {
    r,
    g,
    b,
    a: 1,
  };
}

export function RegisterRGBColorSpace() {
  registerParser(fromCSSString, 'string');
  registerFormatter(toCSSString, 'rgb');
  registerParser(fromRGBObject, 'object');
}
