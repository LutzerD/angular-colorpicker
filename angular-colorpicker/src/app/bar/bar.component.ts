import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { PercentLocation } from './draggable.directive';

export const BarTypes = {
  TRANSPARENT: 'transparent',
  HUE: 'hue',
};

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent {
  //TODO: change on push?

  @Input() type = BarTypes.TRANSPARENT;
  get transparent(): boolean {
    return this.type == BarTypes.TRANSPARENT;
  }
  get hue(): boolean {
    return this.type == BarTypes.HUE;
  }
  @Output() move = new EventEmitter<PercentLocation>();
  markerMoved({ x, y }: PercentLocation) {
    this.markerX = x;
    this.markerY = y;
  }

  backgroundColor(): string {
    return `background: repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%)
    50% / 20px 20px`;
  }
  markerX = 0;
  markerY = 0;

  markerStyle() {
    const format = (num: number): string => Math.round(num * 100) + '%';

    return {
      left: format(this.markerX),
    };
  }
}
// (low prio) TODO: see how angular material does vertical / horizontal adjustable components
// Would be nice to be able to easily use a vertical bar
