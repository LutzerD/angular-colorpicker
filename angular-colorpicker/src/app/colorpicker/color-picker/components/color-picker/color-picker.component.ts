import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  ViewChild,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { randomRGB } from 'src/app/colorpicker/color-utils';
import { CurrentColorService } from '../../services/current-color.service';
import { HueBarComponent } from '../bar/hue-bar.component';
import { TransparencyBarComponent } from '../bar/transparency-bar.component';
import { GridComponent } from '../grid/grid.component';

export type PickerType = 'hex' | 'rgba' | 'rgba_object';

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
  set format(t: PickerType) {
    if (!(t == 'hex' || t == 'rgba' || t == 'rgba_object')) {
      console.error('Unknown type: ' + t);
      return;
    } //TODO: does it still set if the error hits?
    this._type = t;
  }

  @ViewChild(GridComponent)
  grid!: GridComponent;

  @ViewChild(HueBarComponent)
  hueBar!: HueBarComponent;

  @ViewChild(TransparencyBarComponent)
  transparencyBar!: TransparencyBarComponent;

  constructor(
    private currentColorService: CurrentColorService,
    private ref: ChangeDetectorRef,
    ) {}
  ngOnInit(): void {
    this.subscriptions.push(
      this.currentColorService.color$
        .pipe(
          filter(({color}) => {
            return color.to('rgba') != this.color;
          })
        )
        .subscribe(({color, updatedExternally}) => {
          this._color = color.to('rgba');
          if(!updatedExternally){
            this.colorChange.emit(color.to(this._type));
          }
        })
    );
  }

  private subscriptions: Subscription[] = [];
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  private _color: string = randomRGB();
  @Input() set color(value: string) {
    this.currentColorService.set(value, true);
  }
  get color(): string {
    return this._color;
  }

  @Output() colorChange = new EventEmitter();
}
