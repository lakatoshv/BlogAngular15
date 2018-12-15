import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CommentsRoutingModule } from './comments-routing.module';
import { CommentsListComponent } from './comments-list/comments-list.component';
import { AddCommentComponent } from './add-comment/add-comment.component';

@NgModule({
  imports: [
    CommonModule,
    CommentsRoutingModule,
    AddCommentComponent,
    ReactiveFormsModule
  ],
  exports: [
    CommentsListComponent, AddCommentComponent
  ],
  declarations: [CommentsListComponent, AddCommentComponent]
})
export class CommentsModule { }
