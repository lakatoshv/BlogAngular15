import { GlobalService } from './../../../core/services/global-service/global-service.service';
import { UsersService } from './../../../core/services/users/users-service.service';
import { CommentsService } from './../../../core/services/posts-services/comments.service';
import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/core/models/Comment';
import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-comments-table',
  templateUrl: './comments-table.component.html',
  styleUrls: ['./comments-table.component.css']
})
export class CommentsTableComponent implements OnInit {
/**
   * @param comments Comment[]
   */
  comments: Comment[] = [];

  /**
   * @param user User
   */
  public user: User;

  /**
   * @param loggedIn boolean
   */
  public loggedIn = false;

  /**
   * @param _commentsService CommentsService
   * @param _usersService UsersService
   * @param _globalService GlobalService
   */
  constructor(
    private _commentsService: CommentsService,
    private _usersService: UsersService,
    private _globalService: GlobalService) { }

  /**
   * @inheritdoc
   */
  ngOnInit() {
    this.loggedIn = this._usersService.isLoggedIn();
    if (this.loggedIn) {
      this._globalService.resetUserData();
      this.user = this._globalService._currentUser;
    }

    this._getComments();
  }

  /**
   * Delete comment event
   * @param comment Comment
   * @returns void
   */
  deleteAction(comment: Comment): void {
    if (this.user.Id === comment.AuthorId) {
      this._commentsService.deleteComment(comment);
    }
  }

  /**
   * Get all posts.
   * @returns void
   */
  private _getComments(): void {
    this.comments = this._commentsService.getComments();
  }
}
