import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { RGB } from './color';

@Injectable({
  providedIn: 'root',
})
export class CurrentColorService {
  private color: RGB = RGB.fromCSString('rgb(255,0,0)') as RGB;
  private _color$ = new BehaviorSubject<RGB | null>(null);
  color$ = this._color$
    .asObservable()
    .pipe(filter((color) => !!color)) as any as Observable<RGB>;

  private updated() {
    this._color$.next(this.color);
  }

  updateHue(h: number) {
    const { s, v, a } = this.color;
    this.color = RGB.fromHSV(h, s, v, a);
    this.updated();
  }

  updateSaturationValue(s: number, v: number) {
    const { h, a } = this.color;
    this.color = RGB.fromHSV(h, s, v, a);
    this.updated();
  }

  updateOpacity(a: number) {
    const { h, s, v } = this.color;
    this.color = RGB.fromHSV(h, s, v, a);
    this.updated();
  }

  set(color: RGB) {
    this.color = color;
    this.updated();
  }
}
