import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { PercentLocation } from './draggable.directive';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent {
  //TODO: change on push?

  @Output() move = new EventEmitter<PercentLocation>();
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
// (low prio) TODO: see how angular material does vertical / horizontal adjustable components
// Would be nice to be able to easily use a vertical bar
