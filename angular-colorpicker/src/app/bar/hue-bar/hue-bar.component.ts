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
      this.hue = color.h;
      this.ref.markForCheck();
    });
  }

  get hue(): number {
    return this.x * 360;
  }
  set hue(hue: number) {
    this.x = hue / 360;
  }

  get markerColor(): string {
    return `hsl(${this.hue},100%,50%)`;
  }

  x: number = 0;
  markerMoved({ x }: PercentLocation) {
    this.x = x;
    this.colorService.updateHue(this.hue);
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
