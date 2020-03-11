import { PostsModule } from './../../shared/posts/posts.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPostsRoutingModule } from './admin-posts-routing.module';
import { PostsTableComponent } from './posts-table/posts-table.component';
import { PostsActivityChartComponent } from './posts-activity-chart/posts-activity-chart.component';
import { PostsListComponent } from './posts-list/posts-list.component';

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
    PostsListComponent
  ],
  exports: [
    PostsTableComponent,
    PostsActivityChartComponent
  ]
})
export class AdminPostsModule { }
