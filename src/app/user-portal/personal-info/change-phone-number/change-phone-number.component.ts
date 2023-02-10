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
  selector: 'app-change-phone-number',
  templateUrl: './change-phone-number.component.html',
  styleUrls: ['./change-phone-number.component.scss']
})
export class ChangePhoneNumberComponent implements OnInit {
/**
   * @param user User | null
   */
  public user: User | null = null;

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

      if(this._globalService._currentUser) {
        this.user = this._globalService._currentUser;
      }

      this._setFormData();
    } else {
      this._router.navigateByUrl('/authorization');
    }
  }

  /**
   * Edit profile.
   * 
   * @param profileModel any
   */
  edit(profileModel: any): void {
    if(this._globalService._currentUser) {
      this._globalService._currentUser.PhoneNumber = profileModel.phoneNumber;
      this._globalService._currentUser.PhoneNumberConfirmed = false;
      this._usersService.saveUser(JSON.stringify(this._globalService._currentUser));
      this._customToastrService.displaySuccessMessage(Messages.PHONE_NUMBER_CHANGED_SUCCESSFULLY);
    }
  }

  /**
   * Confirm phone number.
   */
  public confirmPhoneNumber(): void {
    if(this._globalService._currentUser) {
      this._globalService._currentUser.PhoneNumberConfirmed = true;
      this._usersService.saveUser(JSON.stringify(this._globalService._currentUser));
      this._customToastrService.displaySuccessMessage(Messages.PHONE_NUMBER_VERIFIED_SUCCESSFULLY);
    }
  }

  /**
   * Set form data.
   */
  private _setFormData(): void {
    this.profileForm.get('phoneNumber')?.setValue(this.user?.PhoneNumber);
  }

  /**
   * Clear form data.
   */
  private clearFormData(): void {
  }
}
