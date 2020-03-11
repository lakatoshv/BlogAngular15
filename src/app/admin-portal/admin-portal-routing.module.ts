import { NgModule } from '@angular/core';
import { LayoutComponentComponent } from './layout-component/layout-component.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPortalRoutingModule { }
