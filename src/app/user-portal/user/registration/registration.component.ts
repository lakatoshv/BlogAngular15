import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegistrationForm } from '../../../core/forms/user/RegistrationForm';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  private _registrationForm: FormGroup = new RegistrationForm().registrationForm;
  
  constructor(
  ) { }

  ngOnInit() {
  }

  private _register(){
    if (this._registrationForm.value.password === this._registrationForm.value.confirmPassword) {
    }
  }

}
