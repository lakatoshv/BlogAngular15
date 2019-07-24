import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CommentForm } from 'src/app/core/forms/posts/CommentForm';

import { Comment } from "../../../../core/models/comment";
import { User } from 'src/app/core/models/user';
import { UsersService } from 'src/app/core/services/users/users-service.service';
import { GlobalService } from 'src/app/core/services/global-service/global-service.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {
  @Output() onEdit = new EventEmitter<any>();
  @Input() comment: Comment;

  public loggedIn: boolean = false;
  public user: User = null;

  private _commentForm: FormGroup = new CommentForm().commentForm;

  constructor(
    private _usersService: UsersService,
    private _globalService: GlobalService
  ) { 
  }

  ngOnInit() {
    this.loggedIn = this._usersService.isLoggedIn();

    if(this.loggedIn){
      this._globalService.resetUserData();  
      this.user = this._globalService._currentUser;
    }
    if(this.user.Id === this.comment.authorId)
      this.setFormValue();
  }

  public setFormValue(){
    this._commentForm.get('author').setValue(this.comment.author);
    this._commentForm.get('email').setValue(this.comment.email);
    this._commentForm.get('content').setValue(this.comment.content);
  }

  private _edit(comment){
    if(this.user.Id === this.comment.authorId){
      comment.id = this.comment.id;
      this.onEdit.emit(comment);
    }
  }

}