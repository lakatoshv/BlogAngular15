import { PostsService } from './../../../core/services/posts-services/posts.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { PostForm } from '../../../core/forms/posts/PostForm';
import { UsersService } from 'src/app/core/services/users/users-service.service';
import { GlobalService } from 'src/app/core/services/global-service/global-service.service';
import { User } from 'src/app/core/models/User';
import { Post } from 'src/app/core/models/Post';
import { TinyMCEOptionsObject } from 'src/app/core/models/TinyMCEOptionsObject';
import { TinyMCEOptions } from 'src/app/core/data/TinyMCEOptions';
import { Tag } from 'src/app/core/models/Tag';
import { TagsService } from 'src/app/core/services/posts-services/tags.service';
import { CustomToastrService } from 'src/app/core/services/custom-toastr.service';
import { Messages } from 'src/app/core/data/Mesages';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  /**
   * @param tagInput ElementRef
   */
  @ViewChild('tag') tagInput: ElementRef | undefined;

  /**
   * @param postForm FormGroup
   */
  postForm: FormGroup = new PostForm().postForm;

  /**
   * @param post Post
   */
  post: Post | undefined;

  /**
   * @param isLoggedIn boolean
   */
  isLoggedIn = false;

  /**
   * @param tagLabel string
   */
  tagLabel = 'Додати новий тег';

  /**
   * @param action string
   */
  action = 'add';

  /**
   * @param selectedTag object
   */
  selectedTag: any = {
    value: '',
    id: null
  };

  /**
   * @param user User
   */
  user: User | undefined;

  /**
   * @param _postId number
   */
  private _postId: number | undefined;

  /**
   * @param availableTags Tag[]
   */
  public availableTags: Tag[] = [];

  /**
   * @param _activatedRoute ActivatedRoute
   * @param _router Router
   * @param _usersService UsersService
   * @param _globalService GlobalService
   * @param _postsService PostsService
   * @param _tagsService TagsService
   * @param _customToastrService CustomToastrService
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _usersService: UsersService,
    private _globalService: GlobalService,
    private _postsService: PostsService,
    private _tagsService: TagsService,
    private _customToastrService: CustomToastrService
  ) { }

  /**
   * @param tinyMCEOptions TinyMCEOptionsObject
   */
  public tinyMCEOptions: TinyMCEOptionsObject = TinyMCEOptions;

  /**
   * @inheritdoc
   */
  ngOnInit() {
    const postIdStr = this._globalService.getRouteParam('post-id', this._activatedRoute);
    if(postIdStr !== null) {
      this._postId = parseInt(postIdStr, undefined);
    }

    this._activatedRoute.params.subscribe(
      (params: Params) => {
        this._postId = parseInt(params['post-id'], undefined);
        this._checkIfUserIsLoggedIn();
        this._getPost();
        this._getTags();
      }
    );

    this._checkIfUserIsLoggedIn();
    this._getPost();
    this._getTags();
  }

  /**
   * Add/Edit tag action.
   *
   * @param tag string
   * @param action string
   */
  tagAction(tag: string, action: string): void {
    if (action === 'add') { this.onAddTagAction(tag); }
    if (action === 'edit') { this.onEditTagAction(tag); }
  }

  /**
   * Edit post event.
   *
   * @param post Post
   * @returns void
   */
  edit(post: Post): void {
    if (this.postForm.valid && this.post) {
      this.post.Title = post['Title'];
      this.post.Description = post['Description'];
      this.post.Content = post['Content'];
      this.post.ImageUrl = post['ImageUrl'];
      this.post.CreatedAt = new Date();

      if(this.user) {
        this.post.AuthorId = this.user.Id;
      }
      
      if(this._postId) {
        this._postsService.editPost(this._postId, this.post);
      }
      this._customToastrService.displaySuccessMessage(Messages.POST_EDITED_SUCCESSFULLY);
      this._router.navigateByUrl('/');
    }
  }


  /**
   * Add tag event.
   */
  addTagLabel(): void {
    this.clearFormData();
  }
  /**
   * Edit tag event.
   * 
   * @param tag string
   */
  editTag(tag: Tag): void {
    this.selectedTag['value'] = tag.Title;
    this.selectedTag['id'] = this.post?.TagsList?.findIndex(x => x.Title === tag.Title);
    this.action = 'edit';
    this.tagLabel = 'Редагувати тег';
  }

  /**
   * Add tag event.
   * 
   * @param tag string
   */
  onAddTagAction(tag: string): void {
    if (tag !== '' && this.post?.TagsList?.findIndex(x => x.Title === tag) === -1) {
      const index = this.availableTags.findIndex(x => x.Title === tag);
      if (index > -1) {
        this.post.TagsList.unshift(this.availableTags[index]);
        this._removeFromAvailableTags(this.availableTags[index]);
      } else {
        if(tag !== null) {
          this._tagsService.addTag({Id: 0, Title: tag});
          const result = this._tagsService.getTagByTitle(tag);
          if(result) {
            this.post.TagsList.unshift();
          }
        }
      }
      this.clearFormData();
    }
  }

  /**
   * Edit tag event.
   * 
   * @param tag any
   */
  onEditTagAction(tag: string): void {
    const index = this.selectedTag['id'];
    if (index > -1 && this.post?.TagsList) {
      this.post.TagsList[index].Title = tag;
      this.clearFormData();
    }
  }

  /**
   * Delete tag event.
   * 
   * @param tag any
   */
  onDeleteTagAction(tag: any): void {
    const index = this.post?.TagsList?.indexOf(tag);
    if (index && index > -1) {
      this.post?.TagsList?.splice(index, 1);
    }
  }

  /**
   * Get post.
   */
  private _getPost(): void {
    if(this._postId){
      this.post = this._postsService.getPost(this._postId);
    }
    
    if (this.post?.AuthorId !== this.user?.Id) {
      this._router.navigateByUrl('/');
    }
    this._setFormData();
  }

  /**
   * Set edit form data.
   */
  private _setFormData(): void {
    this.postForm.get('title')?.setValue(this.post?.Title);
    this.postForm.get('description')?.setValue(this.post?.Description);
    this.postForm.get('content')?.setValue(this.post?.Content);
    this.postForm.get('imageUrl')?.setValue(this.post?.ImageUrl);
  }

  /**
   * Get available tas.
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
    if(this.tagInput) {
      this.tagInput.nativeElement.value = '';
    }
  }

  /**
   * Check if user is logged in.
   */
  private _checkIfUserIsLoggedIn(): void {
    this.isLoggedIn = this._usersService.isLoggedIn();
    if (this._usersService.isLoggedIn()) {
      this._globalService.resetUserData();
      this.user = this._globalService._currentUser;
    } else {
      this._router.navigateByUrl('/authorization');
    }
  }
}
