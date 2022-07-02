import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from './color-picker/directives/draggable.directive';
import { GridComponent } from './color-picker/components/grid/grid.component';
import { ColorPickerComponent } from './color-picker/components/color-picker/color-picker.component';
import { HueBarComponent } from './color-picker/components/bar/hue-bar.component';
import { TransparencyBarComponent } from './color-picker/components/bar/transparency-bar.component';
import { TransparentMarkerPipe } from './color-picker/pipes/transparent-marker.pipe';
import { MarkerComponent } from './color-picker/components/marker/marker.component';

const components = [
  DraggableDirective,
  GridComponent,
  ColorPickerComponent,
  HueBarComponent,
  TransparencyBarComponent,
  TransparentMarkerPipe,
  MarkerComponent,
];

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [CommonModule],
})
export class ColorPickerModule {}
