import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPortalRoutingModule } from './user-portal-routing.module';
import { LayoutComponentComponent } from './layout-component/layout-component.component';

@NgModule({
  imports: [
    CommonModule,
    UserPortalRoutingModule
  ],
  declarations: [LayoutComponentComponent]
})
export class UserPortalModule { }
