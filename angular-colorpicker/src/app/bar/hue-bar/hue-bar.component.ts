import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { CurrentColorService } from 'src/app/current-color.service';
import { PercentLocation } from '../draggable.directive';

@Component({
  selector: 'app-hue-bar',
  templateUrl: './hue-bar.component.html',
  styleUrls: ['./hue-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HueBarComponent implements OnInit {
  constructor(
    private ref: ChangeDetectorRef,
    private colorService: CurrentColorService
  ) {}

  ngOnInit(): void {
    this.colorService.color$.subscribe((color) => {
      this.x = color ? color.h / 360 : 0;
      this.ref.markForCheck();
    });
  }

  x: number = 0;
  markerMoved({ x, y }: PercentLocation) {
    this.x = x;
    this.colorService.updateHue(this.x * 360);
    this.ref.markForCheck();
  }

  markerStyle() {
    const format = (num: number): string => Math.round(num * 100) + '%';
    const amt = format(this.x);
    return {
      left: amt,
      top: '50%',
    };
  }
}
