import { CommentsService } from './../../../../core/services/posts-services/comments.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommentForm } from 'src/app/core/forms/posts/CommentForm';

import { Comment } from '../../../../core/models/Comment';
import { User } from 'src/app/core/models/User';
import { UsersService } from 'src/app/core/services/users/users-service.service';
import { GlobalService } from 'src/app/core/services/global-service/global-service.service';
import { CustomToastrService } from 'src/app/core/services/custom-toastr.service';
import { Messages } from 'src/app/core/data/Mesages';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.scss']
})
export class EditCommentComponent implements OnInit {
  /**
   * @param comment Comment
   */
  @Input() comment: Comment | undefined;

  /**
   * @param loggedIn boolean
   */
  public loggedIn = false;

  /**
   * @param user User
   */
  public user: User | undefined | null = null;

  /**
   * @param commentForm FormGroup
   */
  commentForm: FormGroup = new CommentForm().commentForm;

  /**
   * @param _usersService UsersService
   * @param _globalService GlobalService
   * @param _customToastrService CustomToastrService
   */
  constructor(
    private _usersService: UsersService,
    private _globalService: GlobalService,
    private _commentsService: CommentsService,
    private _customToastrService: CustomToastrService
  ) { }

  /**
   * @inheritdoc
   */
  ngOnInit() {
    this.loggedIn = this._usersService.isLoggedIn();

    if (this.loggedIn) {
      this._globalService.resetUserData();
      this.user = this._globalService._currentUser;
    }
    if (this.user?.Id === this.comment?.AuthorId) {
      this.setFormValue();
    }
  }

  /**
   * Sets form value.
   */
  public setFormValue(): void {
    this.commentForm.get('name')?.setValue(this.comment?.Author?.FirstName + ' ' + this.comment?.Author?.LastName);
    this.commentForm.get('email')?.setValue(this.comment?.Author?.Email);
    this.commentForm.get('content')?.setValue(this.comment?.Content);
  }

  /**
   * Edit comment.
   * 
   * @param comment Comment
   */
  public edit(): void {
    if (
      this.commentForm.valid &&
      this.user?.Id === this.comment?.AuthorId &&
      this.comment !== undefined) {
      this.comment.Content = this.commentForm.get('content')?.value;
      this._commentsService.editComment(this.comment);
      this._customToastrService.displaySuccessMessage(Messages.COMMENT_EDITED_SUCCESSFULLY);
    }
  }
}
