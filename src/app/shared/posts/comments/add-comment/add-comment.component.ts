import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CommentForm } from 'src/app/core/forms/posts/CommentForm';

import { Comment } from "../../../../core/models/comment";
import { GlobalService } from 'src/app/core/services/global-service/global-service.service';
import { UsersService } from 'src/app/core/services/users/users-service.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  @Input() user: User = null;

  @Output() onAdd = new EventEmitter<any>();
  private _commentForm: FormGroup = new CommentForm().commentForm;
  
  constructor(
    private _globalService: GlobalService,
    private _usersService: UsersService
  ) { }

  ngOnInit() {
    if(this.user){
      this._commentForm.get("name").setValue(this.user.FirstName + " " + this.user.LastName);
      this._commentForm.get("email").setValue(this.user.Email);
    }
  }

  private _addComment(name: string, email: string, content: string): void{
    debugger
    let comment: Comment = new Comment();
    comment.content = content;
    if(this.user)
      comment.authorId = this.user.Id;
    else{
      comment.email = email;
      comment.name = name;
    }
    this.onAdd.emit(comment);
  }

}
