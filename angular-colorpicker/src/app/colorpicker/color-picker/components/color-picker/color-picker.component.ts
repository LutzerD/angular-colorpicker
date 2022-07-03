import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { RGB } from '../../services/color';
import { CurrentColorService } from '../../services/current-color.service';

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  providers: [CurrentColorService],
})
export class ColorPickerComponent implements OnDestroy {
  @Input() opacity: boolean = true;

  constructor(private currentColorService: CurrentColorService) {
    this.subscriptions.push(
      this.currentColorService.color$
        .pipe(
          filter(({ color }) => {
            return color?.toRGB() != this.color;
          })
        )
        .subscribe(({ color }) => {
          this._color = color;
          this.colorChange.emit(this._color?.toRGB());
        })
    );
  }

  subscriptions: Subscription[] = [];
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  private _color: RGB = RGB.fromCSString('rgb(255 200 0)') as RGB;
  @Input() set color(value: string) {
    this.currentColorService.set(value);
  }
  get color(): string {
    return this._color?.toRGB();
  }

  @Output() colorChange = new EventEmitter();
}
