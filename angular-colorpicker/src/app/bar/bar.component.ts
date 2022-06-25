import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarComponent {
  constructor(private ref: ChangeDetectorRef) {}

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
    this.ref.markForCheck();
  }

  markerX = 0;
  markerY = 0;

  markerStyle() {
    const format = (num: number): string => Math.round(num * 100) + '%';
    const amt = format(this.markerX);
    return {
      left: amt,
    };
  }
}
// (low prio) TODO: see how angular material does vertical / horizontal adjustable components
// Would be nice to be able to easily use a vertical bar
