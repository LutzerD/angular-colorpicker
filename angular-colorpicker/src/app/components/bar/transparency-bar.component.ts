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
  selector: 'transparency-bar',
  templateUrl: './transparency-bar.component.html',
  styleUrls: ['./bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransparencyBarComponent implements OnInit {
  constructor(
    private ref: ChangeDetectorRef,
    private colorService: CurrentColorService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.colorService.color$.subscribe(({ a, color }) => {
        this.x = a;
        this.rgb = color?.toRGB(false) as string;
        this.rgba = color?.toRGB() as string;
        this.ref.markForCheck();
      })
    );
  }

  subscriptions: Subscription[] = [];
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  rgb!: string;
  rgba!: string;
  transparentBackground() {
    return `linear-gradient(to right, transparent, ${this.rgb}),
    repeating-conic-gradient(#eceaec 0% 25%, white 0% 50%) 50% / 20px 20px`;
  }

  private x: number = 0;
  markerMoved({ x, y }: PercentLocation) {
    this.x = x;
    this.colorService.updateOpacity(this.x);
    this.ref.markForCheck();
  }

  get markerColor(): string {
    //moving the background in sync would also be cool..
    return `linear-gradient(to right, ${this.rgba}, ${this.rgba}), repeating-conic-gradient(rgb(236, 234, 236) 0%, rgb(236, 234, 236) 25%, white 0%, white 50%) 50% center / 20px 20px`;
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
