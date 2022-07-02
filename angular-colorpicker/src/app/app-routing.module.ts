import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { MultiDemoComponent } from './demo/multi-demo.component';
import { DemoComponent } from './demo/demo.component';

export const routes: Routes = [
  { path: 'multiple', component: MultiDemoComponent },
  { path: '**', component: DemoComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class AppRoutingModule {}
