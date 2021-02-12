import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArchiveRoutingModule } from './archive-routing.module';
import { ArchivesListComponent } from './archives-list/archives-list.component';
import { PopularArchivesComponent } from './popular-archives/popular-archives.component';

@NgModule({
  declarations: [
    ArchivesListComponent, 
    PopularArchivesComponent
  ],
  imports: [
    CommonModule,
    ArchiveRoutingModule
  ],
  exports: [
    ArchivesListComponent,
    PopularArchivesComponent
  ]
})
export class ArchiveModule { }
