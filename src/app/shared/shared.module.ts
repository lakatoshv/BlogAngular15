import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsListComponent } from "./posts/posts-list/posts-list.component"

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PostsListComponent],
  exports: [
    PostsListComponent, CommonModule
  ]
})
export class SharedModule { }
