import { TagsService } from './../../../core/services/posts-services/tags.service';
import { PostsService } from './../../../core/services/posts-services/posts.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PostForm } from '../../../core/forms/posts/PostForm';
import { Post } from '../../../core/models/Post';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/core/services/users/users-service.service';
import { GlobalService } from 'src/app/core/services/global-service/global-service.service';
import { User } from 'src/app/core/models/User';
import { TinyMCEOptionsObject } from 'src/app/core/models/TinyMCEOptionsObject';
import { TinyMCEOptions } from 'src/app/core/data/TinyMCEOptions';
import { Tag } from 'src/app/core/models/Tag';
import { Messages } from 'src/app/core/data/Mesages';
import { CustomToastrService } from 'src/app/core/services/custom-toastr.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  /**
   * @param tagInput ElementRef
   */
  @ViewChild('tag') tagInput: ElementRef | undefined;

  /**
   * @param postForm FormGroup
   */
  public postForm: FormGroup = new PostForm().postForm;

  /**
   * @param tagsList string[]
   */
  public tagsList: Tag[] = [];

  /**
   * @param availableTags Tag[]
   */
  public availableTags: Tag[] = [];

  /**
   * @param isLoggedIn boolean
   */
  public isLoggedIn = false;

  /**
   * @param tagLabel string
   */
  public tagLabel = 'Додати новий тег';

  /**
   * @param action string
   */
  public action = 'add';

  /**
   * @param selectedTag object
   */
  public selectedTag: any = {
    value: '',
    id: null
  };

  /**
   * @param user User
   */
  public user: User | undefined;

  /**
   * @param tinyMCEOptions TinyMCEOptionsObject
   */
  public tinyMCEOptions: TinyMCEOptionsObject = TinyMCEOptions;

  /**
   * @param _router Router
   * @param _usersService UsersService
   * @param _globalService GlobalService
   * @param _postsService PostsService,
   * @param _tagsService TagsService
   * @param _customToastrService CustomToastrService
   */
  public constructor(
    private _router: Router,
    private _usersService: UsersService,
    private _globalService: GlobalService,
    private _postsService: PostsService,
    private _tagsService: TagsService,
    private _customToastrService: CustomToastrService
  ) { }

  /**
   * @inheritdoc
   */
  public ngOnInit() {
    this.isLoggedIn = this._usersService.isLoggedIn();
    if (this._usersService.isLoggedIn()) {
      this._globalService.resetUserData();
      this.user = this._globalService._currentUser;
    } else {
      this._router.navigateByUrl('/authorization');
    }
    this._getTags();
  }

  /**
   * Add/Edit tag action.
   *
   * @param tag string
   * @param action string
   */
  public tagAction(tag: string, action: string): void {
    if (action === 'add') { this.onAddTagAction(tag); }
    if (action === 'edit') { this.onEditTagAction(tag); }
  }

  /**
   * Add tag event.
   */
  public addTagLabel(): void {
    this.clearFormData();
  }
  /**
   * Edit tag event.
   * 
   * @param tag string
   */
  public editTag(tag: Tag): void {
    this.selectedTag['value'] = tag.Title;
    this.selectedTag['id'] = this.tagsList.indexOf(tag);
    this.action = 'edit';
    this.tagLabel = 'Редагувати тег';
  }

  /**
   * Add tag event.
   * 
   * @param tag string
   */
  public onAddTagAction(tag: string): void {
    if (tag !== '' && this.tagsList.findIndex(x => x.Title === tag) === -1) {
      const index = this.availableTags.findIndex(x => x.Title === tag);
      if (index > -1) {
        this.tagsList.unshift(this.availableTags[index]);
        this._removeFromAvailableTags(this.availableTags[index]);
      } else {
        this._tagsService.addTag({Id: 0, Title: tag});

        const result = this._tagsService.getTagByTitle(tag);
        if(result !== null) {
          this.tagsList.unshift(result);
        }
      }
      this.clearFormData();
    }
  }

  /**
   * Edit tag event.
   * 
   * @param tag string
   */
  public onEditTagAction(tag: string): void {
    debugger
    const index = this.selectedTag['id'];
    if (index > -1) {
      this.tagsList[index].Title = tag;
      this.clearFormData();
    }
  }

  /**
   * Delete tag event.
   * 
   * @param tag any
   */
  public onDeleteTagAction(tag: any): void {
    const index = this.tagsList.indexOf(tag);
    if (index > -1) {
      this.tagsList.splice(index, 1);
    }
  }

  /**
   * Add new post.
   * 
   * @param post Post
   */
  public add(post: Post): void {
    if (this.postForm.valid) {
      post.TagsList = this.tagsList;

      if(this.user !== undefined){
        post.AuthorId = this.user.Id;
      }
      
      this._postsService.addPost(post);
      this._customToastrService.displaySuccessMessage(Messages.POST_CREATED_SUCCESSFULLY);
      this._router.navigate(['/blog']);
    }
  }

  /**
   * Get available tags.
   */
  private _getTags(): void {
    this.availableTags = this._tagsService.getTags();
  }

  /**
   * Remove selected tag from available tags.
   * 
   * @param tag Tag
   */
  private _removeFromAvailableTags(tag: Tag): void {
    const index = this.availableTags.indexOf(tag);
    if (index > -1) {
      this.availableTags.splice(index, 1);
    }
  }

  /**
   * Clear form data.
   */
  private clearFormData(): void {
    this.tagLabel = 'Додати новий тег';
    this.action = 'add';
    this.selectedTag['value'] = '';
    this.selectedTag['id'] = null;
    if(this.tagInput !== undefined) {
      this.tagInput.nativeElement.value = '';
    }
  }
}
