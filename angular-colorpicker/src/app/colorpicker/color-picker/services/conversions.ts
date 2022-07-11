import { RGBA } from './color';

export interface RGBA_Object {
  r: number;
  g: number;
  b: number;
  a: number;
}

export class Conversions {
  static hsvToRgb(hue: number, saturation: number, value: number) {
    const chroma = value * saturation;
    const hueSection = hue / 60;
    const secondLargestComponent =
      chroma * (1 - Math.abs((hueSection % 2) - 1));
    const matchValue = value - chroma;
    return Conversions.getRgbBySection(
      hueSection,
      chroma,
      matchValue,
      secondLargestComponent
    );
  }

  static rgbToHsv(red: number, green: number, blue: number) {
    const dRed = red / 255;
    const dGreen = green / 255;
    const dBlue = blue / 255;
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
    return [hue, saturation, value];
  }

  static getRgbBySection(
    hueSection: number,
    chroma: number,
    matchValue: number,
    secondLargestComponent: number
  ) {
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
    return [red, green, blue];
  }

  static rgbToHex(r: number, g: number, b: number) {}

  //This will throw system errors if the input isn't valid
  static hexToRGBA(hexCode: string): RGBA {
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

  static rgbaObjectToHex({ r, g, b, a }: RGBA_Object): string {
    let hex = '#';
    hex += (r || 0).toString(16);
    hex += (g || 0).toString(16);
    hex += (b || 0).toString(16);
    hex += (a === undefined || a === null ? 1 : a).toString(16);
    return hex;
  }
}
