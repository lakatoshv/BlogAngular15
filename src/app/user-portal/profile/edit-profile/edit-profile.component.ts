import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/User';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/core/services/global-service/global-service.service';
import { UsersService } from 'src/app/core/services/users/users-service.service';
import { FormGroup } from '@angular/forms';
import { ProfileForm } from 'src/app/core/forms/user/ProfileForm';
import { TinyMCEOptionsObject } from 'src/app/core/models/TinyMCEOptionsObject';
import { TinyMCEOptions } from 'src/app/core/data/TinyMCEOptions';
import { Messages } from 'src/app/core/data/Mesages';
import { CustomToastrService } from 'src/app/core/services/custom-toastr.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  /**
   * @param user User
   */
  public user: User = null;

  /**
   * @param isLoggedIn boolean
   */
  public isLoggedIn = false;

  /**
   * @param profileForm FormGroup
   */
  public profileForm: FormGroup = new ProfileForm().profileForm;

  /**
   * @param tinyMCEOptions TinyMCEOptionsObject
   */
  public tinyMCEOptions: TinyMCEOptionsObject = TinyMCEOptions;

  /**
   * @param _router Router
   * @param _globalService GlobalService
   * @param _usersService UsersService
   * @param _customToastrService CustomToastrService
   */
  constructor(
    private _router: Router,
    private _globalService: GlobalService,
    private _usersService: UsersService,
    private _customToastrService: CustomToastrService
  ) { }

  /**
   * @inheritdoc
   */
  public ngOnInit() {
    this.isLoggedIn = this._usersService.isLoggedIn();
    if (this._usersService.isLoggedIn()) {
      this._globalService.resetUserData();
      this.user = this._globalService._currentUser;
      this._setFormData();
    } else {
      this._router.navigateByUrl('/authorization');
    }
  }

  /**
   * Edit profile.
   * @param profileModel any
   * @returns void
   */
  edit(profileModel: any): void {
    this._globalService._currentUser.UserName = profileModel.firstName + ' ' + profileModel.lastName;
    this._globalService._currentUser.FirstName = profileModel.firstName;
    this._globalService._currentUser.LastName = profileModel.lastName;
    this._globalService._currentUser.About = profileModel.about;
    this._usersService.saveUser(JSON.stringify(this._globalService._currentUser));
    this._customToastrService.displaySuccessMessage(Messages.AUTHORIZED_SUCCESSFULLY);
  }

  /**
   * Set form data.
   * @returns void
   */
  private _setFormData(): void {
    this.profileForm.get('userName').setValue(this.user.FirstName + ' ' + this.user.LastName);
    this.profileForm.get('firstName').setValue(this.user.FirstName);
    this.profileForm.get('lastName').setValue(this.user.LastName);
    this.profileForm.get('about').setValue(this.user.About);
  }

  /**
   * Clear form data.
   * @returns void
   */
  private clearFormData(): void {
  }
}
