import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { Post } from 'src/app/core/models/post';
import { GeneralServiceService } from 'src/app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from 'src/app/core/services/global-service/global-service.service';
import { UsersService } from 'src/app/core/services/users/users-service.service';
import { FormGroup } from '@angular/forms';
import { ProfileForm } from 'src/app/core/forms/user/ProfileForm';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  public user: User = null;
  public isLoggedIn: boolean = false;
  public profileForm: FormGroup = new ProfileForm().profileForm;

  constructor(
    private _router: Router,
    private _globalService: GlobalService,
    private _usersService: UsersService
  ) { }

  public ngOnInit() {
    this.isLoggedIn = this._usersService.isLoggedIn()
    if(this._usersService.isLoggedIn()){
      this._globalService.resetUserData(); 
      this.user = this._globalService._currentUser;
      this._setFormData();
    }
    else {
      this._router.navigateByUrl("/authorization");
    }
  }

  edit(profileModel){
    if(profileModel.oldPassword !== null && profileModel.newPassword !== null){
      if(profileModel.oldPassword === this._globalService._currentUser.Password)
        this._globalService._currentUser.Password = profileModel.newPassword;
      else console.error("Different passwords");
    }
    this._globalService._currentUser.UserName = profileModel.firstName + " " + profileModel.lastName;
    this._globalService._currentUser.Email = profileModel.email;
    this._globalService._currentUser.FirstName = profileModel.firstName;
    this._globalService._currentUser.LastName = profileModel.lastName;
    this._globalService._currentUser.PhoneNumber = profileModel.phoneNumber;
    this._globalService._currentUser.About = profileModel.about;
    this._usersService.saveUser(JSON.stringify(this._globalService._currentUser));
  }

  private _setFormData(){
    this.profileForm.get('userName').setValue(this.user.FirstName + " " + this.user.LastName);
    this.profileForm.get('email').setValue(this.user.Email);
    this.profileForm.get('firstName').setValue(this.user.FirstName);
    this.profileForm.get('lastName').setValue(this.user.LastName);
    this.profileForm.get('phoneNumber').setValue(this.user.PhoneNumber);
    this.profileForm.get('about').setValue(this.user.About);
  }

  private clearFormData(){
  }

}
