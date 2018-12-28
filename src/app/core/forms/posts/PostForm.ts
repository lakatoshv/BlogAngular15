import { FormGroup, FormControl } from '@angular/forms';

export class PostForm {
    public postForm = new FormGroup({
        title: new FormControl(''),
        description: new FormControl(''),
        content: new FormControl(''),
        img_url: new FormControl(''),
        tags: new FormControl(''),
        date: new FormControl(''),
    });
}