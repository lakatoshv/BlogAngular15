import { TagsService } from 'src/app/core/services/posts-services/tags.service';
import { Tag } from './../../../core/models/Tag';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TagForm } from 'src/app/core/forms/posts/TagForm';
import { User } from 'src/app/core/models/User';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users/users-service.service';
import { GlobalService } from 'src/app/core/services/global-service/global-service.service';
import { Messages } from 'src/app/core/data/Mesages';
import { CustomToastrService } from 'src/app/core/services/custom-toastr.service';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css']
})
export class AddTagComponent implements OnInit {
  /**
   * @param tagForm FormGroup
   */
  public tagForm: FormGroup = new TagForm().tagForm;

  /**
   * @param isLoggedIn boolean
   */
  public isLoggedIn = false;

  /**
   * @param user User
   */
  public user: User | undefined;

  /**
   * @param _router Router
   * @param _usersService UsersService
   * @param _globalService GlobalService
   * @param _tagsService TagsService
   * @param _customToastrService CustomToastrService
   */
  constructor(
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
    this.isLoggedIn = this._usersService.isLoggedIn();
    if (this._usersService.isLoggedIn()) {
      this._globalService.resetUserData();
      this.user = this._globalService._currentUser;
    } else {
      this._router.navigateByUrl('/authorization');
    }
  }

  /**
   * Add new tag.
   * 
   * @param tag Tag
   */
  public add(tag: Tag): void {
    if (this.tagForm.valid) {
      this._tagsService.addTag(new Tag(0, tag['Title']));
      this._customToastrService.displaySuccessMessage(Messages.TAG_CREATED_SUCCESSFULLY);
      this._router.navigate(['/admin/tags']);
    }
  }
}
