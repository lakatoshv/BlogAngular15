import { PostsModule } from './../../shared/posts/posts.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPostsRoutingModule } from './admin-posts-routing.module';
import { PostsTableComponent } from './posts-table/posts-table.component';
import { PostsActivityChartComponent } from './posts-activity-chart/posts-activity-chart.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { ChangeStatusComponent } from './posts-table/change-status/change-status.component';

@NgModule({
  imports: [
    CommonModule,
    AdminPostsRoutingModule,
    NgxChartsModule,
    PostsModule
  ],
  declarations: [
    PostsTableComponent,
    PostsActivityChartComponent,
    PostsListComponent,
    ChangeStatusComponent,
  ],
  exports: [
    PostsTableComponent,
    PostsActivityChartComponent
  ]
})
export class AdminPostsModule { }
