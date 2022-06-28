import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PercentLocation } from '../bar/draggable.directive';

export type ColorString = string;

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
  @Input() hue = 0;
  @Output() change = new EventEmitter<PercentLocation>();

  xBackgroundStyle(): string {
    return `linear-gradient(to right, hsla(${this.hue} 100% 50% / 0), hsla(${this.hue} 100% 50% / 1))`;
  }

  markerMoved({ x, y }: PercentLocation) {
    this.markerX = x;
    this.markerY = y;
    this.change.emit({ x, y });
  }

  markerX = 0;
  markerY = 0;

  markerStyle() {
    const format = (num: number): string => Math.round(num * 100) + '%';

    return {
      left: format(this.markerX),
      top: format(this.markerY),
    };
  }
}
