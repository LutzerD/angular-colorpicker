import { Component, Input, OnInit } from '@angular/core';
import { PercentLocation } from '../bar/draggable.directive';

export type ColorString = string;

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
  @Input() color: ColorString = 'rgba(255 0 0 / 1)';

  xBackgroundStyle(): string {
    return `linear-gradient(to right, rgba(255 0 0 / 0), ${this.color})`;
  }

  markerMoved({ x, y }: PercentLocation) {
    this.markerX = x;
    this.markerY = y;
  }

  markerX = 0;
  markerY = 0;

  markerStyle() {
    const format = (num: number): string => Math.round(num * 100) + '%';

    return {
      left: format(this.markerX),
      top: format(0.5),
    };
  }
}
