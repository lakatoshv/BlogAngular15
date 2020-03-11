import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { PostForm } from '../../../core/forms/posts/PostForm';
import { Post } from '../../../core/models/Post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  /**
   * @param postForm FormGroup
   */
  postForm: FormGroup = new PostForm().postForm;

  /**
   * @param _router Router
   */
  constructor(
    private _router: Router
  ) { }

  /**
   * @inheritdoc
   */
  ngOnInit() {
  }

  /**
   * Add new post
   * @param post Post
   * @returns void
   */
  add(post: Post): void {
    this._router.navigate(['/']);
  }

}
