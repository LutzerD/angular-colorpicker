import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  ViewChild,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { randomRGB } from 'src/app/colorpicker/color-utils';
import { RGB } from '../../color/color';
import { CurrentColorService } from '../../services/current-color.service';
import { HueBarComponent } from '../bar/hue-bar.component';
import { TransparencyBarComponent } from '../bar/transparency-bar.component';
import { GridComponent } from '../grid/grid.component';

export type PickerType = 'hex' | 'rgba' | 'rgba-object';

@Component({
  selector: 'color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  providers: [CurrentColorService],
})
export class ColorPickerComponent implements OnDestroy, OnInit {
  @Input() opacity: boolean = true;

  private _type: PickerType = 'rgba';
  @Input()
  set type(t: PickerType) {
    if (!(t == 'hex' || t == 'rgba' || t == 'rgba-object')) {
      console.error('Unknown type: ' + t);
    } //TODO: does it still set if the error hits?
    this._type = t;
  }

  get type(): PickerType {
    return this._type;
  }

  @ViewChild(GridComponent)
  grid!: GridComponent;

  @ViewChild(HueBarComponent)
  hueBar!: HueBarComponent;

  @ViewChild(TransparencyBarComponent)
  transparencyBar!: TransparencyBarComponent;

  constructor(private currentColorService: CurrentColorService) {}
  ngOnInit(): void {
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

  private subscriptions: Subscription[] = [];
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
