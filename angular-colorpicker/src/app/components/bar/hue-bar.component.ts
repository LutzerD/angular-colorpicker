import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { PercentLocation } from 'src/app/directives/draggable.directive';
import { CurrentColorService } from 'src/app/services/current-color.service';

@Component({
  selector: 'hue-bar',
  templateUrl: './hue-bar.component.html',
  styleUrls: ['./bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HueBarComponent implements OnInit {
  constructor(
    private ref: ChangeDetectorRef,
    private colorService: CurrentColorService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.colorService.color$.subscribe(({ h }) => {
        this.hue = h;
        this.ref.markForCheck();
      })
    );
  }

  subscriptions: Subscription[] = [];
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  get hue(): number {
    return this.x * 359;
  }
  set hue(hue: number) {
    this.x = hue / 360;
  }

  get markerColor(): string {
    return `hsl(${this.hue},100%,50%)`;
  }

  x: number = 0;
  markerMoved({ x }: PercentLocation) {
    this.colorService.updateHue(x * 360);
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
