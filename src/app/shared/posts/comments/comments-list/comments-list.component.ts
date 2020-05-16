import { CommentsService } from './../../../../core/services/posts-services/comments.service';
import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { GeneralServiceService } from 'src/app/core';
import { Comments } from 'src/app/core/data/CommentsList';
import { Comment } from 'src/app/core/models/Comment';
import { UsersService } from 'src/app/core/services/users/users-service.service';
import { GlobalService } from 'src/app/core/services/global-service/global-service.service';
import { User } from 'src/app/core/models/User';
import { Users } from 'src/app/core/data/UsersList';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {
  /**
   * @param postId number
   */
  @Input("post-id") postId: number;

  /**
   * @param comments Comment[]
   */
  public comments: Comment[] = [];

  /**
   * @param comment Comment
   */
  public comment: Comment;

  /**
   * @param user User
   */
  public user: User;

  /**
   * @param pageInfo Object
   */
  public pageInfo: any = {
    pageSize: 10,
    pageNumber: 0,
    totalItems: 0
  };

  /**
   * @param loggedIn boolean
   */
  public loggedIn = false;

  /**
   * @param editCommentId number
   */
  public editCommentId: number;

  /**
   * @param isLoadEdit boolean
   */
  isLoadEdit = false;

  /**
   * @param users User[]
   */
  private users: User[] = [];

  /**
   * @param _generalService GeneralServiceService
   * @param _activatedRoute ActivatedRoute
   * @param _usersService UsersService
   * @param _globalService GlobalService
   */
  constructor(
    private _generalService: GeneralServiceService,
    private _activatedRoute: ActivatedRoute,
    private _usersService: UsersService,
    private _globalService: GlobalService,
    private _commentsService: CommentsService,
  ) { }

  /**
   * @inheritdoc
   */
  ngOnInit() {
    this._getCommentsForCurrentPost();

    this.loggedIn = this._usersService.isLoggedIn();
    if (this.loggedIn) {
      this._globalService.resetUserData();
      this.user = this._globalService._currentUser;
    }
    this._commentsService.commentChanged.subscribe(
      () => {
        this.comments = this._commentsService.getCommentsByPostId(this.postId);
        this.pageInfo.totalItems = this.comments.length;
        this.isLoadEdit = false;
      }
    );
  }

  /**
   * Comments pagination.
   *
   * @param page number
   * @returns void
   */
  public paginate(page: number): void {
    this.pageInfo.pageNumber = page;
  }

  /**
   * Find comment by value
   * TODO Find comment by value
   * @returns void
   */
  public findByValue() {
    // const index = Data.findIndex(item => item.name === 'John');
  }

  /**
   * Edit comment event
   * @param comment Comment
   * @returns void
   */
  editAction(comment: Comment): void {
    this.editCommentId = comment.Id;
    this.comment = comment;
    this.isLoadEdit = true;
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
   * Get comments for current post.
   *
   * @returns void
   */
  private _getCommentsForCurrentPost(): void {
    this.users = Users;
    this.comments = this._commentsService.getCommentsByPostId(this.postId);
    this.pageInfo.totalItems = this.comments.length;
  }

  /**
   * Load edit component event
   * @returns void
   */
  private _onLoadEditAction(): void {
    this.isLoadEdit = true;
  }
}
