import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsRoutingModule } from './comments-routing.module';
import { CommentsListComponent } from './comments-list/comments-list.component';

@NgModule({
  imports: [
    CommonModule,
    CommentsRoutingModule
  ],
  declarations: [CommentsListComponent]
})
export class CommentsModule { }
