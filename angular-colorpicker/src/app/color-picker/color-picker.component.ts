import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { filter, tap } from 'rxjs/operators';
import { PercentLocation } from '../bar/draggable.directive';
import { RGB } from '../color';
import { CurrentColorService } from '../current-color.service';

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

  constructor(
    private ref: ChangeDetectorRef,
    private currentColorService: CurrentColorService
  ) {
    this.currentColorService.color$
      .pipe(
        tap((color) => console.log('color', color)),
        filter((color) => color?.toRGB() != this.color)
      )
      .subscribe((color) => {
        this._color = color;
        this.colorChange.emit(this._color?.toRGB());
      });
  }

  private _color!: RGB;
  @Input() set color(value: string) {
    this.currentColorService.set(RGB.fromCSString(value) as RGB);
    const [h, s, v] = RGB.fromCSString(value)!.toHSV();
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

  hueMarkerColor(): string {
    const [h, s, v] = RGB.fromCSString(this.color)!.toHSV();
    return `hsl(${h},100%,50%)`;
  }

  get rgbColor(): string {
    return RGB.fromCSString(this.color)!.toRGB(false);
  }
  gridMarkerColor(): string {
    return this.rgbColor;
  }

  transparencyMarkerColor(): string {
    //moving the background in sync would also be cool..
    const val = `linear-gradient(to right, ${this.color}, ${this.color}), repeating-conic-gradient(rgb(236, 234, 236) 0%, rgb(236, 234, 236) 25%, white 0%, white 50%) 50% center / 20px 20px`;
    console.log('too many change detections?');
    return val;
  }
}
