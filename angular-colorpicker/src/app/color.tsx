export class RGB implements Color {
  value
  constructor()
}


export abstract class Color{
  private value: string;
  abstract toRGB(): string;
  abstract fromRGB(): string;
}
export ColorFactory = (): =>{

}
