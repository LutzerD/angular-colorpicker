import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { PercentLocation } from '../../directives/draggable.directive';
import { CurrentColorService } from '../../services/current-color.service';

export type ColorString = string;

@Component({
  selector: 'grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent implements OnInit, OnDestroy {
  h = 0;
  x = 0;
  y = 0;

  constructor(
    private ref: ChangeDetectorRef,
    private colorService: CurrentColorService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.colorService.color$.subscribe(({ h, s, v, color }) => {
        console.log(h);
        this.h = h;
        this.x = s;
        this.y = 1 - v;
        this.rgb = color.to('rgb');
        this.ref.markForCheck();
      })
    );
  }

  subscriptions: Subscription[] = [];
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  rgb!: string;
  get markerColor(): string {
    return this.rgb;
  }

  xBackgroundStyle(): string {
    return `linear-gradient(to right, hsla(${this.h} 100% 50% / 0), hsla(${this.h} 100% 50% / 1))`;
  }

  markerMoved({ x, y }: PercentLocation) {
    this.x = x;
    this.y = y;
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
