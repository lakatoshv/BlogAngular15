import { Component, OnInit } from '@angular/core';
import { Posts } from '../../../core/data/PostsList';
import { GeneralServiceService } from 'src/app/core';
import { ActivatedRoute } from '@angular/router';
import { Users } from 'src/app/core/data/UsersList';
import { Post } from 'src/app/core/models/Post';
import { User } from 'src/app/core/models/User';
import { GlobalService } from 'src/app/core/services/global-service/global-service.service';
import { UsersService } from 'src/app/core/services/users/users-service.service';
import { Comments } from 'src/app/core/data/CommentsList';
import { FormGroup } from '@angular/forms';
import { SearchForm } from 'src/app/core/forms/SearchForm';
import {debounceTime} from 'rxjs/operators';
import { sortBy } from 'lodash';
import { PageInfo } from 'src/app/core/models/PageInfo';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
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
   * @param _postId number
   */
  private _postId: number;

  /**
   * @param users User[]
   */
  private users: User[] = [];

  /**
   * @param loggedIn boolean
   */
  public loggedIn = false;

  /**
   * @param _globalService GlobalService
   * @param _generalService GeneralServiceService
   * @param _activatedRoute ActivatedRoute
   * @param _usersService UsersService
   */
  constructor(
    private _globalService: GlobalService,
    private _generalService: GeneralServiceService,
    private _activatedRoute: ActivatedRoute,
    private _usersService: UsersService
  ) {
  }

  /**
   * @inheritdoc
   */
  ngOnInit() {
    this._postId = parseInt(this._generalService.getRoutePeram('post', this._activatedRoute), null);
    this._getPosts();
    this.loggedIn = this._usersService.isLoggedIn();
    if (this.loggedIn) {
      this._globalService.resetUserData();
      this.user = this._globalService._currentUser;
    }
  }

  /**
   * Delete event
   * @param postId number
   * @returns void
   */
  public deleteAction(postId: number): void {
    if (this.loggedIn && this.posts[postId].Author.Id === this.user.Id) {
      const index = this.posts.findIndex(x => x.Id === postId);
      if (index > -1) {
        this.posts.splice(index, 1);
        const comments = Comments.filter(comment => comment.PostId === postId).forEach(comment => {
          Comments.splice(comment.Id, 1);
        });
      }
      this._getPosts();
    }

    this.pageInfo.TotalItems -= 1;
  }

   /**
   * Like post event.
   * @param id number
   * @returns void
   */
  public like(id: number): void {
    this.posts[id].Likes += 1;
  }

  /**
   * Dislike post event.
   * @param id number
   * @returns void
   */
  public dislike(id: number): void {
    this.posts[id].Dislikes += 1;
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
    this.posts = Posts.filter(post => post.Title.includes(search));
  }

  /**
   * Sort posts by parameter.
   * @returns void
   */
  public sort(): void {
    this.posts = sortBy(Object.values(Posts), [this.sortBy]);
  }

  /**
   * Get all posts.
   * @returns void
   */
  private _getPosts(): void {
    this.users = Users;
    const posts = Posts;
    posts.forEach(post => {
      post.Author = this.users[post.AuthorId];
      post.CommentsCount = Posts.findIndex(item => item.Id === post.Id);
      this.posts.push(post);
    });
    this.pageInfo.TotalItems = posts.length;
  }
}
