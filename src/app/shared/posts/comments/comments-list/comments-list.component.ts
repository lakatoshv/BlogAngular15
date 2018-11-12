import { Component, OnInit, Input } from '@angular/core';

import { Comments } from "../../../../core/data/comments";

import { ActivatedRoute } from '@angular/router';
import { GeneralServiceService } from 'src/app/core';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {
  @Input("post-id") postId: number;
  public comments: any;

  
  constructor(
    private _generalService: GeneralServiceService,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this._getCommentsForCurrentPost();
  }

  public findByValue(){
    //const index = Data.findIndex(item => item.name === 'John');
  }

  private _getCommentsForCurrentPost(): void{
    this.comments = Comments.filter(item => item.post_id === this.postId);
  }

}
