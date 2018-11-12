import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CommentsListComponent} from "./comments-list/comments-list.component";

const routes: Routes = [
  {
    path: "",
    component: CommentsListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentsRoutingModule { }
    