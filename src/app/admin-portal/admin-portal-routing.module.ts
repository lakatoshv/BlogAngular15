import { NgModule } from '@angular/core';
import { LayoutComponentComponent } from './layout-component/layout-component.component';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '../shared/errors/not-found/not-found.component';
import { AuthGuard } from '../core/guards/AuthGuard';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [AuthGuard],
    component: LayoutComponentComponent,
    children: [
      {
        path: '',
        loadChildren: './default-pages/default-pages.module#DefaultPagesModule'
      },
      {
        path: 'posts',
        loadChildren: './admin-posts/admin-posts.module#AdminPostsModule'
      },
      {
        path: 'comments',
        loadChildren: './admin-comments/admin-comments.module#AdminCommentsModule'
      },
      {
        path: 'comments/:post-id',
        loadChildren: './admin-comments/admin-comments.module#AdminCommentsModule'
      },
      {
        path: 'tags',
        loadChildren: './admin-tags/admin-tags.module#AdminTagsModule'
      },
      {
        path: 'not-found',
        component: NotFoundComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPortalRoutingModule { }
