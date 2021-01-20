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
   * @param searchFilter string[]
   * @returns Post[]
   */
  public getPosts(search: string = null, searchFilter: string[] = []): Post[] {
    let posts = [];
    searchFilter = searchFilter.filter(x => x !== null && x !== undefined);
    this._posts.forEach(post => {
      post.TagsList = [];
      if (post.TagsListIds !== undefined) {
        post.TagsListIds.forEach(x => {
          if (!post.TagsList.includes(this._tagsService.getTag(x))) {
            post.TagsList.push(this._tagsService.getTag(x));
          }
        });
      }
      post.Author = this._usersService.getUserById(post.AuthorId);
      post.CommentsCount = this._posts.findIndex(item => item.Id === post.Id);
      posts.push(post);
    });

    if (search !== null) {
      posts = posts.filter(post => post.Title.includes(search));
    }

    if (searchFilter.length > 0) {
      // posts = posts.filter(post => post.TagsList.every(x => x.Title.includes(searchFilter)));
      const filteredPosts = [];
      posts = posts.map(post => {
        const found = post.TagsList.filter(tag => (searchFilter.includes(tag.Title)));
        if (found.length > 0) {
          filteredPosts.push(post);
        }
      });
      posts = filteredPosts;
    }

    return posts;
  }

  /**
   * get user posts.
   * @param userId number
   * @param search string
   * @param searchFilter string[]
   * @returns Post[]
   */
  public getUserPosts(userId: number, search: string = null, searchFilter: string[] = []): Post[] {
    let posts = [];
    searchFilter = searchFilter.filter(x => x !== null);

    this._posts.filter(user => user.Id === userId).forEach(post => {
      post.TagsList = [];
      if (post.TagsListIds !== undefined) {
        post.TagsListIds.forEach(x => {
          if (!post.TagsList.includes(this._tagsService.getTag(x))) {
            post.TagsList.push(this._tagsService.getTag(x));
          }
        });
      }
      post.Author = this._usersService.getUserById(userId);
      post.CommentsCount = this._posts.findIndex(item => item.Id === post.Id);
      posts.push(post);
    });

    if (search !== null) {
      posts = posts.filter(post => post.Title.includes(search));
    }

    if (searchFilter.length > 0) {
      // posts = posts.filter(post => post.TagsList.every(x => x.Title.includes(searchFilter)));
      const filteredPosts = [];
      posts = posts.map(post => {
        const found = post.TagsList.filter(tag => (searchFilter.includes(tag.Title)));
        if (found.length > 0) {
          filteredPosts.push(post);
        }
      });
      posts = filteredPosts;
    }

    return posts;
  }

  /**
   * Sort posts.
   * @param sort string
   * @returns Post[]
   */
  public sort(sort: string): Post[] {
    return sortBy(Object.values(this.getPosts()), [sort]);
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
    post.Author = this._usersService.getUserById(post.AuthorId);
    return post;
  }

  /**
   * Add new post.
   * @param post Post
   * @returns void
   */
  public addPost(post: Post): void {
    debugger
    if (this._posts.findIndex(x => x.Title === post.Title) > -1) {
      return;
    }

    post.TagsListIds = [];
    post.TagsList.forEach(tag => {
      post.TagsListIds.unshift(tag.Id);
    });

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
    post.TagsList.forEach(tag => {
      post.TagsListIds.unshift(tag.Id);
    });
    post.TagsListIds = post.TagsListIds.filter(function(item, pos, self) {
      return self.indexOf(item) === pos;
    });
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
