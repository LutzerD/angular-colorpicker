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
  private selected$ = new Subject<MouseEvent>();
  @HostListener('mousedown', ['$event']) mouseDown(event: MouseEvent) {
    this.selected$.next(event);
  }

  private deselected$ = new Subject<MouseEvent>();
  @HostListener('document:mouseup', ['$event']) mouseUp(event: MouseEvent) {
    this.deselected$.next(event);
  }

  private move$ = new Subject<MouseEvent>();
  @HostListener('document:ArrowLeft', ['$event']) mouseMove(
    event: MouseEvent
  ) {
    this.move$.next(event);
  }

  private getDirection(event: KeyboardEvent, multiplier = 1): { up?: number, right?: number } | null{
    console.log(event)
    return null;
    if(event.key === 'ArrowLeft'){
      return {
        up: 1*multiplier
      }
    // }else if(event.key == KEY_CODE.DOWN_ARROW){
    // }else if(event.keyCode == KEY_CODE.DOWN_ARROW){
    // }else if(event.keyCode == KEY_CODE.DOWN_ARROW){
    // }
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyUpHandler(event: KeyboardEvent) {
    console.log("up", event);
  }

  @HostListener('blur', ['$event'])
  blur(event: KeyboardEvent) {
    console.log("blur",event);
  }

  @HostListener('keydown', ['$event'])
  keyDownHandler(event: KeyboardEvent) {
    console.log("down", event)
    // this.getDirection(event);
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

  @Output() onMove = new EventEmitter<PercentLocation>();
  constructor(private el: ElementRef) {
    this.subscription = this.selected$
      .pipe(
        switchMap((e: any) => {
          e.preventDefault();
          return merge(
            of(e),
            this.move$.pipe(takeUntil(this.move$)),
            this.deselected$.pipe(take(1))
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
