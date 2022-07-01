import { Component } from '@angular/core';
import { RGB } from './services/color';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-colorpicker';
  color = 'rgb(0 0 255)';
  color2 = 'rgb(0 255 0)';
  showPickers = true;

  get label1Color() {
    return this.labelColor(this.color);
  }

  get label2Color() {
    return this.labelColor(this.color2);
  }

  labelColor(color: string) {
    const [h, s, v] = RGB.fromCSString(color)!.toHSV();
    if (v <= 0.5) {
      return 'white';
    } else {
      return 'black';
    }
  }
}
