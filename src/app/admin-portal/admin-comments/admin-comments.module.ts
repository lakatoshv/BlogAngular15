import { CoreModule } from './../../core/core.module';
import { CommentsModule } from './../../shared/posts/comments/comments.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminCommentsRoutingModule } from './admin-comments-routing.module';
import { CommentsActivityComponent } from './comments-activity/comments-activity.component';
import { CommentsListComponent } from './comments-list/comments-list.component';
import { CommentsTableComponent } from './comments-table/comments-table.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    CommentsActivityComponent,
    CommentsListComponent,
    CommentsTableComponent
  ],
  imports: [
    CommonModule,
    AdminCommentsRoutingModule,
    NgxChartsModule,
    CommentsModule,
    CoreModule
  ],
  exports: [
    CommentsActivityComponent,
    CommentsListComponent,
    CommentsTableComponent
  ]
})
export class AdminCommentsModule { }
