import { FormGroup, FormControl } from '@angular/forms';

export class SearchForm {
    public searchForm = new FormGroup({
        search: new FormControl(''),
    });
}