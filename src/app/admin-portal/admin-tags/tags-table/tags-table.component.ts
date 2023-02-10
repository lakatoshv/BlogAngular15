import { TagsService } from 'src/app/core/services/posts-services/tags.service';
import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/core/models/Tag';
import { CustomToastrService } from 'src/app/core/services/custom-toastr.service';
import { Messages } from 'src/app/core/data/Mesages';

@Component({
  selector: 'app-tags-table',
  templateUrl: './tags-table.component.html',
  styleUrls: ['./tags-table.component.css']
})
export class TagsTableComponent implements OnInit {
  public tags: Tag[] = [];

  /**
   * @param _tagsService TagsService
   * @param _customToastrService CustomToastrService
   */
  constructor(
    private _tagsService: TagsService,
    private _customToastrService: CustomToastrService
  ) { }

  /**
   * @inheritdoc
   */
  ngOnInit() {
    this._getTags();
  }

  /**
   * Get all tags.
   */
  private _getTags(): void {
    this.tags = this._tagsService.getTags();
  }

  /**
   * Delete tag event.
   * @param tag Tag
   * @returns void
   */
  deleteAction(tag: Tag): void {
    this._tagsService.deleteTag(tag.Id);
    this._customToastrService.displaySuccessMessage(Messages.TAG_DELETED_SUCCESSFULLY);
  }
}
