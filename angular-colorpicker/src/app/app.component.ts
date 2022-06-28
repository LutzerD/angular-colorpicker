import { Component } from '@angular/core';
import { RGB } from './color';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-colorpicker';
  color = 'rgb(0 0 255)';
  newColor!: string;

  colorChange(color: any) {
    this.color = color;
  }

  labelColor() {
    const [h, s, v] = RGB.fromCSString(this.color)!.toHSV();
    if (v <= 0.5) {
      return 'white';
    } else {
      return 'black';
    }
  }
}
