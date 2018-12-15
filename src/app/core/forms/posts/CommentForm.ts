import { FormGroup, FormControl } from '@angular/forms';

export class CommentForm {
    public commentForm = new FormGroup({
        content: new FormControl(''),
        email: new FormControl(''),
        name: new FormControl(''),
    });
}