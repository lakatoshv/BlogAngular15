import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsListComponent } from './posts-list/posts-list.component';
import { ShowComponent } from './show/show.component';
import {CommentsListComponent} from "./comments/comments-list/comments-list.component";
import {AddCommentComponent} from "./comments/add-comment/add-comment.component";
import { EditCommentComponent } from './comments/edit-comment/edit-comment.component';
import { AddPostComponent } from './add-post/add-post.component';

@NgModule({
  imports: [
    CommonModule,
    PostsRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    PostsListComponent, 
    ShowComponent, 
    CommentsListComponent, 
    AddCommentComponent, 
    EditCommentComponent, AddPostComponent
  ]
})
export class PostsModule { }
