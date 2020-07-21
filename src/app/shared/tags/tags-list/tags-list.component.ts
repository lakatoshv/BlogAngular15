import { TagsService } from './../../../core/services/posts-services/tags.service';
import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/core/models/Tag';
import { getAllRouteGuards } from '@angular/router/src/utils/preactivation';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.css']
})
export class TagsListComponent implements OnInit {
  public tags: Tag[] = [];
  constructor(private _tagsService: TagsService) {
  }

  ngOnInit() {
    this._getTags();
  }

  private _getTags(): void {
    this.tags = this._tagsService.getTags().slice(0, 5);
  }
}
