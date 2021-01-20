import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/core/models/Tag';
import { TagsService } from 'src/app/core/services/posts-services/tags.service';

@Component({
  selector: 'app-popular-tags',
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.css']
})
export class PopularTagsComponent implements OnInit {
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
