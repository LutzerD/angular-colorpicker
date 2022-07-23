import { Component, Input, TemplateRef } from '@angular/core';
import { Color } from '../colorpicker/color-picker/color/color';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent {
  @Input() pickerTemplate?: TemplateRef<any>;

  color = 'rgb(0 255 255)';

  labelColor() {
    const { v } = new Color(this.color).to('hsv_object');
    if (v <= 0.5) {
      return 'white';
    } else {
      return 'black';
    }
  }

  outletContext() {
    return {
      $implicit: {
        color: this.color,
        change: (color: string) => (this.color = color),
      },
      index: 2,
    };
  }
}
