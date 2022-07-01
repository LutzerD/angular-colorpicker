import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { CurrentColorService } from 'src/app/current-color.service';
import { PercentLocation } from '../draggable.directive';

@Component({
  selector: 'app-transparency-bar',
  templateUrl: './transparency-bar.component.html',
  styleUrls: ['./transparency-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransparencyBarComponent implements OnInit {
  constructor(
    private ref: ChangeDetectorRef,
    private colorService: CurrentColorService
  ) {}

  ngOnInit(): void {
    this.colorService.color$.subscribe((color) => {
      this.x = color ? color.a : 1;
      console.log(this.x);
      this.rgb = color?.toRGB(false) as string;
      this.rgba = color?.toRGB() as string;
      this.ref.markForCheck();
    });
  }

  rgb!: string;
  rgba!: string;
  transparentBackground() {
    return `linear-gradient(to right, transparent, ${this.rgb}),
    repeating-conic-gradient(#eceaec 0% 25%, white 0% 50%) 50% / 20px 20px`;
  }
  x: number = 0;
  markerMoved({ x, y }: PercentLocation) {
    this.x = x;
    this.colorService.updateOpacity(this.x);
    this.ref.markForCheck();
  }

  get markerColor(): string {
    //moving the background in sync would also be cool..
    const val = `linear-gradient(to right, ${this.rgba}, ${this.rgba}), repeating-conic-gradient(rgb(236, 234, 236) 0%, rgb(236, 234, 236) 25%, white 0%, white 50%) 50% center / 20px 20px`;
    console.log('too many change detections?');
    return val;
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
