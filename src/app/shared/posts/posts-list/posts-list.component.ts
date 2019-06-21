import { Component, OnInit } from '@angular/core';
import { Posts } from "../../../core/data/posts";
import { GeneralServiceService } from 'src/app/core';
import { ActivatedRoute } from '@angular/router';
import { Users } from 'src/app/core/data/users';
import { Post } from 'src/app/core/models/post';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  public posts: Post[] = [];
  private _post: any;
  private users: User[] = [];
  constructor(
    private _generalService: GeneralServiceService,
    private _activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this._post = parseInt(this._generalService.getRoutePeram("post", this._activatedRoute));
    this._getPosts();
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
