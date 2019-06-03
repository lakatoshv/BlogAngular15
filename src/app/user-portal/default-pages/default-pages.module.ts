import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultPagesRoutingModule } from './default-pages-routing.module';
import { AboutComponent } from './about/about.component';

@NgModule({
  imports: [
    CommonModule,
    DefaultPagesRoutingModule
  ],
  declarations: [AboutComponent]
})
export class DefaultPagesModule { }
