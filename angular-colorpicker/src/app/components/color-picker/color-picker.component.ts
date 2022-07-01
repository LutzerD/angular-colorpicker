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
  constructor(
    private ref: ChangeDetectorRef,
    private currentColorService: CurrentColorService
  ) {
    this.currentColorService.color$
      .pipe(filter(({ color }) => color?.toRGB() != this.color))
      .subscribe(({ color }) => {
        this._color = color;
        this.colorChange.emit(this._color?.toRGB());
      });
  }

  private _color!: RGB;
  @Input() set color(value: string) {
    this.currentColorService.set(value);
  }

  @Output() colorChange = new EventEmitter();
}
