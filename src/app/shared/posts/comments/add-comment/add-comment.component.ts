import { CommentsService } from './../../../../core/services/posts-services/comments.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CommentForm } from 'src/app/core/forms/posts/CommentForm';

import { Comment } from '../../../../core/models/Comment';
import { User } from 'src/app/core/models/User';
import { CustomToastrService } from 'src/app/core/services/custom-toastr.service';
import { Messages } from 'src/app/core/data/Mesages';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  /**
   * @param postId number
   */
  @Input() postId: number | undefined;

  /**
   * @param user User
   */
  @Input() user: User | null | undefined = null;

  /**
   * @param commentForm FormGroup
   */
  commentForm: FormGroup = new CommentForm().commentForm;

  /**
   * @param _commentsService CommentsService
   * @param _customToastrService CustomToastrService
   */
  constructor(
    private _commentsService: CommentsService,
    private _customToastrService: CustomToastrService
  ) { }

  /**
   * @inheritdoc
   */
  ngOnInit() {
    if (this.user) {
      this.commentForm.get('name')?.setValue(this.user.FirstName + ' ' + this.user.LastName);
      this.commentForm.get('email')?.setValue(this.user.Email);
    }
  }

  /**
   * Add Comment.
   */
  addComment(): void {
    if (this.commentForm.valid) {
      const comment: Comment = new Comment();
      comment.Content = this.commentForm.get('content')?.value;
      comment.CreatedAt = new Date();
      comment.PostId = this.postId;
      if (this.user) {
        comment.AuthorId = this.user.Id;
      } else {
        comment.Email = this.commentForm.get('email')?.value;
        comment.Name = this.commentForm.get('name')?.value;
      }
      this._commentsService.addComment(comment);
      this._customToastrService.displaySuccessMessage(Messages.COMMENT_CREATED_SUCCESSFULLY);
    }
  }
}
