import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsListComponent } from './posts-list/posts-list.component';
import { ShowComponent } from './show/show.component';
import {CommentsListComponent} from "./comments/comments-list/comments-list.component";
import {AddCommentComponent} from "./comments/add-comment/add-comment.component";

@NgModule({
  imports: [
    CommonModule,
    PostsRoutingModule
  ],
  declarations: [PostsListComponent, ShowComponent, CommentsListComponent, AddCommentComponent]
})
export class PostsModule { }
