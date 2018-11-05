import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponentComponent } from './layout-component/layout-component.component';
import { SharedModule } from '../shared';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
// import { SharedModule } from "@app/shared";

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    AngularFontAwesomeModule
  ],
  declarations: [LayoutComponentComponent]
})
export class LayoutModule { }
