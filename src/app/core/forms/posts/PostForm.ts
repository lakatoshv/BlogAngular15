import { FormGroup, FormControl } from '@angular/forms';

/**
 * Post add/edit form.
 */
export class PostForm {
    public postForm = new FormGroup({
        /**
         * Title input field.
         */
        title: new FormControl(''),

        /**
         * Description input field.
         */
        description: new FormControl(''),

        /**
         * Content input field.
         */
        content: new FormControl(''),

        /**
         * ImageUrl input field.
         */
        img_url: new FormControl(''),

        /**
         * Tags input field.
         */
        tags: new FormControl(''),

        /**
         * Date input field.
         */
        date: new FormControl(''),
    });
}
