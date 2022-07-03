import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { randomRGB } from 'src/app/colorpicker/color-utils';
import { RGB } from '../../services/color';
import { CurrentColorService } from '../../services/current-color.service';
import { HueBarComponent } from '../bar/hue-bar.component';
import { TransparencyBarComponent } from '../bar/transparency-bar.component';
import { GridComponent } from '../grid/grid.component';

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  providers: [CurrentColorService],
})
export class ColorPickerComponent implements OnDestroy {
  @Input() opacity: boolean = true;

  @ViewChild(GridComponent)
  grid!: GridComponent;

  @ViewChild(HueBarComponent)
  hueBar!: HueBarComponent;

  @ViewChild(TransparencyBarComponent)
  transparencyBar!: TransparencyBarComponent;

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

  private _color: RGB = RGB.fromCSString(randomRGB()) as RGB;
  @Input() set color(value: string) {
    this.currentColorService.set(value);
  }
  get color(): string {
    return this._color?.toRGB();
  }

  @Output() colorChange = new EventEmitter();
}
