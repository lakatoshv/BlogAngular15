import { AdminCommentsModule } from './../admin-comments/admin-comments.module';
import { UsersModule } from './../users/users.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultPagesRoutingModule } from './default-pages-routing.module';
import { IndexComponent } from './index/index.component';
import { AdminPostsModule } from '../admin-posts/admin-posts.module';
import { IconsCardsComponent } from './icons-cards/icons-cards.component';

@NgModule({
  imports: [
    CommonModule,
    DefaultPagesRoutingModule,
    AdminPostsModule,
    AdminCommentsModule,
    UsersModule
  ],
  declarations: [
    IndexComponent,
    IconsCardsComponent
  ],
  exports: [IndexComponent]
})
export class DefaultPagesModule { }
