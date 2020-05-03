import { UsersService } from 'src/app/core/services/users/users-service.service';
import { Comment } from '../../models/Comment';
import { Comments } from '../../data/CommentsList';
import { Injectable } from '@angular/core';

/**
 * Comments service.
 */
@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private _comments: Comment[] = Comments;

  constructor(private _usersService: UsersService) { }

  public getCommentPositionById(id: number): number {
    return this._comments.findIndex(x => x.Id === id);
  }

  public getCommentsByPostId(postId: number): Comment[] {
    const comments: Comment[] = [];
    this._comments.filter(item => item.PostId === postId).forEach(comment => {
      comment.Author = this._usersService.getUserById(comment.AuthorId);
      comments.push(comment);
    });
    return comments;
  }
}
