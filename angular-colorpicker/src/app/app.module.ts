import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MarkerComponent } from './components/marker/marker.component';
import { GridComponent } from './components/grid/grid.component';
import { DraggableDirective } from './directives/draggable.directive';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { HueBarComponent } from './components/bar/hue-bar.component';
import { TransparencyBarComponent } from './components/bar/transparency-bar.component';
import { TransparentMarkerPipe } from './pipes/transparent-marker.pipe';
import { AppRoutingModule, routes } from './app-routing.module';
import { DemoComponent } from './components/demo/demo.component';
import { MultiDemoComponent } from './components/multi-demo/multi-demo.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    MarkerComponent,
    ColorPickerComponent,
    GridComponent,
    DraggableDirective,
    HueBarComponent,
    TransparencyBarComponent,
    TransparentMarkerPipe,
    DemoComponent,
    MultiDemoComponent,
    HeaderComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
