import { ColorSpace, RGBA } from './color';
import { Conversions } from './conversions';
import { valueWithinRange } from './utils';

export class RGB_Color implements ColorSpace {
  private valid(r: number, g: number, b: number, a: number): boolean {
    return (
      valueWithinRange(r, 0, 255) &&
      valueWithinRange(g, 0, 255) &&
      valueWithinRange(b, 0, 255) &&
      valueWithinRange(a, 0, 1)
    );
  }

  private _type: string = 'RGB';
  get type(): string {
    return this._type;
  }

  private parseRGBString(cssColor: string): RGB | null {
    const rgbRegex: RegExp = /rgb\(([0-9]+) ([0-9]+) ([0-9]+)\)/g;
    try {
      const [_, r, g, b] = Array.from(rgbRegex.exec(cssColor) as string[]);
      return new RGB(parseInt(r), parseInt(g), parseInt(b));
    } catch (error) {
      return null;
    }
  }
}
