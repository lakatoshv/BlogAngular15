import { PostsService } from './../../../core/services/posts-services/posts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GeneralServiceService } from 'src/app/core';
import { UsersService } from 'src/app/core/services/users/users-service.service';
import { GlobalService } from 'src/app/core/services/global-service/global-service.service';
import { User } from 'src/app/core/models/User';
import { Post } from 'src/app/core/models/Post';
import { Messages } from 'src/app/core/data/Mesages';
import { CustomToastrService } from 'src/app/core/services/custom-toastr.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  /**
   * @param post Post | undefined
   */
  public post: Post | undefined;

  /**
   * @param user User | undefined
   */
  public user: User | undefined;

  /**
   * @param loggedIn boolean
   */
  public loggedIn = false;

  /**
   * @param postId number | undefined
   */
  public postId: number | undefined;

  /**
   * @param _generalService GeneralServiceService
   * @param _activatedRoute ActivatedRoute
   * @param _usersService UsersService
   * @param _globalService GlobalService
   * @param _router Router
   * @param _postsService PostsService
   * @param _customToastrService CustomToastrService
   */
  constructor(
    private _generalService: GeneralServiceService,
    private _activatedRoute: ActivatedRoute,
    private _usersService: UsersService,
    private _globalService: GlobalService,
    private _router: Router,
    private _postsService: PostsService,
    private _customToastrService: CustomToastrService
  ) { }

  /**
   * @inheritdoc
   */
  ngOnInit() {
    var postIdStr = this._generalService.getRouteParam('post-id', this._activatedRoute);
    if(postIdStr) {
      this.postId = parseInt(postIdStr, undefined);
    }

    this._activatedRoute.params.subscribe(
      (params: Params) => {
        this.postId = parseInt(params['post-id'], undefined);
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
   * 
   * @param id number
   */
  public like(id: number): void {
    this._postsService.like(id);
  }

  /**
   * Dislike post.
   * 
   * @param id number
   */
  public dislike(id: number): void {
    this._postsService.dislike(id);
  }

  /**
   * Delete post.
   */
  public deleteAction(): void {
    if (this.loggedIn && this.post?.Author?.Id === this.user?.Id) {
      if(this.postId) {
        this._postsService.deletePost(this.postId);
        this._customToastrService.displaySuccessMessage(Messages.AUTHORIZED_SUCCESSFULLY);
      }
      this._router.navigateByUrl('/blog');
    }
  }

  /**
   * Get posts.
   */
  private _getPost(): void {
    if(this.postId){
      this.post = this._postsService.getPost(this.postId);
    }
  }

  /**
   * Check if user is logged in.
   */
  private _checkIfUserIsLoggedIn(): void {
    this.loggedIn = this._usersService.isLoggedIn();
    if (this.loggedIn) {
      this._globalService.resetUserData();
      if(this._globalService._currentUser) {
        this.user = this._globalService._currentUser;
      }
    }
  }
}
