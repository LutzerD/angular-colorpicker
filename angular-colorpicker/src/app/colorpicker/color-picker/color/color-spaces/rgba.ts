import { valueWithinRange } from '../utils';
import {
  registerParser,
  registerFormatter,
  PartialColorParser,
} from '../color';

export function RegisterRGBAColorSpace() {
  registerParser(rgbaFromCSSString, 'string');
  registerFormatter(toRGBAString, 'rgba');
}

export interface RGBA_Object {
  r: number;
  g: number;
  b: number;
  a: number;
}

function validRGBA(r: number, g: number, b: number, a: number): boolean {
  return (
    valueWithinRange(r, 0, 255) &&
    valueWithinRange(g, 0, 255) &&
    valueWithinRange(b, 0, 255) &&
    valueWithinRange(a, 0, 1)
  );
}

function toRGBAString({ r, g, b, a }: RGBA_Object): string {
  const precision = 5; //fixme: module provider for this?
  const roundAlpha = (a: number) =>
    Math.round(a * 10 ** precision) / 10 ** precision;
  return `rgba(${r} ${g} ${b} / ${roundAlpha(a)})`;
}

const rgbaFromCSSString: PartialColorParser = (cssColor: string) => {
  try {
    const rgbaRegex: RegExp =
      /rgba\(([0-9]+) ([0-9]+) ([0-9]+) \/ ([0-9\.]+)\)/g;

    const [_, r, g, b, a] = Array.from(rgbaRegex.exec(cssColor) as string[]);

    return {
      r: parseInt(r),
      g: parseInt(g),
      b: parseInt(b),
      a: parseFloat(a),
    };
  } catch {
    return null;
  }
};
