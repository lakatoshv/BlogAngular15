import { Component, OnInit } from '@angular/core';
import { Posts } from "../../../core/data/posts";
import { GeneralServiceService } from 'src/app/core';
import { ActivatedRoute } from '@angular/router';
import { Users } from 'src/app/core/data/users';
import { Post } from 'src/app/core/models/post';
import { User } from 'src/app/core/models/user';
import { GlobalService } from 'src/app/core/services/global-service/global-service.service';
import { UsersService } from 'src/app/core/services/users/users-service.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  public posts: Post[] = [];
  private _post: any;
  private users: User[] = [];
  public user: User;

  public loggedIn: boolean = false;

  constructor(
    private _globalService: GlobalService,
    private _generalService: GeneralServiceService,
    private _activatedRoute: ActivatedRoute,
    private _usersService: UsersService
  ) {
  }

  ngOnInit() {
    this._post = parseInt(this._generalService.getRoutePeram("post", this._activatedRoute));
    this._getPosts();
    this.loggedIn = this._usersService.isLoggedIn();
    if(this.loggedIn){
      this._globalService.resetUserData();  
      this.user = this._globalService._currentUser;
    }
  }

  public deleteAction(postId: number){
    if(this.loggedIn && this.posts[postId].author.Id === this.user.Id){
      let index = this.posts.findIndex(x => x.id === postId);
      if (index > -1)
        this.posts.splice(index, 1);
      this.posts = this.posts;
    }
  }

  private _getPosts(){
    
    this.users = Users;
    let posts = Posts;
    posts.forEach(post => {
      post.author = this.users[post.authorId];
      this.posts.push(post)
    })
    this.posts;
  }

}
