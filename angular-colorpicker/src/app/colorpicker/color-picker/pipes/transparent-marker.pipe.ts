import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transparentMarker',
})
export class TransparentMarkerPipe implements PipeTransform {
  transform(color: string): string {
    return `linear-gradient(to right, ${color}, ${color}), repeating-conic-gradient(rgb(236, 234, 236) 0%, rgb(236, 234, 236) 25%, white 0%, white 50%) 50% center / 20px 20px`;
  }
}
