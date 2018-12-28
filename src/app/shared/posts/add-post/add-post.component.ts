import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { PostForm } from '../../../core/forms/posts/PostForm';
import { Post } from '../../../core/models/post';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  private _postForm: FormGroup = new PostForm().postForm;

  constructor() { }

  ngOnInit() {
  }

  private _addComment(postv): void{
  }

}
