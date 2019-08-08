import { Component, OnInit } from '@angular/core';
import { GeneralServiceService } from 'src/app/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { Users } from 'src/app/core/data/users';
import { Posts } from 'src/app/core/data/posts';
import { post } from 'selenium-webdriver/http';
import { Comments } from 'src/app/core/data/comments';
import { Post } from 'src/app/core/models/post';

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

  private _userId?: number;

  constructor(
    private _generalService: GeneralServiceService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) { }

  public ngOnInit() {
    this._userId = parseInt(this._generalService.getRoutePeram("profile-id", this._activatedRoute))
    if(this._userId !== null){
      this.user = Users.find(user => user.Id === this._userId);
      this._getPosts();
    }
    else{
      this._router.navigateByUrl("/");
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
