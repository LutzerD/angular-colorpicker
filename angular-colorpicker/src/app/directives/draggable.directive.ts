import {
  Directive,
  EventEmitter,
  ElementRef,
  HostListener,
  Output,
  OnDestroy,
} from '@angular/core';
import { merge, of, Subject, Subscription } from 'rxjs';
import { switchMap, take, takeUntil } from 'rxjs/operators';

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

    const x = mouseEvent.pageX - (rect.left + window.scrollX);
    const y = mouseEvent.pageY - (rect.top + window.scrollY);

    return {
      x: this.clipPercent(x / rect.width),
      y: this.clipPercent(y / rect.height),
    };
  }

  private move(e: MouseEvent) {
    const position: PercentLocation = this.convertMousePosition(e);
    this.onMove.emit(position);
  }

  //mousedown - trip
  //switch to mousemove
  //mouse up - trip
  @Output() onMove = new EventEmitter<PercentLocation>();
  constructor(private el: ElementRef) {
    this.subscription = this.mouseDown
      .pipe(
        switchMap((e: any) => {
          e.preventDefault();
          return merge(
            of(e),
            this.mouseMove.pipe(takeUntil(this.mouseUp)),
            this.mouseUp.pipe(take(1))
          );
        })
      )
      .subscribe((val: any) => this.move(val));
  }

  subscription: Subscription = Subscription.EMPTY;
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
