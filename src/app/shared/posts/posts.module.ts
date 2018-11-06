import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsListComponent } from './posts-list/posts-list.component';
import { ShowComponent } from './show/show.component';

@NgModule({
  imports: [
    CommonModule,
    PostsRoutingModule
  ],
  declarations: [PostsListComponent, ShowComponent]
})
export class PostsModule { }
