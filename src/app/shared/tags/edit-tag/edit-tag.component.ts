import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TagForm } from 'src/app/core/forms/posts/TagForm';
import { User } from 'src/app/core/models/User';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/core/services/users/users-service.service';
import { GlobalService } from 'src/app/core/services/global-service/global-service.service';
import { TagsService } from 'src/app/core/services/posts-services/tags.service';
import { Tag } from 'src/app/core/models/Tag';

@Component({
  selector: 'app-edit-tag',
  templateUrl: './edit-tag.component.html',
  styleUrls: ['./edit-tag.component.css']
})
export class EditTagComponent implements OnInit {
  /**
   * @param tagForm FormGroup
   */
  public tagForm: FormGroup = new TagForm().tagForm;

  /**
   * @param isLoggedIn boolean
   */
  public isLoggedIn = false;

  /**
   * @param tag Tag
   */
  public tag: Tag;

  /**
   * @param user User
   */
  public user: User;

  /**
   * @param _tagId number
   */
  private _tagId: number;

  /**
   * @param _activatedRoute ActivatedRoute
   * @param _router Router
   * @param _usersService UsersService
   * @param _globalService GlobalService
   * @param _tagsService TagsService
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _usersService: UsersService,
    private _globalService: GlobalService,
    private _tagsService: TagsService
  ) { }

  /**
   * @inheritdoc
   */
  ngOnInit() {
    this._tagId = parseInt(this._globalService.getRouteParam('post-id', this._activatedRoute));

    this.isLoggedIn = this._usersService.isLoggedIn();
    if (this._usersService.isLoggedIn()) {
      this._globalService.resetUserData();
      this.user = this._globalService._currentUser;
    } else {
      this._router.navigateByUrl('/authorization');
    }

    this._getTag();
  }

  /**
   * Add new tag.
   * @param tag Tag
   * @returns void
   */
  public edit(tag: Tag): void {
    this.tag.Title = tag['title'];
    this._tagsService.editTag(this._tagId, this.tag);
    this._router.navigate(['/admin/tags']);
  }

  /**
   * Set edit form data.
   * @returns void
   */
  private _setFormData(): void {
    this.tagForm.get('title').setValue(this.tag.Title);
  }

  /**
   * Get tag by id.
   * @returns void
   */
  private _getTag(): void {
    this.tag = this._tagsService.getTag(this._tagId);
    this._setFormData();
  }
}
