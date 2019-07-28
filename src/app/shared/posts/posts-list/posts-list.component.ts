import { Component, OnInit } from '@angular/core';
import { Posts } from "../../../core/data/posts";
import { GeneralServiceService } from 'src/app/core';
import { ActivatedRoute } from '@angular/router';
import { Users } from 'src/app/core/data/users';
import { Post } from 'src/app/core/models/post';
import { User } from 'src/app/core/models/user';
import { GlobalService } from 'src/app/core/services/global-service/global-service.service';
import { UsersService } from 'src/app/core/services/users/users-service.service';
import { Comments } from 'src/app/core/data/comments';
import { FormGroup } from '@angular/forms';
import { SearchForm } from 'src/app/core/forms/SearchForm';
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  public posts: Post[] = [];
  
  public searchForm: FormGroup = new SearchForm().searchForm;

  private _post: any;
  private users: User[] = [];
  public user: User;
  public pageInfo: any = {
    pageSize: 10,
    pageNumber: 0,
    totalItems: 0
  }

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
      if (index > -1){
        this.posts.splice(index, 1);
        var comments = Comments.filter(comment => comment.post_id === postId).forEach(comment => {
          Comments.splice(comment.id, 1)
        })
      }
      this._getPosts();
    }
    
    this.pageInfo.totalItems -= 1;
  }

  public like(id: number): void{
    this.posts[id].likes += 1;
  }

  public dislike(id: number): void{
    this.posts[id].dislikes += 1;
  }

  public paginate(page: number){
    this.pageInfo.pageNumber = page;
  }

  public search(search: string){
    this.posts = Posts.filter(post => post.title.includes(search));
  }

  private _getPosts(){
    this.users = Users;
    let posts = Posts;
    posts.forEach(post => {
      post.author = this.users[post.authorId];
      post.commentsCount = Posts.findIndex(item => item.id === post.id);
      this.posts.push(post)
    })
    this.pageInfo.totalItems = posts.length;
  }

}
