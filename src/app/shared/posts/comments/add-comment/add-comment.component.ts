import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  content = new FormControl('');
  email = new FormControl('');
  name = new FormControl('');
  constructor() { }

  ngOnInit() {
  }

}
