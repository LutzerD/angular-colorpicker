import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { MultiDemoComponent } from './demo/multi-demo.component';
import { routes } from './app-routing.module';
import { DemoComponent } from './demo/demo.component';
import { ColorPickerModule } from './colorpicker/color-picker.module';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { JsonFormatterComponent } from './json-formatter/json-formatter.component';
@NgModule({
  declarations: [
    AppComponent,
    MultiDemoComponent,
    DemoComponent,
    HeaderComponent,
    JsonFormatterComponent,
  ],
  imports: [
    BrowserModule,
    ColorPickerModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
