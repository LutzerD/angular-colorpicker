import { RGBA_Object } from './conversions';
import { RGBA } from './utils';

export type ParserInputType = 'string' | 'object';
const parsers: { [inputType: string]: PartialColorParser[] } = {};
const formatters: { [type: string]: ColorFormatter<any> } = {};

export const registerParser = (
  parser: PartialColorParser,
  inputType: ParserInputType
) => {
  parsers[inputType] = parsers[inputType] || [];
  parsers[inputType].push(parser);
};

export const registerFormatter = (
  formatter: ColorFormatter<any>,
  type: string
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

export class Color {
  private rgba!: RGBA;

  private formatterExists(type: string) {
    return !!formatters[type];
  }

  private invalidInput?: any;

  constructor(colorInput: any) {
    const type = typeof colorInput;
    const typeParsers = parsers[type];

    if (!typeParsers) {
      console.error('Unable to parse input ', colorInput, ' invalid type'); //TODO: Does this work if someone makes a wrapper class around e.g. rgba object?
    } else {
      for (const parser of typeParsers) {
        try {
          const rgba = parser(colorInput);
          if (rgba) {
            Object.assign(this, rgba);
            break;
          }
        } catch {
          console.error('Unable to parse ', colorInput);
          this.invalidInput = colorInput;
        }
      }
    }
  }

  to(format: string): any {
    if (this.invalidInput) {
      console.error('Unable to format invalid input: ', this.invalidInput);
    } else {
      if (!this.formatterExists(format)) {
        console.error('Unsupported format: ', format);
      } else {
        return formatters[format](this.rgba);
      }
    }
  }
}

export type PartialColorParser = (colorInput: any) => RGBA_Object;
export type ColorFormatter<T> = (rgba: RGBA_Object) => T;
