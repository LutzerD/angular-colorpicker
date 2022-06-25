import {
  Directive,
  EventEmitter,
  ElementRef,
  HostListener,
  Output,
  OnDestroy,
} from '@angular/core';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { debounceTime, map, switchMap, takeUntil } from 'rxjs/operators';
import { OutputEmitter } from '@angular/compiler/src/output/abstract_emitter';

export interface PercentLocation {
  x: number;
  y: number;
}
@Directive({
  selector: '[appDraggable]',
})
export class DraggableDirective implements OnDestroy {
  private mouseDown = new Subject<MouseEvent>();
  @HostListener('mousedown', ['$event']) onMouseDown(event: MouseEvent) {
    this.mouseDown.next(event);
  }

  private mouseUp = new Subject<MouseEvent>();
  @HostListener('document:mouseup', ['$event']) onMouseUp(event: MouseEvent) {
    this.mouseUp.next(event);
  }

  private mouseMove = new Subject<MouseEvent>();
  @HostListener('document:mousemove', ['$event']) onMouseMove(
    event: MouseEvent
  ) {
    this.mouseMove.next(event);
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

  private convertMousePosition(mouseEvent: MouseEvent): PercentLocation {
    const rect: DOMRect = this.hostElement.getBoundingClientRect();

    const x = mouseEvent.pageX - rect.left;
    const y = mouseEvent.pageY - rect.top;
    console.group();
    console.log('Host?', this.hostElement);
    console.log('rect l,top', rect.left, rect.top);
    console.log('mouse', mouseEvent.pageX, mouseEvent.pageY);
    console.log(this.hostElement.closest('.draggableContainer'), rect);
    console.log('xy:', x, y);
    console.log('percents:', x / rect.width, y / rect.height);
    console.groupEnd();

    return {
      x: this.clipPercent(x / rect.width),
      y: this.clipPercent(y / rect.height),
    };
  }

  private move(e: MouseEvent) {
    const position: PercentLocation = this.convertMousePosition(e);
    console.log(position);
    this.onMove.emit(position);
  }

  @Output() onMove = new EventEmitter<PercentLocation>();
  constructor(private el: ElementRef) {
    this.subscription = this.mouseDown
      .pipe(switchMap((_) => this.mouseMove.pipe(takeUntil(this.mouseUp))))
      .subscribe((val: any) => this.move(val));
  }

  subscription: Subscription = Subscription.EMPTY;
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
