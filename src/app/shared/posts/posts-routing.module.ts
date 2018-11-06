import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostsListComponent } from './posts-list/posts-list.component';
import { ShowComponent } from './show/show.component';

const routes: Routes = [
  {
    path: "",
    component: PostsListComponent,
    children: [
      {
        path: "post/:post-id",
        loadChildren: './show/show.component'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
