import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { PercentLocation } from '../bar/draggable.directive';
import { CurrentColorService } from '../current-color.service';

export type ColorString = string;

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnInit {
  h = 0;
  x = 0;
  y = 0;
  @Input() markerColor?: string;

  @Output() change = new EventEmitter<PercentLocation>();

  constructor(
    private ref: ChangeDetectorRef,
    private colorService: CurrentColorService
  ) {}

  ngOnInit(): void {
    this.colorService.color$.subscribe((color) => {
      this.h = color.h;
      this.x = color.s;
      this.y = 1 - color.v;
      this.ref.markForCheck();
    });
  }

  xBackgroundStyle(): string {
    return `linear-gradient(to right, hsla(${this.h} 100% 50% / 0), hsla(${this.h} 100% 50% / 1))`;
  }

  markerMoved({ x, y }: PercentLocation) {
    this.x = x;
    this.y = y;
    this.change.emit({ x, y });
    this.colorService.updateSaturationValue(x, 1 - y);
    this.ref.detectChanges();
  }

  markerStyle() {
    const format = (num: number): string => Math.round(num * 100) + '%';

    return {
      left: format(this.x),
      top: format(this.y),
    };
  }
}
