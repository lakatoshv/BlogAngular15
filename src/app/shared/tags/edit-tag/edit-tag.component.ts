import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TagForm } from 'src/app/core/forms/posts/TagForm';
import { User } from 'src/app/core/models/User';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsersService } from 'src/app/core/services/users/users-service.service';
import { GlobalService } from 'src/app/core/services/global-service/global-service.service';
import { TagsService } from 'src/app/core/services/posts-services/tags.service';
import { Tag } from 'src/app/core/models/Tag';
import { CustomToastrService } from 'src/app/core/services/custom-toastr.service';
import { Messages } from 'src/app/core/data/Mesages';

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
  public tag: Tag | undefined;

  /**
   * @param user User
   */
  public user: User | undefined;

  /**
   * @param _tagId number
   */
  private _tagId: number | undefined;

  /**
   * @param _activatedRoute ActivatedRoute
   * @param _router Router
   * @param _usersService UsersService
   * @param _globalService GlobalService
   * @param _tagsService TagsService
   * @param _customToastrService CustomToastrService
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _usersService: UsersService,
    private _globalService: GlobalService,
    private _tagsService: TagsService,
    private _customToastrService: CustomToastrService
  ) { }

  /**
   * @inheritdoc
   */
  ngOnInit() {
    const postIdStr = this._globalService.getRouteParam('post-id', this._activatedRoute)
    if(postIdStr !== null) {
      this._tagId = parseInt(postIdStr, undefined);
    }

    this._activatedRoute.params.subscribe(
      (params: Params) => {
        this._tagId = parseInt(params['post-id'], undefined);
        this._checkIfUserIsLoggedIn();

        this._getTag();
      }
    );

    this._checkIfUserIsLoggedIn();

    this._getTag();
  }

  /**
   * Add new tag.
   * 
   * @param tag Tag
   */
  public edit(tag: Tag): void {
    if (this.tagForm.valid && this.tag && this._tagId) {
      this.tag.Title = tag['Title'];
      this._tagsService.editTag(this._tagId, this.tag);
      this._customToastrService.displaySuccessMessage(Messages.TAG_EDITED_SUCCESSFULLY);
      this._router.navigate(['/admin/tags']);
    }
  }

  /**
   * Set edit form data.
   */
  private _setFormData(): void {
    this.tagForm.get('title')?.setValue(this.tag?.Title);
  }

  /**
   * Get tag by id.
   */
  private _getTag(): void {
    if(this._tagId) {
      this.tag = this._tagsService.getTag(this._tagId);
    }
    
    this._setFormData();
  }

  /**
   * Check if user is logged in.
   */
  private _checkIfUserIsLoggedIn(): void {
    this.isLoggedIn = this._usersService.isLoggedIn();
    if (this._usersService.isLoggedIn()) {
      this._globalService.resetUserData();
      this.user = this._globalService._currentUser;
    } else {
      this._router.navigateByUrl('/authorization');
    }
  }
}
