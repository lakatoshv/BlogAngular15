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
  public comments: any;
  private postId: number;
  
  constructor(
    private _generalService: GeneralServiceService,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    var posts = Posts;
    this.postId = parseInt(this._generalService.getRoutePeram("post-id", this._activatedRoute))
    this.post = posts[this.postId];
    this.post.tags = this.post.tags.split(', ');
    this.getCommentsForCurrentPost();
  }

  public findByValue(){
    //const index = Data.findIndex(item => item.name === 'John');
  }

  private getCommentsForCurrentPost(): void{
    this.comments = Comments.find(item => item.post_id === this.postId);
    debugger
  }

}
