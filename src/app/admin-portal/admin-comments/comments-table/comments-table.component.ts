import { GlobalService } from './../../../core/services/global-service/global-service.service';
import { UsersService } from './../../../core/services/users/users-service.service';
import { CommentsService } from './../../../core/services/posts-services/comments.service';
import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/core/models/Comment';
import { User } from 'src/app/core/models/User';
import { GeneralServiceService } from 'src/app/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
    this.postId = parseInt(this._generalService.getRouteParam('post-id', this._activatedRoute), null);

    this._activatedRoute.params.subscribe(
      (params: Params) => {
        this.postId = parseInt(params['post-id'], null);
        this._checkIfUserIsLoggedIn();

        this._getComments(this.postId);
      }
    );

    this._checkIfUserIsLoggedIn();

    this._getComments(this.postId);

    this._commentsService.commentChanged.subscribe(
      () => {
        this._getComments(this.postId);
      }
    );
  }

  /**
   * Delete comment event
   * @param comment Comment
   * @returns void
   */
  deleteAction(comment: Comment): void {
    this._commentsService.deleteComment(comment);
  }

  /**
   * Get all posts.
   * @param postId number
   * @returns void
   */
  private _getComments(postId: number): void {
    this.comments = !isNaN(postId)
      ? this._commentsService.getCommentsByPostId(postId)
      : this._commentsService.getComments();
  }

  /**
   * Check if user is logged in.
   * @returns void
   */
  private _checkIfUserIsLoggedIn(): void {
    this.loggedIn = this._usersService.isLoggedIn();
    if (this.loggedIn) {
      this._globalService.resetUserData();
      this.user = this._globalService._currentUser;
    }
  }
}
