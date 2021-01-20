import { AuthGuard } from './core/guards/AuthGuard';
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
    canActivateChild: [AuthGuard],
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
