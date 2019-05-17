import { FormGroup, FormControl } from '@angular/forms';

export class RegistrationForm {
    public registrationForm = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl(''),
        confirmPassword: new FormControl(''),
        phoneNumber: new FormControl(''),
        roles: new FormControl(''),
    });
}