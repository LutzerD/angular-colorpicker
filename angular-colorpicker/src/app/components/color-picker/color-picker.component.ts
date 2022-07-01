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
import { RGB } from 'src/app/services/color';
import { CurrentColorService } from 'src/app/services/current-color.service';

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
}
