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
}
