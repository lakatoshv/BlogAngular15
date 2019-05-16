import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponentComponent } from './layout-component/layout-component.component';
import { AuthorizationComponent } from './user/authorization/authorization.component';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponentComponent,
    children: [
      {
        path: "",
        loadChildren: '../shared/posts/posts.module#PostsModule'
      },
      {
        path: "authorization",
        component: AuthorizationComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
