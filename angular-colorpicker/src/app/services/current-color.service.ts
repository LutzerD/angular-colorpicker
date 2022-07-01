import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { RGB } from './color';

export interface HSVA {
  h: number;
  s: number;
  v: number;
  a: number;
  color: RGB;
}

@Injectable({
  providedIn: 'root',
})
export class CurrentColorService {
  private _color$ = new BehaviorSubject<HSVA | null>(null);

  color$ = this._color$
    .asObservable()
    .pipe(filter((color) => !!color)) as any as Observable<HSVA>;

  latestRGBA: string = '';
  private updated() {
    const c = RGB.fromHSV(this.h, this.s, this.v, this.a);
    this.latestRGBA = c.toRGB();
    this._color$.next({
      h: this.h,
      s: this.s,
      v: this.v,
      a: this.a,
      color: RGB.fromHSV(this.h, this.s, this.v, this.a),
    });
  }

  private h: number = 0;
  private s: number = 0;
  private v: number = 0;
  private a: number = 0;

  updateHue(h: number) {
    this.h = h;
    this.updated();
  }

  updateSaturationValue(s: number, v: number) {
    this.s = s;
    this.v = v;
    this.updated();
  }

  updateOpacity(a: number) {
    this.a = a;
    this.updated();
  }

  set(cssColor: string) {
    if (cssColor === this.latestRGBA) {
      return;
    }

    console.log('setting?');
    const [h, s, v, a] = RGB.fromCSString(cssColor)!.toHSV();
    this.h = h;
    this.s = s;
    this.v = v;
    this.a = a;

    this.updated();
  }
}
