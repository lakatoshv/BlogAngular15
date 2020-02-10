import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsTableComponent } from './posts-table/posts-table.component';
import { PostsActivityChartComponent } from './posts-activity-chart/posts-activity-chart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    PostsRoutingModule,
    NgxChartsModule
  ],
  declarations: [PostsTableComponent, PostsActivityChartComponent],
  exports: [PostsTableComponent, PostsActivityChartComponent]
})
export class PostsModule { }
