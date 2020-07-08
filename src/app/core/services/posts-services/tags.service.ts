import { Tags } from './../../data/TagsList';
import { Injectable, EventEmitter } from '@angular/core';
import { Tag } from '../../models/Tag';
import { sortBy } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  /**
   * @param tagChanged EventEmitter<boolean>
   */
  tagChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * @param _tags Tag[]
   */
  private _tags: Tag[] = Tags;

  constructor() { }

  /**
   * Get tags.
   * @param search string
   * @returns Tag[]
   */
  public getTags(search: string = null): Tag[] {
    let tags = [];
    this._tags.forEach(post => {
      tags.push(post);
    });

    if (search !== null) {
      tags = tags.filter(post => post.Title.includes(search));
    }

    return tags;
  }

  /**
   * Sort tags.
   * @param sort string
   * @returns Tag[]
   */
  public sort(sort: string): Tag[] {
    return sortBy(Object.values(this._tags), [sort]);
  }

  /**
   * Get tag by id.
   * @param id number
   * @returns Tag
   */
  public getTag(id: number): Tag {
    return this._tags[id];
  }

  public getTagByTitle(title: string): Tag {
    const index = this._tags.findIndex(x => x.Title === title);
    if (index !== -1) {
      return this._tags[index];
    }
    return null;
  }

  /**
   * Add new tag.
   * @param tag Tag
   * @returns void
   */
  public addTag(tag: Tag): void {
    if (this._tags.findIndex(x => x.Title === tag.Title) > -1) {
      return;
    }

    tag.Id = this._tags.length;
    this._tags.unshift(tag);
    this.tagChanged.emit(true);
  }

  /**
   * Edit tag by id.
   * @param id number
   * @param tag Tag
   */
  public editTag(id: number, tag: Tag): void {
    if (id > -1) {
      this._tags[id] = tag;
    }
    this.tagChanged.emit(true);
  }

  /**
   * Delete tag by id.
   * @param id number
   * @returns void
   */
  public deleteTag(id: number): void {
    const index = this._tags.findIndex(x => x.Id === id);
    if (index > -1) {
      this._tags.splice(index, 1);
      this.tagChanged.emit(true);
    }
  }
}
