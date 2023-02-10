import { GeneralServiceService } from './../../../core/services/general-service.service';
import { PostsService } from './../../../core/services/posts-services/posts.service';
import { PageInfo } from './../../../core/models/PageInfo';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/core/services/global-service/global-service.service';
import { SearchForm } from 'src/app/core/forms/SearchForm';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/core/models/User';
import { UsersService } from 'src/app/core/services/users/users-service.service';
import { Post } from 'src/app/core/models/Post';
import { Messages } from 'src/app/core/data/Mesages';
import { CustomToastrService } from 'src/app/core/services/custom-toastr.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {
  /**
   * @param posts Post[]
   */
  public posts: Post[] = [];

  /**
   * @param user User
   */
  public user: User | undefined;

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
  private _userId: number | undefined;

  /**
   * @param _searchFilter any
   */
  private _searchFilter: any;

  /**
   * @param _globalService GlobalService
   * @param _router Router
   * @param _activatedRoute ActivatedRoute
   * @param _usersService UsersService
   * @param _postsService PostsService
   * @param _commentsService CommentsService
   * @param _customToastrService CustomToastrService
   */
  constructor(
    private _globalService: GlobalService,
    private _generalService: GeneralServiceService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _usersService: UsersService,
    private _postsService: PostsService,
    private _customToastrService: CustomToastrService
  ) {
  }

  /**
   * @inheritdoc
   */
  ngOnInit() {
    this._searchFilter = this._generalService.getRouteParam('search-filter', this._activatedRoute);

    this._activatedRoute.params.subscribe(
      (params: Params) => {
        this._searchFilter = params['search-filter'];
        this._checkIfUserIsLoggedIn();

        if (this._router.url.includes('/my-posts')) {
          this._userId = this.user?.Id;
          this.isCurrentUserPosts = true;
        } else {
          this._userId = parseInt(params['user-id'], undefined);
          this.isCurrentUserPosts = false;
        }
        this._getPosts();
      }
    );

    this._checkIfUserIsLoggedIn();

    if (this._router.url.includes('/my-posts')) {
      this._userId = this.user?.Id;
      this.isCurrentUserPosts = true;
    } else {
      const userIdStr = this._globalService.getRouteParam('user-id', this._activatedRoute);
      if(userIdStr){
        this._userId = parseInt(userIdStr, undefined);
        this.isCurrentUserPosts = false;
      }
    }
    this._getPosts();

    this._postsService.postChanged.subscribe(
      () => {
        if(this._userId) {
          this.posts = this._postsService.getUserPosts(this._userId, null, [this._searchFilter]);
          this.pageInfo.TotalItems = this.paginate.length;
        }
      }
    );
  }

  /**
   * Delete post event.
   * 
   * @param postId number
   */
  public deleteAction(postId: number): void {
    if (this.isLoggedIn && this.posts[postId].Author?.Id === this.user?.Id) {
      this._postsService.deletePost(postId);
      this._customToastrService.displaySuccessMessage(Messages.AUTHORIZED_SUCCESSFULLY);
    }

    this.pageInfo.TotalItems -= 1;
  }

  /**
   * Like post event.
   * 
   * @param id number
   */
  public like(id: number): void {
    this._postsService.like(id);
  }

  /**
   * Dislike post event.
   * 
   * @param id number
   */
  public dislike(id: number): void {
    this._postsService.dislike(id);
  }

  /**
   * Post pagination.
   * 
   * @param page number
   */
  public paginate(page: number): void {
    this.pageInfo.PageNumber = page;
  }

  /**
   * Search post by Title.
   * 
   * @param search string
   */
  public search(search: string): void {
    if(this._userId) {
      this.posts = this._postsService.getUserPosts(this._userId, search, [this._searchFilter]);
    }
  }

  /**
   * Sort posts by parameter.
   */
  public sort(): void {
    this.posts = this._postsService.sort(this.sortBy);
  }

  /**
   * Get all posts.
   */
  private _getPosts(): void {
    if(this._userId) {
      this.posts = this._postsService.getUserPosts(this._userId, null, [this._searchFilter]);
    }
    this.pageInfo.TotalItems = this.posts.length;
  }

  /**
   * Check if user is logged in.
   */
  private _checkIfUserIsLoggedIn(): void {
    this.isLoggedIn = this._usersService.isLoggedIn();
    if (this._usersService.isLoggedIn()) {
      this._globalService.resetUserData();
      this.user = this._globalService._currentUser;
    } else {
      this._router.navigateByUrl('/authorization');
    }
  }
}
