import { Component } from '@angular/core';
import { RGB } from 'src/app/services/color';
const randomR = () => {
  return Math.floor(Math.random() * 256);
};
const randomRGB = () => {
  return `rgb(${randomR()} ${randomR()} ${randomR()})`;
};
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent {
  color = randomRGB();
  color2 = randomRGB();

  labelColor() {
    const [h, s, v] = RGB.fromCSString(this.color)!.toHSV();
    if (v <= 0.5) {
      return 'white';
    } else {
      return 'black';
    }
  }
}
