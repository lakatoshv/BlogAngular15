import { Component, OnInit } from '@angular/core';

import { Posts } from "../../../core/data/posts";
import { Comments } from "../../../core/data/comments";

import { ActivatedRoute } from '@angular/router';
import { GeneralServiceService } from 'src/app/core';

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
    var posts = Posts;
    this._postId = parseInt(this._generalService.getRoutePeram("post-id", this._activatedRoute))
    this.post = posts[this._postId];
    this.post.tags = this.post.tags.split(', ');
  }

  public findByValue(){
    //const index = Data.findIndex(item => item.name === 'John');
  }

}
