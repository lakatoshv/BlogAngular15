import { PostsListComponent } from './posts-list/posts-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPostComponent } from 'src/app/shared/posts/add-post/add-post.component';
import { EditPostComponent } from 'src/app/shared/posts/edit-post/edit-post.component';
import { MyPostsComponent } from 'src/app/shared/posts/my-posts/my-posts.component';

const routes: Routes = [
  {
    path: "",
    component: PostsListComponent
  },
  /*{ 
    path: 'post/:post-id', 
    component: ShowComponent
  },*/
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
