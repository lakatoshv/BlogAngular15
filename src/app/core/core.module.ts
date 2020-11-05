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
  ]
})
export class CoreModule { }
