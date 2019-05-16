import { FormGroup, FormControl } from '@angular/forms';

export class AuthorizationForm {
    public authorizationForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
    });
}