import { Router } from '@angular/router';
import { Posts } from 'src/app/core/data/PostsList';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/core/models/Post';
import { Users } from 'src/app/core/data/UsersList';
import { Comments } from 'src/app/core/data/CommentsList';
import { Messages } from 'src/app/core/data/Mesages';
import { CustomToastrService } from 'src/app/core/services/custom-toastr.service';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.css']
})
export class PostsTableComponent implements OnInit {
  /**
   * @param posts Post[]
   */
  posts: Post[] = [];

  postsUrl = "";

  /**
   * @param _router Router
   * @param _customToastrService CustomToastrService
   */
  constructor(
    private _router: Router,
    private _customToastrService: CustomToastrService
  ) { }

  /**
   * @inheritdoc
   */
  ngOnInit() {
    this.postsUrl = this._router.url.includes('posts') ? "" : "posts";
    this._getPosts();
  }

  /**
   * Change post status action.
   * @param postId number
   * @param status string
   */
  onChangeStatusAction(postId: number, status: string) {}

  /**
   * Delete event
   * @param postId number
   * @returns void
   */
  public deleteAction(postId: number): void {
    const index = this.posts.findIndex(x => x.Id === postId);
    if (index > -1) {
      this.posts.splice(index, 1);
      const comments = Comments.filter(comment => comment.PostId === postId).forEach(comment => {
        Comments.splice(comment.Id, 1);
      });
      this._customToastrService.displaySuccessMessage(Messages.POST_DELETED_SUCCESSFULLY);
      this.posts = this.posts;
    }
  }

  /**
   * Get all posts
   */
  private _getPosts() {
    const posts = Posts.forEach(post => {
      post.Author = Users[post.AuthorId];
      post.CommentsCount = Posts.findIndex(item => item.Id === post.Id);
      this.posts.push(post);
    });
  }
}
