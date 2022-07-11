import { Conversions, RGBA_Object } from './conversions';

export interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

export type SupportedColorFormat = 'rgb' | 'rgba' | 'hex';
export class Color {
  get hasAlpha(): boolean {
    return this.a != 1;
  }

  toRGBAString(includeAlpha: boolean = true): string {
    const roundAlpha = (a: number) => Math.round(a * 100) / 100;
    if (this.hasAlpha && includeAlpha) {
      return `rgba(${this.r} ${this.g} ${this.b} / ${roundAlpha(this.a)})`;
    } else {
      return `rgb(${this.r} ${this.g} ${this.b})`;
    }
  }

  static getType(cssColor: string): SupportedColorFormat | null {
    if (cssColor.indexOf('rgb(') > -1) {
      return 'rgb';
    }
    if (cssColor.indexOf('rgba(') > -1) {
      return 'rgba';
    }
    if (cssColor.indexOf('#') > -1) {
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

  asRGBObject(): RGBA_Object {
    return {
      r: this.r,
      g: this.g,
      b: this.b,
      a: this.a, //TODO: Check if a is null if you set it to rgba then rgb
    };
  }

  fromHex(hexCode: string) {
    const rgba = this.hexToRGBA(hexCode);
    Object.assign(this, rgba);
  }

  //This will throw an error
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
}

export interface ColorSpace {
  type: string;
  rgbaFromCSSString(cssColor: string): RGBA;
}
