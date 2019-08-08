import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from 'src/app/core';
import { ActivatedRoute, Router, Route } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { Users } from 'src/app/core/data/users';
import { Posts } from 'src/app/core/data/posts';
import { post } from 'selenium-webdriver/http';
import { Comments } from 'src/app/core/data/comments';
import { Post } from 'src/app/core/models/post';
import { GlobalService } from 'src/app/core/services/global-service/global-service.service';
import { UsersService } from 'src/app/core/services/users/users-service.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  public user: User = null;
  public posts: Post[] = [];
  public topTab: string = "main-info";
  public postsTab: string = "my";
  public isForCurrentUser: boolean = false;
  public isLoggedIn: boolean = false;

  private _userId?: number;

  constructor(
    private _generalService: GeneralServiceService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _globalService: GlobalService,
    private _usersService: UsersService
  ) { }

  public ngOnInit() {
    this.isForCurrentUser = this._router.url.includes('/my-profile');
    
    if(!this.isForCurrentUser){
      this._userId = parseInt(this._generalService.getRoutePeram("profile-id", this._activatedRoute))
      if(this._userId !== null){
        this.user = Users.find(user => user.Id === this._userId);
        this._getPosts();
      }
      else{
        this._router.navigateByUrl("/");
      }
    }
    else{
      this.isLoggedIn = this._usersService.isLoggedIn()
      if(this._usersService.isLoggedIn()){
        this._globalService.resetUserData(); 
        this.user = this._globalService._currentUser;
      }
      else {
        this._router.navigateByUrl("/authorization");
      }
    }
  }
  private _getPosts(){
    Posts.filter(post => post.authorId = this.user.Id).forEach(post => {
      post.commentsCount = Comments.filter(comment => comment.authorId = this.user.Id).length;
      this.posts.push(post);
    });
  }

  public selectTab(selectedTab: string, level: string){
    switch(level){
      case "top": 
        this.topTab = selectedTab;
        break;
      case "posts":
        this.postsTab = selectedTab;
        break;
    }
  }

}
