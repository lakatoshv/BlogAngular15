import { FormGroup, FormControl } from '@angular/forms';

/**
 * Tag add/edit form.
 */
export class TagForm {
    public tagForm = new FormGroup({
        /**
         * title input field.
         */
        title: new FormControl(''),
    });
}
