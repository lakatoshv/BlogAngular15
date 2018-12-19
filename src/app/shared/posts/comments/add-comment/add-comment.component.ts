import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CommentForm } from 'src/app/core/forms/posts/CommentForm';

import { Comment } from "../../../../core/models/comment";

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  private _commentForm: FormGroup = new CommentForm().commentForm;

  @Output() onAdd = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit() {
  }

  private _addComment(name: string, email: string, content: string): void{
    debugger
    let comment: Comment = new Comment();
    comment.author = email;
    comment.content = content;
    this.onAdd.emit(comment);
    
  }

}
