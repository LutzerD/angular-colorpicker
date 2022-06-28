import { Conversions } from './color-picker/conversions';

export class RGB implements Color {
  private valueWithinRange(val: number) {
    if (val > 255 || val < 0 || val === null || val === undefined) {
      console.error('Invalid value. Must be between 0 and 255.');
    }
  }

  get hasAlpha(): boolean {
    return this.a != 1 && this.a != 0;
  }

  toRGB(): string {
    const roundAlpha = (a: number) => Math.round(a * 100) / 100;
    if (this.hasAlpha) {
      return `rgba(${this.r} ${this.g} ${this.b} / ${roundAlpha(this.a)})`;
    } else {
      return `rgb(${this.r},${this.g},${this.b})`;
    }
  }

  h: number;
  s: number;
  v: number;

  constructor(
    public r: number,
    public g: number,
    public b: number,
    public a: number = 1
  ) {
    this.valueWithinRange(r);
    this.valueWithinRange(g);
    this.valueWithinRange(b);
    this.valueWithinRange(a);

    const [h, s, v] = Conversions.rgbToHsv(this.r, this.g, this.b);
    this.h = h;
    this.s = s;
    this.v = v;
  }

  static fromRGBString(cssColor: string): RGB | null {
    const rgbRegex: RegExp = /rgb\(([0-9]+) ([0-9]+) ([0-9]+)\)/g;

    try {
      const [_, r, g, b] = Array.from(rgbRegex.exec(cssColor) as string[]);
      return new RGB(parseInt(r), parseInt(g), parseInt(b));
    } catch (error) {
      return null;
    }
  }

  static fromHSV(h: number, s: number, v: number, a: number) {
    const [r, g, b] = Conversions.hsvToRgb(h, s, v);
    return new RGB(r, g, b, a);
  }

  toHSV(): number[] {
    return [this.h, this.s, this.v];
  }
}

export type Color = any;
// export class HSV implements Color {
//   toHSV({r,g,b}:{r:number, g:number, b:number}){
//     const [h,s,v] = Conversions.rgbToHsv(r,g,b);
//   }
//   toRGB(){
//    return Conversions.hsvToRgb(this.h, this.s, this.v);
//   }
// }
