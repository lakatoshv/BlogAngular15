import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostsListComponent } from './posts-list/posts-list.component';
import { ShowComponent } from './show/show.component';
import { AddPostComponent } from './add-post/add-post.component';

const routes: Routes = [
  {
    path: "",
    component: PostsListComponent
  },
  { 
    path: 'post/:post-id', 
    component: ShowComponent
  },
  { 
    path: 'posts/add', 
    component: AddPostComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
