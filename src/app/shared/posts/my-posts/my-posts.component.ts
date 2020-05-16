import { CommentsService } from './../../../core/services/posts-services/comments.service';
import { PostsService } from './../../../core/services/posts-services/posts.service';
import { PageInfo } from './../../../core/models/PageInfo';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/core/services/global-service/global-service.service';
import { SearchForm } from 'src/app/core/forms/SearchForm';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models/User';
import { UsersService } from 'src/app/core/services/users/users-service.service';
import { Posts } from 'src/app/core/data/PostsList';
import { Users } from 'src/app/core/data/UsersList';
import { sortBy } from 'lodash';
import { Comments } from 'src/app/core/data/CommentsList';
import { Post } from 'src/app/core/models/Post';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {
  /**
   * @param posts Post[]
   */
  public posts: Post[] = [];

  /**
   * @param user User
   */
  public user: User;

  /**
   * @param pageInfo PageInfo
   */
  public pageInfo: PageInfo = {
    PageSize: 10,
    PageNumber: 0,
    TotalItems: 0
  };

  /**
   * @param isLoggedIn boolean
   */
  public isLoggedIn = false;

  /**
   * @param isLoaded boolean
   */
  public isLoaded = false;

  /**
   * @param isCurrentUserPosts boolean
   */
  public isCurrentUserPosts = false;

  /**
   * @param displayType string
   */
  public displayType = 'list';

  /**
   * @param sortBy string
   */
  public sortBy = 'title';

  /**
   * @param orderBy string
   */
  public orderBy = 'asc';

  /**
   * @param searchForm FormGroup
   */
  public searchForm: FormGroup = new SearchForm().searchForm;

  /**
   * @param _userId number
   */
  private _userId: number;

  /**
   * @param _globalService GlobalService
   * @param _router Router
   * @param _activatedRoute ActivatedRoute
   * @param _usersService UsersService
   * @param _postsService PostsService
   * @param _commentsService CommentsService
   */
  constructor(
    private _globalService: GlobalService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _usersService: UsersService,
    private _postsService: PostsService
  ) {
  }

  /**
   * @inheritdoc
   */
  ngOnInit() {
    this.isLoggedIn = this._usersService.isLoggedIn();
    if (this._usersService.isLoggedIn()) {
      this._globalService.resetUserData();
      this.user = this._globalService._currentUser;
    } else {
      this._router.navigateByUrl('/authorization');
    }

    if (this._router.url.includes('/my-posts')) {
      this._userId = this.user.Id;
      this.isCurrentUserPosts = true;
    } else {
      this._userId = parseInt(this._globalService.getRouteParam('user-id', this._activatedRoute), null);
      this.isCurrentUserPosts = false;
    }
    this._getPosts();

    this._postsService.postChanged.subscribe(
      () => {
        this.posts = this._postsService.getUserPosts(this._userId);
        this.pageInfo.TotalItems = this.paginate.length;
      }
    );
  }

  /**
   * Delete post event.
   * @param postId number
   * @returns void
   */
  public deleteAction(postId: number): void {
    if (this.isLoggedIn && this.posts[postId].Author.Id === this.user.Id) {
      this._postsService.deletePost(postId);
    }

    this.pageInfo.TotalItems -= 1;
  }

  /**
   * Like post event.
   * @param id number
   * @returns void
   */
  public like(id: number): void {
    this._postsService.like(id);
  }

  /**
   * Dislike post event.
   * @param id number
   * @returns void
   */
  public dislike(id: number): void {
    this._postsService.dislike(id);
  }

  /**
   * Post pagination.
   * @param page number
   * @returns void
   */
  public paginate(page: number): void {
    this.pageInfo.PageNumber = page;
  }

  /**
   * Search post by Title
   * @param search string
   * @returns void
   */
  public search(search: string): void {
    this.posts = this._postsService.getUserPosts(this._userId, search);
  }

  /**
   * Sort posts by parameter.
   * @returns void
   */
  public sort(): void {
    this.posts = this._postsService.sort(this.sortBy);
  }

  /**
   * Get all posts.
   * @returns void
   */
  private _getPosts(): void {
    this.posts = this._postsService.getUserPosts(this._userId);
    this.pageInfo.TotalItems = this.posts.length;
  }
}
