import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Messages } from 'src/app/core/data/Mesages';
import { CustomToastrService } from 'src/app/core/services/custom-toastr.service';
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
    private _customToastrService: CustomToastrService
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
    if (
      this.registrationForm.valid &&
      this.registrationForm.value.password === this.registrationForm.value.confirmPassword) {
      this._customToastrService.displaySuccessMessage(Messages.REGISTERED_SUCCESSFULLY);
    }
  }

}
