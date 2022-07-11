import { Conversions } from './conversions';

export interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

export type SupportedColorFormat = 'rgb' | 'rgba';
export class RGB {
  private valueWithinRange(val: number) {
    if (val > 255 || val < 0 || val === null || val === undefined) {
      console.error('Invalid value. Must be between 0 and 255.');
    }
  }

  get hasAlpha(): boolean {
    return this.a != 1;
  }

  toRGB(includeAlpha: boolean = true): string {
    const roundAlpha = (a: number) => Math.round(a * 100) / 100;
    if (this.hasAlpha && includeAlpha) {
      return `rgba(${this.r} ${this.g} ${this.b} / ${roundAlpha(this.a)})`;
    } else {
      return `rgb(${this.r} ${this.g} ${this.b})`;
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

  static parseRGBAString(cssColor: string): RGB | null {
    const rgbaRegex: RegExp =
      /rgba\(([0-9]+) ([0-9]+) ([0-9]+) \/ ([0-9\.]+)\)/g;

    try {
      const [_, r, g, b, a] = Array.from(rgbaRegex.exec(cssColor) as string[]);
      return new RGB(parseInt(r), parseInt(g), parseInt(b), parseFloat(a));
    } catch (error) {
      return null;
    }
  }

  static parseRGBString(cssColor: string): RGB | null {
    const rgbRegex: RegExp = /rgb\(([0-9]+) ([0-9]+) ([0-9]+)\)/g;
    try {
      const [_, r, g, b] = Array.from(rgbRegex.exec(cssColor) as string[]);
      return new RGB(parseInt(r), parseInt(g), parseInt(b));
    } catch (error) {
      return null;
    }
  }

  static getType(cssColor: string): SupportedColorFormat | null {
    if (cssColor.indexOf('rgb(') > -1) {
      return 'rgb';
    }
    if (cssColor.indexOf('rgba(') > -1) {
      return 'rgba';
    }
    return null;
  }

  static fromCSString(cssColor: string): RGB | null {
    if (!cssColor) {
      return null;
    }
    const type = this.getType(cssColor);
    if (!type) {
      console.error('Unknown color format:', cssColor);
    }

    switch (type) {
      case 'rgb':
        return this.parseRGBString(cssColor);
      case 'rgba':
        return this.parseRGBAString(cssColor);
    }

    return null;
  }

  static fromHSV(h: number, s: number, v: number, a: number = 1) {
    const [r, g, b] = Conversions.hsvToRgb(h, s, v);
    const color = new RGB(r, g, b, a);
    if (s == 0) {
      color.h = h;
    }
    return color;
  }

  toHSV(): number[] {
    return [this.h, this.s, this.v, this.a];
  }

  asRGBObject() {
    return {
      r: this.r,
      g: this.g,
      b: this.b,
      a: this.a, //TODO: Check if a is null if you set it to rgba then rgb
    };
  }

  asHex() {
    return;
  }

  //todo: tests - missing characters from test, incomplete codes, lowercase & uppercase alpha, etc.
  fromHex(hexCode: string) {
    try {
      const rgba = this.hexToRGBA(hexCode);
      Object.assign(this, rgba);
    } catch {
      throw 'No hex code supplied';
    }
  }

  //warning - this function will throw errors
  private hexToRGBA(hexCode: string): RGBA {
    const hexRegex = /#([0-9a-fA-F]{1,8})/;
    let [_, code] = hexCode.match(hexRegex) as RegExpMatchArray;
    while (code.length < 8) code = code + '0';
    return {
      r: parseInt(code.substring(0, 2), 16),
      g: parseInt(code.substring(2, 4), 16),
      b: parseInt(code.substring(4, 6), 16),
      a: parseInt(code.substring(6, 8), 16),
    };
  }

  rgbaToHex({ r, g, b, a }: RGBA): string {
    let hex = '#';
    hex += (r || 0).toString(16);
    hex += (g || 0).toString(16);
    hex += (b || 0).toString(16);
    hex += (a === undefined || a === null ? 1 : a).toString(16);
    return hex;
  }
}
