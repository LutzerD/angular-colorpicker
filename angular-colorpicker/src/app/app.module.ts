import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MarkerComponent } from './marker/marker.component';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { GridComponent } from './grid/grid.component';
import { BarComponent } from './bar/bar.component';
import { DraggableDirective } from './bar/draggable.directive';
import { HueBarComponent } from './bar/hue-bar/hue-bar.component';
import { TransparencyBarComponent } from './bar/transparency-bar/transparency-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    MarkerComponent,
    ColorPickerComponent,
    GridComponent,
    BarComponent,
    DraggableDirective,
    HueBarComponent,
    TransparencyBarComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
