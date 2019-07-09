import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { PostForm } from '../../../core/forms/posts/PostForm';
import { UsersService } from 'src/app/core/services/users/users-service.service';
import { GlobalService } from 'src/app/core/services/global-service/global-service.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  private _postForm: FormGroup = new PostForm().postForm;
  public post: any;
  public isLoggedIn: boolean = false;

  private _tagLabel: string = "Додати новий тег";
  private _action: string = "add";
  private _selectedTag = {
    value: "",
    id: null
  }

  private _postId: number;

  private _user: User;
  
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _usersService: UsersService,
    private _globalService: GlobalService
  ) {
  }

  public options: Object = {
    plugins: "media autolink autoresize autoresize charmap code textcolor colorpicker contextmenu directionality emoticons fullscreen help hr image imagetools importcss insertdatetime legacyoutput link lists noneditable pagebreak paste preview print save searchreplace tabfocus table template textcolor textpattern toc visualblocks visualchars wordcount",
    menubar: "insert tools view format edit file table",
    toolbar: "media charmap code forecolor backcolor ltr rtl emoticons fullscreen help image insertdatetime link numlist bullist pagebreak paste preview print save searchreplace table template textcolor toc visualblocks visualchars"
  };

  ngOnInit() {
    //this._postId = parseInt(this._globalService.getRouteParam('post-id', this._activatedRoute));
    this._getPost();

    this.isLoggedIn = this._usersService.isLoggedIn()
    if(this._usersService.isLoggedIn()){
      this._globalService.resetUserData(); 
      this._user = this._globalService._currentUser;
    }
    else {
      this._router.navigateByUrl("/authorization");
    }
  }
  private _getPost(){
  }

  private _setFormData(){
    this._postForm.get('id').setValue(this.post.id);
    this._postForm.get('title').setValue(this.post.title);
    this._postForm.get('description').setValue(this.post.description);
    this._postForm.get('content').setValue(this.post.content);
    this._postForm.get('imgUrl').setValue(this.post.imgUrl);
  }

  private clearFormData(){
    this._tagLabel = "Додати новий тег";
    this._action = "add";
    this._selectedTag.value = "";
    this._selectedTag.id = null;
  }

  private _editTag(tag: string): void {
    this._selectedTag.value = tag;
    this._selectedTag.id = this.post.tags.indexOf(tag);
    this._action = "edit";
    this._tagLabel = "Редагувати тег";
  }

  private _onAddTagAction(tag: any){
    this.post.tags.unshift(tag);
    this.clearFormData();
  }
  private _onEditTagAction(tag){
    let index = this._selectedTag.id;
    if (index > -1){
      this.post.tags[index] = tag;
      this.clearFormData();
    }
  }
  private _onDeleteTagAction(tag){
    let index = this.post.tags.indexOf(tag);
    if (index > -1)
      this.post.tags.splice(index, 1);
  }
  
  private _tagAction(tag: string, action: string): void {
    if(action === "add") this._onAddTagAction(tag);
    if(action === "edit") this._onEditTagAction(tag);
  }

  private _edit(post){
  }
}
