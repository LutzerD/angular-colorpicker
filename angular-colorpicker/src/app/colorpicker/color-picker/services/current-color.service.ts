import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Color } from '../color/color';

export interface ColorChangeEvent {
    color: Color;
    updatedExternally: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CurrentColorService {
  private _color$ = new BehaviorSubject<ColorChangeEvent | null>(null);

  color$ = this._color$
    .asObservable()
    .pipe(filter((color) => !!color)) as any as Observable<ColorChangeEvent>; 

  latestRGBA: string = '';
  private updated(updatedExternally: boolean = false) {
    const c = new Color({ h: this.h, s: this.s, v: this.v, a: this.a });
    this.latestRGBA = c.to('rgb');
    this._color$.next({
      color: c,
      updatedExternally: updatedExternally,
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

  set(cssColor: string, updatedExternally: boolean = false) {
    if (cssColor === this.latestRGBA) {
      return;
    }

    const { h, s, v, a } = new Color(cssColor).to('hsv_object');
    this.h = h;
    this.s = s;
    this.v = v;
    this.a = a;

    this.updated(updatedExternally);
  }
}
