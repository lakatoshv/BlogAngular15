import { FormGroup, FormControl } from '@angular/forms';

export class ProfileForm {
    public profileForm = new FormGroup({
        userName: new FormControl(''),
        email: new FormControl(''),
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        phoneNumber: new FormControl(''),
        oldPassword: new FormControl(''),
        newPassword: new FormControl(''),
        about: new FormControl(''),
    });
}