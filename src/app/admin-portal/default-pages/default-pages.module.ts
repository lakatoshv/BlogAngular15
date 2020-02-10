import { UsersModule } from './../users/users.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultPagesRoutingModule } from './default-pages-routing.module';
import { IndexComponent } from './index/index.component';
import { PostsModule } from '../posts/posts.module';
import { IconsCardsComponent } from './icons-cards/icons-cards.component';

@NgModule({
  imports: [
    CommonModule,
    DefaultPagesRoutingModule,
    PostsModule,
    UsersModule
  ],
  declarations: [IndexComponent, IconsCardsComponent],
  exports: [IndexComponent]
})
export class DefaultPagesModule { }
