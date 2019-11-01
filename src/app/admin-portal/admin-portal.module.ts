import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPortalRoutingModule } from './admin-portal-routing.module';
import { LayoutComponentComponent } from './layout-component/layout-component.component';

@NgModule({
  imports: [
    CommonModule,
    AdminPortalRoutingModule
  ],
  declarations: [LayoutComponentComponent]
})
export class AdminPortalModule { }
