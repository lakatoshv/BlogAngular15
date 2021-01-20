import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthorizationForm } from 'src/app/core/forms/user/AuthorizationForm';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users/users-service.service';
import { Messages } from 'src/app/core/data/Mesages';
import { CustomToastrService } from 'src/app/core/services/custom-toastr.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {
  /**
   * @param authorizationForm FormGroup
   */
  authorizationForm: FormGroup = new AuthorizationForm().authorizationForm;

  /**
   * @param _router Router
   * @param _usersService UsersService
   * @param _customToastrService CustomToastrService
   */
  constructor(
    private _router: Router,
    private _usersService: UsersService,
    private _customToastrService: CustomToastrService
  ) { }

  /**
   * @inheritdoc
   */
  ngOnInit() {
  }

  /**
   * Authorization event
   * @param dataForAuthorize any
   * @returns void
   */
  authorization(dataForAuthorize: any): void {
    debugger
    if (this.authorizationForm.valid) {
      const user = this._usersService.login(dataForAuthorize);
      if (user) {
        this.successLogin(user);
      }
    }
  }

  /**
   * Save user data if login success
   * @param user string
   */
  public successLogin(user: string): void {
    
    this._usersService.saveUser(user);
    this._customToastrService.displaySuccessMessage(Messages.AUTHORIZED_SUCCESSFULLY);
    this._router.navigate(['/']);
    /*
    const initializeSubscription = this._accountService.initialize(this._globalService._currentUser.Id).subscribe(
        (initializationData) => {
            this._globalService.initializeData(initializationData);
            this._router.navigate(['/']);
        },
        (errorMessage) => {}
    );
    */
  }
}
