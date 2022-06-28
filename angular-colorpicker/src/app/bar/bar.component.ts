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

  @Output() change = new EventEmitter<number>();
  @Input() type = BarTypes.TRANSPARENT;
  get transparent(): boolean {
    return this.type == BarTypes.TRANSPARENT;
  }

  @Input() hue = 0;
  transparentBackground() {
    return `linear-gradient(to right, transparent, hsl(${this.hue} 100% 50%)),
    repeating-conic-gradient(#eceaec 0% 25%, white 0% 50%) 50% / 20px 20px`;
  }
  @Output() move = new EventEmitter<PercentLocation>();
  markerMoved({ x, y }: PercentLocation) {
    this.markerX = x;
    this.markerY = y;
    this.ref.markForCheck();
    this.change.emit(x);
  }

  markerX = 0;
  markerY = 0;

  markerStyle() {
    const format = (num: number): string => Math.round(num * 100) + '%';
    const amt = format(this.markerX);
    return {
      left: amt,
      top: '50%',
    };
  }
}
// (low prio) TODO: see how angular material does vertical / horizontal adjustable components
// Would be nice to be able to easily use a vertical bar
