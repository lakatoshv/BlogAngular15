import { TagsService } from 'src/app/core/services/posts-services/tags.service';
import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/core/models/Tag';

@Component({
  selector: 'app-tags-table',
  templateUrl: './tags-table.component.html',
  styleUrls: ['./tags-table.component.css']
})
export class TagsTableComponent implements OnInit {
  public tags: Tag[] = [];

  constructor(private _tagsService: TagsService) { }

  ngOnInit() {
    this._getTags();
  }

  private _getTags(search: string = null): void {
    this.tags = this._tagsService.getTags();
  }

  /**
   * Delete tag event
   * @param tag Tag
   * @returns void
   */
  deleteAction(tag: Tag): void {
    this._tagsService.deleteTag(tag.Id);
  }
}
