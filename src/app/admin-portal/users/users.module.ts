import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersActivityChartComponent } from './users-activity-chart/users-activity-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    NgxChartsModule,
  ],
  declarations: [UsersActivityChartComponent],
  exports: [UsersActivityChartComponent]
})
export class UsersModule { }
