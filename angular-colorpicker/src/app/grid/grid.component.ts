import { Component, OnInit } from '@angular/core';
import { PercentLocation } from '../bar/draggable.directive';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
  xBackgroundStyle(): string {
    return `linear-gradient(to right, #ffffff, rgba(0 0 255))`;
  }

  yBackgroundStyle(): string {
    return `linear-gradient(to bottom, rgba(0 0 0 / 0), rgba(0 0 0 / 1))`;
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
