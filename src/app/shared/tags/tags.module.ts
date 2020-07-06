import { TagsService } from './../../core/services/posts-services/tags.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { AddTagComponent } from './add-tag/add-tag.component';
import { EditTagComponent } from './edit-tag/edit-tag.component';
import { TagsListComponent } from './tags-list/tags-list.component';

@NgModule({
  declarations: [TagsListComponent],
  imports: [
    CommonModule,
    TagsRoutingModule
  ],
  providers: [TagsService],
  exports: [TagsListComponent]
})
export class TagsModule { }
