import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {CommentsListComponent} from "./comments-list/comments-list.component";
import {AddCommentComponent} from "./add-comment/add-comment.component";
import { from } from 'rxjs';

const routes: Routes = [
  {
    path: "",
    component: CommentsListComponent,
    loadChildren: './add-comment/add-comment.component'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentsRoutingModule { }
    