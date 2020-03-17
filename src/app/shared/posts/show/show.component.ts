import { Component, OnInit } from '@angular/core';

import { Posts } from "../../../core/data/PostsList";
import { Comments } from "../../../core/data/CommentsList";

import { ActivatedRoute, Router } from '@angular/router';
import { GeneralServiceService } from 'src/app/core';
import { Users } from 'src/app/core/data/UsersList';
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
  public post: Post
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
    this.postId = parseInt(this._generalService.getRoutePeram("post-id", this._activatedRoute))
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
    this.post.Likes += 1;
  }

  public dislike(id: number): void{
    this.post.Dislikes += 1;
  }

  public deleteAction(){
    if (this.loggedIn && this.post.Author.Id === this.user.Id) {
      this._router.navigateByUrl('/blog');
    }
  }

  private _getPost() {
    this.post = Posts[this.postId];
    this.post.Author = Users[this.post.AuthorId];
    this.post.TagsList = this.post.Tags.split(', ');
  }

}
