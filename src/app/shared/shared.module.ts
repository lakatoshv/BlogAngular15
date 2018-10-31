import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';

import { PostsListComponent } from "./posts/posts-list/posts-list.component"

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  declarations: [
    PostsListComponent
  ],
  exports: [
    PostsListComponent
  ]
})
export class SharedModule { }
