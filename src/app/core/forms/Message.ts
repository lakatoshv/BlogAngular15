import { FormGroup, FormControl } from '@angular/forms';

export class MessageForm {
    public messageForm = new FormGroup({
        name: new FormControl(''),
        email: new FormControl(''),
        message: new FormControl('')
    });
}