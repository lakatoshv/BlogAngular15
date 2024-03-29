import { CommentsService } from './../../../../core/services/posts-services/comments.service';
import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/core/models/Comment';
import { UsersService } from 'src/app/core/services/users/users-service.service';
import { GlobalService } from 'src/app/core/services/global-service/global-service.service';
import { User } from 'src/app/core/models/User';
import { Users } from 'src/app/core/data/UsersList';
import { Messages } from 'src/app/core/data/Mesages';
import { CustomToastrService } from 'src/app/core/services/custom-toastr.service';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {
  /**
   * @param postId number
   */
  @Input("post-id") postId: number | undefined;

  /**
   * @param comments Comment[]
   */
  public comments: Comment[] = [];

  /**
   * @param comment Comment
   */
  public comment: Comment | undefined;

  /**
   * @param user User
   */
  public user: User | undefined;

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
  public editCommentId: number | undefined;

  /**
   * @param isLoadEdit boolean
   */
  isLoadEdit = false;

  /**
   * @param users User[]
   */
  private users: User[] = [];

  /**
   * @param _usersService UsersService
   * @param _globalService GlobalService
   * @param _commentsService: CommentsService
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
    this._getCommentsForCurrentPost();

    this.loggedIn = this._usersService.isLoggedIn();
    if (this.loggedIn) {
      this._globalService.resetUserData();
      this.user = this._globalService._currentUser;
    }
    this._commentsService.commentChanged.subscribe(
      () => {
        if(this.postId) {
          this.comments = this._commentsService.getCommentsByPostId(this.postId);
          this.pageInfo.totalItems = this.comments.length;
          this.isLoadEdit = false;
        }
      }
    );
  }

  /**
   * Comments pagination.
   *
   * @param page number
   */
  public paginate(page: number): void {
    this.pageInfo.pageNumber = page;
  }

  /**
   * Find comment by value.
   * 
   * TODO Find comment by value
   */
  public findByValue() {
    // const index = Data.findIndex(item => item.name === 'John');
  }

  /**
   * Edit comment event.
   * 
   * @param comment Comment
   */
  editAction(comment: Comment): void {
    this.editCommentId = comment.Id;
    this.comment = comment;
    this.isLoadEdit = true;
  }

  /**
   * Delete comment event.
   * 
   * @param comment Comment
   */
  deleteAction(comment: Comment): void {
    if (this.user?.Id === comment.AuthorId) {
      this._commentsService.deleteComment(comment);
      this._customToastrService.displaySuccessMessage(Messages.COMMENT_DELETED_SUCCESSFULLY);
    }
  }

  /**
   * Get comments for current post.
   */
  private _getCommentsForCurrentPost(): void {
    this.users = Users;
    if(this.postId) {
      this.comments = this._commentsService.getCommentsByPostId(this.postId);
      this.pageInfo.totalItems = this.comments.length;
    }
  }

  /**
   * Load edit component event.
   */
  private _onLoadEditAction(): void {
    this.isLoadEdit = true;
  }
}
