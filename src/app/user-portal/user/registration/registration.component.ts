import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RegistrationForm } from '../../../core/forms/user/RegistrationForm';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  /**
   * @param registrationForm FormGroup
   */
  registrationForm: FormGroup = new RegistrationForm().registrationForm;

  constructor(
  ) { }

  /**
   * @inheritdoc
   */
  ngOnInit() {
  }

  /**
   * Register user event
   */
  register() {
    if (this.registrationForm.value.password === this.registrationForm.value.confirmPassword) {
    }
  }

}
