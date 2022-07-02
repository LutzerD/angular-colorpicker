import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MultiDemoComponent } from './demo/multi-demo.component';
import { routes } from './app-routing.module';
import { DemoComponent } from './demo/demo.component';
import { ColorPickerModule } from './colorpicker/color-picker.module';

@NgModule({
  declarations: [
    AppComponent,
    MultiDemoComponent,
    DemoComponent,
    HeaderComponent,
  ],
  imports: [BrowserModule, ColorPickerModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
