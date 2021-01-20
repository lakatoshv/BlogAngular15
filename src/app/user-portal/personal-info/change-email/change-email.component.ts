import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/User';
import { FormGroup } from '@angular/forms';
import { ProfileForm } from 'src/app/core/forms/user/ProfileForm';
import { TinyMCEOptionsObject } from 'src/app/core/models/TinyMCEOptionsObject';
import { TinyMCEOptions } from 'src/app/core/data/TinyMCEOptions';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/core/services/global-service/global-service.service';
import { UsersService } from 'src/app/core/services/users/users-service.service';
import { CustomToastrService } from 'src/app/core/services/custom-toastr.service';
import { Messages } from 'src/app/core/data/Mesages';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent implements OnInit {
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
    this._globalService._currentUser.Email = profileModel.email;
    this._globalService._currentUser.EmailConfirmed = false;
    this._usersService.saveUser(JSON.stringify(this._globalService._currentUser));
    this._customToastrService.displaySuccessMessage(Messages.EMAIL_CHANGED_SUCCESSFULLY);
  }

  /**
   * Confirm email.
   * @returns void
   */
  public confirmEmail(): void {
    this._globalService._currentUser.EmailConfirmed = true;
    this._usersService.saveUser(JSON.stringify(this._globalService._currentUser));
    this._customToastrService.displaySuccessMessage(Messages.EMAIL_VERIFIED_SUCCESSFULLY);
  }

  /**
   * Set form data.
   * @returns void
   */
  private _setFormData(): void {
    this.profileForm.get('email').setValue(this.user.Email);
  }

  /**
   * Clear form data.
   * @returns void
   */
  private clearFormData() {
  }
}
