import { Posts } from 'src/app/core/data/PostsList';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/core/models/Post';
import { Users } from 'src/app/core/data/UsersList';

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

  /**
   * @inheritdoc
   */
  constructor() { }

  /**
   * @inheritdoc
   */
  ngOnInit() {
    this._getPosts();
  }

  /**
   * Change post status action.
   * @param postId number
   * @param status string
   */
  onChangeStatusAction(postId: number, status: string) {}

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
