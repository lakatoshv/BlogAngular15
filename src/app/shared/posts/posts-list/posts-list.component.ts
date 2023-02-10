import { PostsService } from './../../../core/services/posts-services/posts.service';
import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from 'src/app/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Post } from 'src/app/core/models/Post';
import { User } from 'src/app/core/models/User';
import { GlobalService } from 'src/app/core/services/global-service/global-service.service';
import { UsersService } from 'src/app/core/services/users/users-service.service';
import { FormGroup } from '@angular/forms';
import { SearchForm } from 'src/app/core/forms/SearchForm';
import { PageInfo } from 'src/app/core/models/PageInfo';
import { CustomToastrService } from 'src/app/core/services/custom-toastr.service';
import { Messages } from 'src/app/core/data/Mesages';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  /**
   * @param posts Post[]
   */
  public posts: Post[] = [];

  /**
   * @param searchForm FormGroup
   */
  public searchForm: FormGroup = new SearchForm().searchForm;

  /**
   * @param sortBy string
   */
  public sortBy = 'title';

  /**
   * @param orderBy string
   */
  public orderBy = 'asc';

  /**
   * @param user User | null | undefined
   */
  public user: User | null | undefined;

  /**
   * @param pageInfo PageInfo
   */
  public pageInfo: PageInfo = {
    PageSize: 10,
    PageNumber: 0,
    TotalItems: 0
  };

  /**
   * @param loggedIn boolean
   */
  public loggedIn = false;

  /**
   * @param users User[]
   */
  private users: User[] = [];

  /**
   * @param _searchFilter string
   */
  private _searchFilter: string | null = null;

  /**
   * @param _globalService GlobalService
   * @param _generalService GeneralServiceService
   * @param _activatedRoute ActivatedRoute
   * @param _usersService UsersService
   * @param _postsService PostsService
   * @param _customToastrService CustomToastrService
   */
  constructor(
    private _globalService: GlobalService,
    private _generalService: GeneralServiceService,
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

        this._getPosts();
      }
    );

    this._getPosts();

    this._postsService.postChanged.subscribe(
      () => {
        this.posts = this._postsService.getPosts(null, this._searchFilter !== null ? [this._searchFilter] : []);
        this.pageInfo.TotalItems = this.paginate.length;
      }
    );
  }

  /**
   * Delete event.
   * 
   * @param postId number
   */
  public deleteAction(postId: number): void {
    if (this.loggedIn && this.posts[postId].Author?.Id === this.user?.Id) {
      const index = this.posts.findIndex(x => x.Id === postId);
      if (index > -1) {
        this._postsService.deletePost(postId);
        this._customToastrService.displaySuccessMessage(Messages.POST_DELETED_SUCCESSFULLY);
      }
    }
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
    this.posts = this._postsService.getPosts(search, this._searchFilter !== null ? [this._searchFilter] : []);
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
    this.posts = this._postsService.getPosts(null, this._searchFilter !== null ? [this._searchFilter] : []);
    this.pageInfo.TotalItems = this.posts.length;
  }

  /**
   * Check if user is logged in.
   */
  private _checkIfUserIsLoggedIn(): void {
    this.loggedIn = this._usersService.isLoggedIn();
    if (this.loggedIn) {
      this._globalService.resetUserData();
      this.user = this._globalService._currentUser;
    }
  }
}
