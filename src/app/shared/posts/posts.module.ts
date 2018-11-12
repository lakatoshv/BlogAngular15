import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsListComponent } from './posts-list/posts-list.component';
import { ShowComponent } from './show/show.component';
import {CommentsListComponent} from "./comments/comments-list/comments-list.component";

@NgModule({
  imports: [
    CommonModule,
    PostsRoutingModule
  ],
  declarations: [PostsListComponent, ShowComponent, CommentsListComponent]
})
export class PostsModule { }
