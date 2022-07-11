import { RGBA } from "./utils";
import { PartialColorParser, registerFormatter, registerParser} from "./color";

const valueWithinRange = (val: number, min: number, max: number): boolean{
  if (val === null || val == undefined) return false;
  if (typeof val != 'number') return false;
  return (val >= min && val <= max);
}


function validRGBA(r: number, g: number, b: number, a: number): boolean {
  return valueWithinRange(r, 0,255)
          && valueWithinRange(g, 0,255)
          && valueWithinRange(b, 0,255)
          && valueWithinRange(a, 0,1);
}

const rgbaRegex: RegExp =
/rgba\(([0-9]+) ([0-9]+) ([0-9]+) \/ ([0-9\.]+)\)/g;

const rgbaFromCSSString:PartialColorParser = (cssColor: string) => {
  const [_, r, g, b, a] = Array.from(
    rgbaRegex.exec(cssColor) as string[]
  );

  return {
    r: parseInt(r),
    g: parseInt(g),
    b: parseInt(b),
    a: parseFloat(a)
  };
}

const rgbaFromObject:PartialColorParser = (rgba: RGBA) => {
  const {r,g,b,a} = rgba;
  if(validRGBA(r,g,b,a)){
    return rgba;
  }
  throw 'Weird RGBA';
}

registerParser(rgbaFromCSSString, 'string');
registerParser(rgbaFromObject, 'object');

function toRGBAString({r,g,b,a} : RGBA): string {
  const precision = 5; //TODO: module provider for this?
  const roundAlpha = (a: number) => Math.round(a * (10**precision)) / (10**precision);
  return `rgba(${r} ${g} ${b} / ${roundAlpha(a)})`;
}

registerFormatter(toRGBAString, 'rgba')

