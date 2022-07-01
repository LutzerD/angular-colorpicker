import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { RGB } from 'src/app/services/color';
import { CurrentColorService } from 'src/app/services/current-color.service';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  providers: [CurrentColorService],
})
export class ColorPickerComponent implements OnDestroy {
  @Input() opacity: boolean = true;

  constructor(private currentColorService: CurrentColorService) {
    this.subscriptions.push(
      this.currentColorService.color$
        .pipe(filter(({ color }) => color?.toRGB() != this.color))
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

  private _color!: RGB;
  @Input() set color(value: string) {
    this.currentColorService.set(value);
  }

  @Output() colorChange = new EventEmitter();
}
