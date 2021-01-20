import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'blog', pathMatch: 'full'
  },
  {
    path: 'blog',
    loadChildren: './user-portal/layout.module#LayoutModule'
  },
  {
    path: 'admin',
    loadChildren: './admin-portal/admin-portal.module#AdminPortalModule'
  },
  {
    path: '**',
    redirectTo: 'blog/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
