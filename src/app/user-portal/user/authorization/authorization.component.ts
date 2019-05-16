import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthorizationForm } from 'src/app/core/forms/user/AuthorizationForm';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {
  private _authorizationForm: FormGroup = new AuthorizationForm().authorizationForm;
  
  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
  }

  private _authorization(dataForAuthorize){
    /*
    if (this._authorizationForm.valid) {
      this._usersService.login(dataForAuthorize)
        .subscribe(
          (jwt:JwtToken) => {
            if (jwt) {
              this.succesLogin(jwt);
            }
          },
          (errorMessage) => {}
        );
    }*/
  }

  public succesLogin(): void {
    /*
    this._usersService.saveToken(jwt["auth_token"], jwt["refresh_token"]);
    const initializeSubscription = this._accountService.initialize(this._globalService._currentUser.Id).subscribe(
        (initializationData) => {
            this._globalService.initializeData(initializationData);
        },
        (errorMessage) => {}
    );*/
    //this._subscription.add(initializeSubscription);
    
    //this._globalService.setIsLoadedData(false);
  }
}
