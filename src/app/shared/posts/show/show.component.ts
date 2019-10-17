import { Component, OnInit } from '@angular/core';

import { Posts } from "../../../core/data/posts";
import { Comments } from "../../../core/data/comments";

import { ActivatedRoute, Router } from '@angular/router';
import { GeneralServiceService } from 'src/app/core';
import { Users } from 'src/app/core/data/users';
import { UsersService } from 'src/app/core/services/users/users-service.service';
import { GlobalService } from 'src/app/core/services/global-service/global-service.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  public post: any; 
  public user: User;

  public loggedIn: boolean = false;

  public postId: number;
  
  constructor(
    private _generalService: GeneralServiceService,
    private _activatedRoute: ActivatedRoute,
    private _usersService: UsersService,
    private _globalService: GlobalService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._postId = parseInt(this._generalService.getRoutePeram("post-id", this._activatedRoute))
    this._getPost();
    this.loggedIn = this._usersService.isLoggedIn();
    if(this.loggedIn){
      this._globalService.resetUserData();  
      this.user = this._globalService._currentUser;
    }
  }

  public findByValue(){
    //const index = Data.findIndex(item => item.name === 'John');
  }

  public like(id: number): void{
    this.post.likes += 1;
  }

  public dislike(id: number): void{
    this.post.dislikes += 1;
  }

  public deleteAction(){
    if(this.loggedIn && this.post.author.Id === this.user.Id){
      this._router.navigateByUrl("/");
    }
  }

  private _getPost(){
    this.post = Posts[this._postId];
    this.post.author = Users[this.post.authorId];
    this.post.tags = this.post.tags.split(', ');
  }

}
