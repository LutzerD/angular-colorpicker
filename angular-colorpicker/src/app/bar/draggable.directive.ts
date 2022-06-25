import {
  Directive,
  EventEmitter,
  ElementRef,
  HostListener,
  Output,
} from '@angular/core';
import { Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { OutputEmitter } from '@angular/compiler/src/output/abstract_emitter';

export interface PercentLocation {
  x: number;
  y: number;
}
@Directive({
  selector: '[appDraggable]',
})
export class DraggableDirective {
  private mouseDown = new Subject<MouseEvent>();
  @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
    this.mouseDown.next(event);
  }

  private mouseUp = new Subject<MouseEvent>();
  @HostListener('mouseup', ['$event']) onMouseUp(event: MouseEvent) {
    this.mouseUp.next(event);
  }

  private mouseMove = new Subject<MouseEvent>();
  @HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    this.mouseMove.next(event);
  }

  get hostElement(): HTMLElement {
    return this.el.nativeElement as HTMLElement;
  }

  private clipPercent(min: number, max: number, value: number): number {
    if (value <= min) {
      return min;
    } else if (value >= max) {
      return max;
    } else {
      return value;
    }
  }

  private convertMousePosition(mouseEvent: MouseEvent): PercentLocation {
    const rect: DOMRect = this.hostElement.getBoundingClientRect();

    const xMin = rect.left;
    const xMax = xMin + rect.width;

    const yMin = rect.top;
    const yMax = xMin + rect.height;
    console.log('coords: ', xMin, xMax, yMin, yMax);

    return {
      x: this.clipPercent(xMin, xMax, (mouseEvent.clientX - xMin) / rect.width),
      y: this.clipPercent(
        xMin,
        xMax,
        (mouseEvent.clientY - yMin) / rect.height
      ),
    };
  }

  private move(e: MouseEvent) {
    const position: PercentLocation = this.convertMousePosition(e);
    console.log(position);
    this.onMove.emit(position);
  }

  @Output() onMove = new EventEmitter<PercentLocation>();
  constructor(private el: ElementRef) {
    this.mouseDown
      .pipe(
        switchMap((_) => this.mouseMove),
        takeUntil(this.mouseUp)
      )
      .subscribe((val) => this.move(val));
  }
}
