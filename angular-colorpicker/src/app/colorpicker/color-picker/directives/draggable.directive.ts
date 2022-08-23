import {
  Directive,
  EventEmitter,
  ElementRef,
  HostListener,
  Output,
  OnDestroy,
  Input,
  TemplateRef,
} from '@angular/core';
import { merge, of, Subject } from 'rxjs';
import { take, takeUntil, startWith, tap, filter } from 'rxjs/operators';
import { MarkerComponent } from '../components/marker/marker.component';

enum KEY_CODE {
  ArrowDown = 'ArrowDown',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  ArrowUp = 'ArrowUp',
}
const Velocity = { x: 0.03, y: 0.03 };
const KeyMap: { [key: string]: PercentLocation } = {
  ArrowUp: { y: -Velocity.y, x: 0 },
  ArrowDown: { y: Velocity.y, x: 0 },
  ArrowLeft: { x: -Velocity.x, y: 0 },
  ArrowRight: { x: Velocity.x, y: 0 },
} as any;

export interface PercentLocation {
  x: number;
  y: number;
}
@Directive({
  selector: '[appDraggable]',
})
export class DraggableDirective {
  @Input('appDraggable') marker!: MarkerComponent;

  private selected$ = new Subject<PercentLocation>();
  @HostListener('mousedown', ['$event']) mouseDown(event: MouseEvent) {
    merge(
      of(this.convertMousePosition(event)),
      this.move$.pipe(takeUntil(this.deselected$)),
      this.deselected$.pipe(take(1))
    ).subscribe((val: any) => this.move(val));
  }

  private deselected$ = new Subject<PercentLocation>();
  @HostListener('document:mouseup', ['$event']) mouseUp(event: MouseEvent) {
    this.deselected$.next(this.convertMousePosition(event));
  }

  private move$ = new Subject<PercentLocation>();
  @HostListener('document:mousemove', ['$event']) mouseMove(event: MouseEvent) {
    this.move$.next(this.convertMousePosition(event));
  }

  private keyUp$ = new Subject<KEY_CODE>();
  private keyDown$ = new Subject<KEY_CODE>();
  private focusout$ = new Subject<null>();

  listeningToKeys: any = {};
  @HostListener('keyup', ['$event'])
  keyUpHandler(event: KeyboardEvent) {
    this.keyUp$.next(event.key as KEY_CODE);
  }

  @HostListener('focusout', ['$event'])
  blur(event: KeyboardEvent) {
    this.focusout$.next();
  }

  @HostListener('keydown', ['$event'])
  keyDownHandler(event: KeyboardEvent) {
    if (KeyMap[event.key]) {
      if (!this.listeningToKeys[event.key]) {
        this.watchKey(event.key as KEY_CODE);
        this.listeningToKeys[event.key] = true;
      }
      this.keyDown$.next(event.key as KEY_CODE);
    }
  }

  get hostElement(): HTMLElement {
    return this.el.nativeElement as HTMLElement;
  }

  private clipPercent(value: number): number {
    if (value <= 0) {
      return 0;
    } else if (value >= 1) {
      return 1;
    } else {
      return value;
    }
  }

  private convertKey(key: KEY_CODE): PercentLocation {
    const { x, y } = KeyMap[key];
    return {
      x: this.clipPercent(this.latestPosition.x + x),
      y: this.clipPercent(this.latestPosition.y + y),
    };
  }

  private convertMousePosition(mouseEvent: MouseEvent): PercentLocation {
    const rect: DOMRect = this.hostElement.getBoundingClientRect();

    const x = mouseEvent.pageX - (rect.left + window.scrollX);
    const y = mouseEvent.pageY - (rect.top + window.scrollY);

    return {
      x: this.clipPercent(x / rect.width),
      y: this.clipPercent(y / rect.height),
    };
  }

  latestPosition: PercentLocation = { x: 0, y: 0 };
  private move(e: PercentLocation) {
    this.latestPosition = e;
    this.onMove.emit(e);
  }

  watchKey(code: KEY_CODE) {
    this.keyDown$
      .pipe(
        filter((keycode) => code === keycode),
        takeUntil(
          merge(
            this.keyUp$.pipe(filter((keycode) => code === keycode)),
            this.focusout$
          ).pipe(
            tap((_) => {
              this.listeningToKeys[code] = false;
            })
          )
        )
      )
      .subscribe((key) => {
        this.listeningToKeys[key] = false;
        this.move(this.convertKey(key));
      });
  }

  @Output() onMove = new EventEmitter<PercentLocation>();
  constructor(private el: ElementRef) {}
}
