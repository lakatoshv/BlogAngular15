import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultPagesRoutingModule } from './default-pages-routing.module';
import { IndexComponent } from './index/index.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    DefaultPagesRoutingModule,
    NgxChartsModule
  ],
  declarations: [IndexComponent],
  exports: [IndexComponent]
})
export class DefaultPagesModule { }
