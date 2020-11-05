import { PostsService } from './../../../core/services/posts-services/posts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GeneralServiceService } from 'src/app/core';
import { UsersService } from 'src/app/core/services/users/users-service.service';
import { GlobalService } from 'src/app/core/services/global-service/global-service.service';
import { User } from 'src/app/core/models/User';
import { Post } from 'src/app/core/models/Post';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  /**
   * @param post Post
   */
  public post: Post;

  /**
   * @param user User
   */
  public user: User;

  /**
   * @param loggedIn boolean
   */
  public loggedIn = false;

  /**
   * @param postId number
   */
  public postId: number;

  /**
   * @param _generalService GeneralServiceService
   * @param _activatedRoute ActivatedRoute
   * @param _usersService UsersService
   * @param _globalService GlobalService
   * @param _router Router
   * @param _postsService PostsService
   */
  constructor(
    private _generalService: GeneralServiceService,
    private _activatedRoute: ActivatedRoute,
    private _usersService: UsersService,
    private _globalService: GlobalService,
    private _router: Router,
    private _postsService: PostsService
  ) { }

  /**
   * @inheritdoc
   */
  ngOnInit() {
    this.postId = parseInt(this._generalService.getRouteParam('post-id', this._activatedRoute), null);

    this._activatedRoute.params.subscribe(
      (params: Params) => {
        this.postId = parseInt(params['post-id'], null);
        this._checkIfUserIsLoggedIn();

        this._getPost();
      }
    );

    this._getPost();

    this._postsService.postChanged.subscribe(
      () => {
        this._getPost();
      }
    );
  }

  /**
   * Like post.
   * @param id number
   * @returns void
   */
  public like(id: number): void {
    this._postsService.like(id);
  }

  /**
   * Dislike post.
   * @param id number
   * @returns void
   */
  public dislike(id: number): void {
    this._postsService.dislike(id);
  }

  /**
   * Delete post.
   * @returns void
   */
  public deleteAction(): void {
    if (this.loggedIn && this.post.Author.Id === this.user.Id) {
      this._postsService.deletePost(this.postId);
      this._router.navigateByUrl('/blog');
    }
  }

  /**
   * Get posts.
   * @returns void
   */
  private _getPost(): void {
    this.post = this._postsService.getPost(this.postId);
  }

  /**
   * Check if user is logged in.
   * @returns void
   */
  private _checkIfUserIsLoggedIn(): void {
    this.loggedIn = this._usersService.isLoggedIn();
    if (this.loggedIn) {
      this._globalService.resetUserData();
      this.user = this._globalService._currentUser;
    }
  }
}
