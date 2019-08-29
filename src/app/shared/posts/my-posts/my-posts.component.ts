import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/core/services/global-service/global-service.service';
import { SearchForm } from 'src/app/core/forms/SearchForm';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { UsersService } from 'src/app/core/services/users/users-service.service';
import { Posts } from 'src/app/core/data/posts';
import { Users } from 'src/app/core/data/users';
import { sortBy } from 'lodash';
import { Comments } from 'src/app/core/data/comments';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {
  public posts: any = [];
  public user: User;
  public pageInfo: any = {
    pageSize: 10,
    pageNumber: 0,
    totalItems: 0
  }
  public isLoggedIn: boolean = false;
  public isLoaded: boolean = false;
  public isCurrentUserPosts: boolean = false;

  public displayType: string = 'list';
  public sortBy: string = 'title';
  public orderBy: string = "asc";
  
  public searchForm: FormGroup = new SearchForm().searchForm;

  private _userId: any;
  constructor(
    private _globalService: GlobalService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _usersService: UsersService
  ) {
  }

  ngOnInit() {
    this.isLoggedIn = this._usersService.isLoggedIn()
    if(this._usersService.isLoggedIn()){
      this._globalService.resetUserData(); 
      this.user = this._globalService._currentUser;
    }
    else {
      this._router.navigateByUrl("/authorization");
    }

    if(this._router.url.includes('/my-posts')){
      this._userId = this.user.Id;
      this.isCurrentUserPosts = true;
    }
    else{
      this._userId = this._globalService.getRouteParam('user-id', this._activatedRoute);
      this.isCurrentUserPosts = false;
    }
    this._getPosts();
    
  }

  public deleteAction(postId: number){
    if(this.isLoggedIn && this.posts[postId].author.Id === this.user.Id){
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

  public sort(){
    this.posts = sortBy(Object.values(Posts), [this.sortBy])
  }

  private _getPosts(){
    let posts = Posts.filter(user => user.id === this._userId).forEach(post => {
      post.author = Users[this._userId];
      post.commentsCount = Posts.findIndex(item => item.id === post.id);
      this.posts.push(post)
    })
    this.pageInfo.totalItems = this.posts.length;
  }

  private _onDeleteCommentAction(post){
    let index = this.posts.findIndex(x => x.id === post.id);
    if (index > -1)
      this.posts.splice(index, 1);
    this.posts = this.posts;
  }
}
