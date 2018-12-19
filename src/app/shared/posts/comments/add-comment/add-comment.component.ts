import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CommentForm } from 'src/app/core/forms/posts/CommentForm';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  private _commentForm: FormGroup = new CommentForm().commentForm;
  constructor() { }

  ngOnInit() {
  }

  private _addComment(name: string, email: string, comment: string): void{
    debugger
    
  }

}
