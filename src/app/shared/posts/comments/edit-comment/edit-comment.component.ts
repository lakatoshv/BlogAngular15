import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CommentForm } from 'src/app/core/forms/posts/CommentForm';

import { Comment } from "../../../../core/models/comment";

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.css']
})
export class EditCommentComponent implements OnInit {
  @Output() onEdit = new EventEmitter<any>();
  @Input() comment: any;

  private _commentForm: FormGroup = new CommentForm().commentForm;

  constructor() { 
  }

  ngOnInit() {
    this.setFormValue();
  }

  public setFormValue(){
    this._commentForm.get('author').setValue(this.comment.author);
    this._commentForm.get('email').setValue(this.comment.email);
    this._commentForm.get('content').setValue(this.comment.content);
  }

  private _edit(comment){
    comment.id = this.comment.id;
    this.onEdit.emit(comment);
  }

}