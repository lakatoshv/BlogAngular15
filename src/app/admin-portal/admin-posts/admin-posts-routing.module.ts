import { PostsListComponent } from './posts-list/posts-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPostComponent } from 'src/app/shared/posts/add-post/add-post.component';
import { EditPostComponent } from 'src/app/shared/posts/edit-post/edit-post.component';
import { ShowComponent } from 'src/app/shared/posts/show/show.component';

const routes: Routes = [
  {
    path: '',
    component: PostsListComponent
  },
  {
    path: 'show/:post-id',
    component: ShowComponent
  },
  {
    path: 'posts/add',
    component: AddPostComponent
  },
  {
    path: 'posts/edit/:post-id',
    component: EditPostComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPostsRoutingModule { }
