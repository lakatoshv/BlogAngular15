import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsModule } from "./posts/posts.module";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PostsModule],
  exports: [
    PostsModule, CommonModule
  ]
})
export class SharedModule { }
