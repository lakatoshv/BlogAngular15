import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthorizationForm } from 'src/app/core/forms/user/AuthorizationForm';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users/users-service.service';
import { JwtToken } from 'src/app/core/models/JwtToken';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {
  private _authorizationForm: FormGroup = new AuthorizationForm().authorizationForm;
  
  constructor(
    private _router: Router,
    private _usersService: UsersService
  ) { }

  ngOnInit() {
  }

  private _authorization(dataForAuthorize){
    if (this._authorizationForm.valid) {
      var user = this._usersService.login(dataForAuthorize);
      if(user)
        this.succesLogin(user)
    }
  }

  public succesLogin(user: string): void {
    this._usersService.saveUser(user);
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
