import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkerComponent {
  constructor(private ref: ChangeDetectorRef) {}

  private _color?: string;
  @Input()
  set color(s: string) {
    this._color = s;
    if (s != this._color) {
      this._color = s;
      this.ref.detectChanges();
    }
  }

  get color(): string {
    return this._color as string;
  }
}
