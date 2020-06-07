import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from 'src/app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/User';
import { Users } from 'src/app/core/data/UsersList';
import { Posts } from 'src/app/core/data/PostsList';
import { Comments } from 'src/app/core/data/CommentsList';
import { Post } from 'src/app/core/models/Post';
import { GlobalService } from 'src/app/core/services/global-service/global-service.service';
import { UsersService } from 'src/app/core/services/users/users-service.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  /**
   * @param user User
   */
  public user: User = null;

  /**
   * @param posts Post[]
   */
  public posts: Post[] = [];

  /**
   * @param topTab string
   */
  public topTab = 'main-info';

  /**
   * @param postsTab string
   */
  public postsTab = 'my';

  /**
   * @param isForCurrentUser boolean
   */
  public isForCurrentUser = false;

  /**
   * @param isLoggedIn boolean
   */
  public isLoggedIn = false;

  /**
   * @param _userId number
   */
  private _userId?: number;

  /**
   * @param _generalService GeneralServiceService
   * @param _activatedRoute ActivatedRoute
   * @param _router Router
   * @param _globalService GlobalService
   * @param _usersService UsersService
   */
  constructor(
    private _generalService: GeneralServiceService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _globalService: GlobalService,
    private _usersService: UsersService
  ) { }

  /**
   * @inheritdoc
   */
  public ngOnInit() {
    this._userId = parseInt(this._generalService.getRoutePeram('profile-id', this._activatedRoute), null);
    this.isLoggedIn = this._usersService.isLoggedIn();
    if (this._usersService.isLoggedIn()) {
      this._globalService.resetUserData();
      this.user = this._globalService._currentUser;
    }
    this.isForCurrentUser = this._router.url.includes('/my-profile') || (this._userId !== null && this.user.Id === this._userId);

    if (!this.isForCurrentUser) {
      if (this._userId !== null) {
        this.user = Users.find(user => user.Id === this._userId);
        this._getPosts();
      } else{
        this._router.navigateByUrl('/');
      }
    } else if (!this.isLoggedIn) {
      this._router.navigateByUrl('/authorization');
    }
  }

  /**
   * Select tab
   * @param selectedTab string
   * @param level string
   */
  public selectTab(selectedTab: string, level: string): void {
    switch (level) {
      case 'top':
        this.topTab = selectedTab;
        break;
      case 'posts':
        this.postsTab = selectedTab;
        break;
    }
  }

  /**
   * Confirm phone number.
   * @returns void
   */
  public confirmPhoneNumber(): void {
    this._globalService._currentUser.PhoneNumberConfirmed = true;
    this._usersService.saveUser(JSON.stringify(this._globalService._currentUser));
  }

  /**
   * Get all posts
   * @returns void
   */
  private _getPosts(): void {
    Posts.filter(post => post.AuthorId = this.user.Id).forEach(post => {
      post.CommentsCount = Comments.filter(comment => comment.AuthorId = this.user.Id).length;
      this.posts.push(post);
    });
  }
}
