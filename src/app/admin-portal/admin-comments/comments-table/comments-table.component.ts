import { GlobalService } from './../../../core/services/global-service/global-service.service';
import { UsersService } from './../../../core/services/users/users-service.service';
import { CommentsService } from './../../../core/services/posts-services/comments.service';
import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/core/models/Comment';
import { User } from 'src/app/core/models/User';
import { GeneralServiceService } from 'src/app/core';
import { ActivatedRoute } from '@angular/router';

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
   * @param postId number
   */
  public postId: number;

  /**
   * @param _commentsService CommentsService
   * @param _usersService UsersService
   * @param _globalService GlobalService
   */
  constructor(
    private _commentsService: CommentsService,
    private _usersService: UsersService,
    private _globalService: GlobalService,
    private _generalService: GeneralServiceService,
    private _activatedRoute: ActivatedRoute
  ) { }

  /**
   * @inheritdoc
   */
  ngOnInit() {
    this.postId = parseInt(this._generalService.getRoutePeram('post-id', this._activatedRoute), null);
    this.loggedIn = this._usersService.isLoggedIn();
    if (this.loggedIn) {
      this._globalService.resetUserData();
      this.user = this._globalService._currentUser;
    }

    this._getComments(this.postId);
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
   * @param postId number
   * @returns void
   */
  private _getComments(postId: number): void {
    this.comments = postId !== NaN
      ? this._commentsService.getCommentsByPostId(postId)
      : this._commentsService.getComments();
  }
}
