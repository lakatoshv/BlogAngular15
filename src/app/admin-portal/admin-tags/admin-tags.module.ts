import { TagsModule } from './../../shared/tags/tags.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminTagsRoutingModule } from './admin-tags-routing.module';
import { TagsActivityChartComponent } from './tags-activity-chart/tags-activity-chart.component';
import { TagsTableComponent } from './tags-table/tags-table.component';
import { TagsListComponent } from './tags-list/tags-list.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [TagsActivityChartComponent, TagsTableComponent, TagsListComponent],
  imports: [
    CommonModule,
    AdminTagsRoutingModule,
    NgxChartsModule,
    TagsModule
  ],
  exports: [TagsActivityChartComponent, TagsTableComponent, TagsListComponent]
})
export class AdminTagsModule { }
