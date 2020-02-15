import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { PostForm } from '../../../core/forms/posts/PostForm';
import { UsersService } from 'src/app/core/services/users/users-service.service';
import { GlobalService } from 'src/app/core/services/global-service/global-service.service';
import { User } from 'src/app/core/models/user';
import { Posts } from 'src/app/core/data/posts';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  postForm: FormGroup = new PostForm().postForm;
  post: any;
  isLoggedIn = false;

  tagLabel = 'Додати новий тег';
  action = 'add';
  selectedTag = {
    value: '',
    id: null
  };

  user: User;

  private _postId: number;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _usersService: UsersService,
    private _globalService: GlobalService
  ) {
  }

  public options: Object = {
    plugins: 'media autolink autoresize autoresize charmap code textcolor colorpicker contextmenu directionality emoticons fullscreen help hr image imagetools importcss insertdatetime legacyoutput link lists noneditable pagebreak paste preview print save searchreplace tabfocus table template textcolor textpattern toc visualblocks visualchars wordcount',
    menubar: 'insert tools view format edit file table',
    toolbar: 'media charmap code forecolor backcolor ltr rtl emoticons fullscreen help image insertdatetime link numlist bullist pagebreak paste preview print save searchreplace table template textcolor toc visualblocks visualchars'
  };

  ngOnInit() {
    this._postId = parseInt(this._globalService.getRouteParam('post-id', this._activatedRoute));

    this.isLoggedIn = this._usersService.isLoggedIn();
    if (this._usersService.isLoggedIn()) {
      this._globalService.resetUserData();
      this.user = this._globalService._currentUser;
    } else {
      this._router.navigateByUrl('/authorization');
    }
    this._getPost();
  }

  tagAction(tag: string, action: string): void {
    if (action === 'add') { this.onAddTagAction(tag); }
    if (action === 'edit') { this.onEditTagAction(tag); }
  }

  edit(post) {}
  
  private _getPost() {
    debugger
    this.post = Posts[this._postId];
    if (this.post.authorId !== this.user.Id) {
      this._router.navigateByUrl("/");
    }
  }

  private _setFormData() {
    this.postForm.get('id').setValue(this.post.id);
    this.postForm.get('title').setValue(this.post.title);
    this.postForm.get('description').setValue(this.post.description);
    this.postForm.get('content').setValue(this.post.content);
    this.postForm.get('imgUrl').setValue(this.post.imgUrl);
  }

  private clearFormData() {
    this.tagLabel = 'Додати новий тег';
    this.action = 'add';
    this.selectedTag.value = '';
    this.selectedTag.id = null;
  }

  editTag(tag: string): void {
    this.selectedTag.value = tag;
    this.selectedTag.id = this.post.tags.indexOf(tag);
    this.action = 'edit';
    this.tagLabel = 'Редагувати тег';
  }

  onAddTagAction(tag: any) {
    this.post.tags.unshift(tag);
    this.clearFormData();
  }
  onEditTagAction(tag) {
    const index = this.selectedTag.id;
    if (index > -1) {
      this.post.tags[index] = tag;
      this.clearFormData();
    }
  }
  onDeleteTagAction(tag) {
    const index = this.post.tags.indexOf(tag);
    if (index > -1) {
      this.post.tags.splice(index, 1);
    }
  }
}
