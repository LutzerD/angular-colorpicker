import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { PercentLocation } from '../bar/draggable.directive';
import { RGB } from '../color';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorPickerComponent {
  public h: number = 0;
  public s = 1;
  public v = 1;
  private a = 1;

  constructor(private ref: ChangeDetectorRef) {}

  @Input() set color(value: string) {
    const [h, s, v] = RGB.fromCSSString(value)!.toHSV();
    if (this.h == h && this.s == s && this.v == v) {
      return;
    } else {
      this.h = h;
      this.s = s;
      this.v = v;
      this.ref.detectChanges();
    }
  }

  get color(): string {
    return RGB.fromHSV(this.h, this.s, this.v, this.a).toRGB();
  }

  @Output() colorChange = new EventEmitter();

  slChanged({ x, y }: PercentLocation) {
    this.s = x;
    this.v = 1 - y;
    this.colorChange.emit(this.color);
    this.ref.detectChanges();
  }

  opacityChanged(percent: number) {
    this.a = percent;
    this.colorChange.emit(this.color);
    this.ref.detectChanges();
  }

  hueChanged(percent: number) {
    this.h = Math.round(percent * 360);
    this.colorChange.emit(this.color);
    this.ref.detectChanges();
  }
}
