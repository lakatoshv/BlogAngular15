import { CategoriesService } from './services/posts-services/categories.service';
import { PostsService } from './services/posts-services/posts.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralServiceService } from './services/general-service.service';
import { CommentsService } from './services/posts-services/comments.service';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    GeneralServiceService,
    CommentsService,
    PostsService,
    CategoriesService
  ]
})
export class CoreModule { }
