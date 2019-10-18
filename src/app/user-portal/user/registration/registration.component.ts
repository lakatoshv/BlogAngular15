import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegistrationForm } from '../../../core/forms/user/RegistrationForm';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup = new RegistrationForm().registrationForm;
  
  constructor(
  ) { }

  ngOnInit() {
  }

  register(){
    if (this.registrationForm.value.password === this.registrationForm.value.confirmPassword) {
    }
  }

}
