import { TagsService } from './tags.service';
import { sortBy } from 'lodash';
import { CommentsService } from './comments.service';
import { UsersService } from './../users/users-service.service';
import { Post } from './../../models/Post';
import { Posts } from './../../data/PostsList';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  /**
   * @param postChanged EventEmitter<boolean>
   */
  postChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * @param _posts Post[]
   */
  private _posts: Post[] = Posts;

  /**
   * @param _usersService UsersService
   * @param _commentsService CommentsService
   * @param _tagsService TagsService
   */
  constructor(
    private _usersService: UsersService,
    private _commentsService: CommentsService,
    private _tagsService: TagsService
  ) { }

  /**
   * Get posts.
   * @param search string
   * @returns Post[]
   */
  public getPosts(search: string = null): Post[] {
    let posts = [];
    this._posts.forEach(post => {
      post.TagsList = [];
      if (post.TagsListIds !== undefined) {
        post.TagsListIds.forEach(x => {
          if (!post.TagsList.includes(this._tagsService.getTag(x))) {
            post.TagsList.push(this._tagsService.getTag(x));
          }
        });
      }
      post.Tags.split(', ').forEach(x => {
        const tag = this._tagsService.getTagByTitle(x);
        if (!post.TagsList.includes(tag)) {
          post.TagsList.push(tag);
        }
      });
      post.Author = this._usersService.getUserById(post.AuthorId);
      post.CommentsCount = this._posts.findIndex(item => item.Id === post.Id);
      posts.push(post);
    });

    if (search !== null) {
      posts = posts.filter(post => post.Title.includes(search));
    }

    return posts;
  }

  /**
   * get user posts.
   * @param userId number
   * @param search string
   * @returns Post[]
   */
  public getUserPosts(userId: number, search: string = null): Post[] {
    let posts = [];

    this._posts.filter(user => user.Id === userId).forEach(post => {
      post.TagsList = [];
      if (post.TagsListIds !== undefined) {
        post.TagsListIds.forEach(x => {
          if (!post.TagsList.includes(this._tagsService.getTag(x))) {
            post.TagsList.push(this._tagsService.getTag(x));
          }
        });
      }
      post.Tags.split(', ').forEach(x => {
        const tag = this._tagsService.getTagByTitle(x);
        if (!post.TagsList.includes(tag)) {
          post.TagsList.push(tag);
        }
      });
      post.Author = this._usersService.getUserById(userId);
      post.CommentsCount = this._posts.findIndex(item => item.Id === post.Id);
      posts.push(post);
    });

    if (search !== null) {
      posts = posts.filter(post => post.Title.includes(search));
    }

    return posts;
  }

  /**
   * Sort posts.
   * @param sort string
   * @returns Post[]
   */
  public sort(sort: string): Post[] {
    return sortBy(Object.values(this._posts), [sort]);
  }

  /**
   * Get post by id.
   * @param id number
   * @returns Post
   */
  public getPost(id: number): Post {
    const post = this._posts[id];
    post.TagsList = [];
    if (post.TagsListIds !== undefined) {
      post.TagsListIds.forEach(x => {
        if (!post.TagsList.includes(this._tagsService.getTag(x))) {
          post.TagsList.push(this._tagsService.getTag(x));
        }
      });
    }
    post.Tags.split(', ').forEach(x => {
      const tag = this._tagsService.getTagByTitle(x);
      if (!post.TagsList.includes(tag)) {
        post.TagsList.push(tag);
      }
    });
    post.Author = this._usersService.getUserById(post.AuthorId);
    return post;
  }

  /**
   * Add new post.
   * @param post Post
   * @returns void
   */
  public addPost(post: Post): void {
    if (post.AuthorId !== null) {
      post.Author = this._usersService.getUserById(post.AuthorId);
    }
    this._posts.unshift(post);
    this.postChanged.emit(true);
  }

  /**
   * Edit post by id.
   * @param id number
   * @param post Post
   */
  public editPost(id: number, post: Post): void {
    if (id > -1) {
      this._posts[id] = post;
    }
    this.postChanged.emit(true);
  }

  /**
   * Like post.
   * @param id number
   * @returns void
   */
  public like(id: number): void {
    this._posts[id].Likes++;
    this.postChanged.emit(true);
  }

  /**
   * Dislike post.
   * @param id number
   * @returns void
   */
  public dislike(id: number): void {
    this._posts[id].Dislikes++;
    this.postChanged.emit(true);
  }

  /**
   * Delete post by id.
   * @param id number
   * @returns void
   */
  public deletePost(id: number): void {
    const index = this._posts.findIndex(x => x.Id === id);
    if (index > -1) {
      this._posts.splice(index, 1);
      this._commentsService.deleteCommentsByPostId(id);
      this.postChanged.emit(true);
    }
  }
}
