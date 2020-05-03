import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CommentForm } from 'src/app/core/forms/posts/CommentForm';

import { Comment } from '../../../../core/models/Comment';
import { GlobalService } from 'src/app/core/services/global-service/global-service.service';
import { UsersService } from 'src/app/core/services/users/users-service.service';
import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  /**
   * @param user User
   */
  @Input() user: User = null;

  /**
   * @param onAdd EventEmitter<any>
   */
  @Output() onAdd: EventEmitter<any> = new EventEmitter<any>();
  commentForm: FormGroup = new CommentForm().commentForm;

  /**
   * @param _globalService GlobalService
   * @param _usersService UsersService
   */
  constructor(
    private _globalService: GlobalService,
    private _usersService: UsersService
  ) { }

  /**
   * @inheritdoc
   */
  ngOnInit() {
    if (this.user) {
      this.commentForm.get('name').setValue(this.user.FirstName + ' ' + this.user.LastName);
      this.commentForm.get('email').setValue(this.user.Email);
    }
  }

  /**
   * Add Comment
   * @returns void
   */
  addComment(): void {
    const comment: Comment = new Comment();
    comment.Content = this.commentForm.get('content').value;
    comment.CreatedAt = new Date();
    if (this.user) {
      comment.AuthorId = this.user.Id;
    } else {
      comment.Email = this.commentForm.get('email').value;
      comment.Name = this.commentForm.get('name').value;
    }
    this.onAdd.emit(comment);
  }
}
