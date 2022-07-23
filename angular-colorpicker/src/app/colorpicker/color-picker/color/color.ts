import { randomRGBA } from '../../color-utils';
import { RegisterHexColorSpace } from './color-spaces/hex';
import { HSVA_Object, RegisterHSVColorSpace } from './color-spaces/hsv';
import { RegisterRGBColorSpace, RGB_Object } from './color-spaces/rgb';
import { RGBA_Object, RegisterRGBAColorSpace } from './color-spaces/rgba';
import { valueWithinRange } from './utils';
export type PartialColorParser = (colorInput: any) => RGBA_Object | null;
export type ColorFormatter<T> = (rgba: RGBA_Object) => T;
export type ParserInputType = 'string' | 'object';
export type ColorInputType = string | RGBA_Object | RGB_Object | HSVA_Object;

export type ColorFormat =
  | 'rgb'
  | 'rgba'
  | 'rgb_object'
  | 'rgba_object'
  | 'hex'
  | 'hsv_object';

const ColorSpaces = [
  RegisterRGBAColorSpace,
  RegisterHexColorSpace,
  RegisterRGBColorSpace,
  RegisterHSVColorSpace,
];

const parsers: { [inputType: string]: PartialColorParser[] } = {};
const formatters: { [type: string]: ColorFormatter<any> } = {};

function validRGBA({ r, g, b, a }: RGBA_Object): boolean {
  return (
    valueWithinRange(r, 0, 255) &&
    valueWithinRange(g, 0, 255) &&
    valueWithinRange(b, 0, 255) &&
    valueWithinRange(a, 0, 1)
  );
}

export const registerParser = (
  parser: PartialColorParser,
  inputType: ParserInputType
) => {
  parsers[inputType] = parsers[inputType] || [];
  parsers[inputType].push(parser);
};

export const registerFormatter = (
  formatter: ColorFormatter<any>,
  type: ColorFormat
) => {
  if (!!formatters[type]) {
    console.error(
      'Duplicate color formatter, formatter already exists: ',
      type
    );
  } else {
    formatters[type] = formatter;
  }
};

ColorSpaces.forEach((cs) => cs());

export class Color {
  private rgba: RGBA_Object = randomRGBA();
  private invalidInput?: any;

  constructor(colorInput: ColorInputType) {
    const type = typeof colorInput;
    const typeParsers = parsers[type];

    if (!typeParsers) {
      console.error('Unable to parse input ', colorInput, ' unknown format.'); //TODO: Does this work if someone makes a wrapper class around e.g. rgba object?
    } else {
      for (const parser of typeParsers) {
        const rgba = parser(colorInput);
        if (!rgba) {
          continue;
        } else if (!validRGBA(rgba)) {
          console.error(
            'Unable to parse input ',
            colorInput,
            ' unknown format.'
          );
        } else {
          this.rgba = rgba;
          return;
        }
      }
    }
    console.error('Unable to parse ', colorInput);
    this.invalidInput = colorInput;
  }

  to(format: ColorFormat): any {
    //If I did each  to_x instead of passing in a type, that would let me have output types..
    if (this.invalidInput) {
      console.error('Unable to format invalid input: ', this.invalidInput);
    } else {
      return formatters[format](this.rgba);
    }
  }
}
