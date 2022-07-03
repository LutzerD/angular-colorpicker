export const VALID_COLOR = {
  RED: 'rgb(255 0 0)',
  TEAL: 'rgb(0 255 255)',
  GREEN: 'rgb(0 255 0)',
};
export const SELECTORS = {
  PICKER: '.color-picker-container',
  TRANSPARENCY_BAR: 'transparency-bar',
};

// export class MouseEventHelper {
//   moveSV(e: DebugElement, x: number, y: number) {}

//   moveHue(e: DebugElement, x: number, y: number) {}

//   moveOpacity(e: DebugElement, x: number, y: number) {}

//   getPageXY(e: DebugElement, x: number, y: number){
//     // pageY = y/rect.height + rect.top
//   }
//   clickNDrag(e: DebugElement, x: number, y: number) {
//     e.triggerEventHandler('mousedown', { pageX: 50, pageY: 40 });
//     e.triggerEventHandler('mousemove', { pageX: 50, pageY: 40 });
//     e.triggerEventHandler('mouseup', { pageX: 50, pageY: 40 });
//     // pageY = y/rect.height + rect.top
//   }
// }

// private clipPercent(value: number): number {
//   if (value <= 0) {
//     return 0;
//   } else if (value >= 1) {
//     return 1;
//   } else {
//     return value;
//   }
// }

// private convertMousePosition(mouseEvent: MouseEvent): PercentLocation {
//   const rect: DOMRect = this.hostElement.getBoundingClientRect();

//   const x = mouseEvent.pageX - (rect.left + window.scrollX);
//   const y = mouseEvent.pageY - (rect.top + window.scrollY);

//   return {
//     x: this.clipPercent(x / rect.width),
//     y: this.clipPercent(y / rect.height),
//   };
// }
