import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponentComponent } from './layout-component/layout-component.component';
import { PostsListComponent } from "../shared/posts/posts-list/posts-list.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponentComponent,
    children: [
      {
        path: "",
        loadChildren: '../shared/posts/posts.module#PostsModule'
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
