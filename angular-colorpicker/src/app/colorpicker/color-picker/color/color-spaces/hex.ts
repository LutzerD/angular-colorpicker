import { RGBA_Object } from './rgba';
import { registerFormatter, registerParser } from '../color';

function hexCssToRGBA(hexCode: string): RGBA_Object | null {
  const hexRegex = /#([0-9a-fA-F]{1,8})/;
  try {
    let [_, code] = hexCode.match(hexRegex) as RegExpMatchArray;

    while (code.length < 6) code = code + '0';
    while (code.length < 8) code = code + 'f'; //opacity is default to 1

    return {
      r: parseInt(code.substring(0, 2), 16),
      g: parseInt(code.substring(2, 4), 16),
      b: parseInt(code.substring(4, 6), 16),
      a: parseInt(code.substring(6, 8), 16),
    };
  } catch {
    return null;
  }
}

function rgbaToHexCss({ r, g, b, a }: RGBA_Object): string {
  let hex = '#';
  hex += (r || 0).toString(16);
  hex += (g || 0).toString(16);
  hex += (b || 0).toString(16);
  hex += (a === undefined || a === null ? 1 : a).toString(16);
  return hex;
}

export function RegisterHexColorSpace() {
  registerParser(hexCssToRGBA, 'string');
  registerFormatter(rgbaToHexCss, 'hex');
}
