import { TagsService } from './../../core/services/posts-services/tags.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsRoutingModule } from './tags-routing.module';
import { AddTagComponent } from './add-tag/add-tag.component';
import { EditTagComponent } from './edit-tag/edit-tag.component';
import { TagsListComponent } from './tags-list/tags-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddTagComponent, EditTagComponent, TagsListComponent],
  imports: [
    CommonModule,
    TagsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [TagsService],
  exports: [AddTagComponent, EditTagComponent, TagsListComponent]
})
export class TagsModule { }
