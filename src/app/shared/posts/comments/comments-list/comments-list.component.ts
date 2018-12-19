import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { GeneralServiceService } from 'src/app/core';
import { AddCommentComponent } from "../add-comment/add-comment.component";

import { Comments } from 'src/app/core/data/comments';
import { Comment } from 'src/app/core/models/comment';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {
  @Input("post-id") postId: number;
  
  public comments: any;
  private _comments: boolean = false;

  
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
    if(this.comments.length > 1){
      this._comments = true;
    }
  }

  private _onAddAction(comment: any){
    this.comments.unshift(comment);
  }

}
