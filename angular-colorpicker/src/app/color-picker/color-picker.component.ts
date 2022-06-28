import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PercentLocation } from '../bar/draggable.directive';
import { RGB } from '../color';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent {
  public h: number = 0;
  private s = 1;
  private v = 1;
  private a = 1;

  @Input() set color(value: string) {
    const [h, s, v] = RGB.fromRGBString(value)!.toHSV();
    this.h = h;
    this.s = s;
    this.v = v;
  }

  get color(): string {
    return RGB.fromHSV(this.h, this.s, this.v, this.a).toRGB();
  }

  @Output() colorChange = new EventEmitter();

  slChanged({ x, y }: PercentLocation) {
    this.s = x;
    this.v = 1 - y;
    this.colorChange.emit(this.color);
  }

  opacityChanged(percent: number) {
    this.a = percent;
    this.colorChange.emit(this.color);
  }

  hueChanged(percent: number) {
    this.h = Math.round(percent * 360);
    this.colorChange.emit(this.color);
  }
}
