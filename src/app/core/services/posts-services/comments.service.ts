import { UsersService } from 'src/app/core/services/users/users-service.service';
import { Comment } from '../../models/Comment';
import { Comments } from '../../data/CommentsList';
import { Injectable, EventEmitter } from '@angular/core';

/**
 * Comments service.
 */
@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  /**
   * @param commentAdded EventEmitter<boolean>
   */
  commentChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * @param _comments Comment[]
   */
  private _comments: Comment[] = Comments;

  /**
   * @param _usersService UsersService
   */
  constructor(private _usersService: UsersService) { }

  /**
   * Get comment position by id.
   * @param id number
   * @returns number
   */
  public getCommentPositionById(id: number): number {
    return this._comments.findIndex(x => x.Id === id);
  }

  /**
   * Get comments by post id.
   * @param postId number
   * @returns Comment[].
   */
  public getCommentsByPostId(postId: number): Comment[] {
    const comments: Comment[] = [];
    this._comments.filter(item => item.PostId === postId).forEach(comment => {
      comment.Author = this._usersService.getUserById(comment.AuthorId);
      comments.push(comment);
    });
    return comments;
  }

  /**
   * Add new comment.
   * @param comment Comment
   * @returns void
   */
  public addComment(comment: Comment): void {
    if (comment.AuthorId !== null) {
      comment.Author = this._usersService.getUserById(comment.AuthorId);
    }
    this._comments.unshift(comment);
    this.commentChanged.emit(true);
  }

  /**
   * Edit comment.
   * @param comment Comment
   * @returns void
   */
  public editComment(comment: Comment): void {
    const index = this.getCommentPositionById(comment.Id);
    if (index > -1) {
      this._comments[index] = comment;
    }
    this.commentChanged.emit(true);
  }

  /**
   * Delete comment.
   * @param comment Comment
   * @returns void
   */
  public deleteComment(comment: Comment): void {
    const index = this.getCommentPositionById(comment.Id);
    if (index > -1) {
      this._comments.splice(index, 1);
    }
    this.commentChanged.emit(true);
  }

  /**
   * Delete comment by post id.
   * @param postId number
   * @returns void
   */
  public deleteCommentsByPostId(postId: number): void {
    const comments = this._comments.filter(comment => comment.PostId === postId).forEach(comment => {
      this._comments.splice(comment.Id, 1);
    });
    this.commentChanged.emit(true);
  }
}
