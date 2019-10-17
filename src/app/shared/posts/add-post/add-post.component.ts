import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { PostForm } from '../../../core/forms/posts/PostForm';
import { Post } from '../../../core/models/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup = new PostForm().postForm;

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
  }

  add(post: Post): void{
    this._router.navigate(["/"]);
  }

}
