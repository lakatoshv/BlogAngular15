import { Component, OnInit } from '@angular/core';

import { Posts } from "../../../core/data/posts";
import { Comments } from "../../../core/data/comments";

import { ActivatedRoute } from '@angular/router';
import { GeneralServiceService } from 'src/app/core';
import { Post } from 'src/app/core/models/post';
import { Users } from 'src/app/core/data/users';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  public post: any; 
  private _postId: number;
  
  constructor(
    private _generalService: GeneralServiceService,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this._postId = parseInt(this._generalService.getRoutePeram("post-id", this._activatedRoute))
    this._getPost();
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

  private _getPost(){
    this.post = Posts[this._postId];
    this.post.author = Users[this.post.authorId];
    this.post.tags = this.post.tags.split(', ');
  }

}
