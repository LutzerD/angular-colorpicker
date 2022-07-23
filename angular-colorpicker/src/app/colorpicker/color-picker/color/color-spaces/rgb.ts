import {
  PartialColorParser,
  registerFormatter,
  registerParser,
} from '../color';
import { valueWithinRange } from '../utils';
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

export function RegisterRGBColorSpace() {
  registerParser(fromCSSString, 'string');
  registerFormatter(toCSSString, 'rgb');
}
