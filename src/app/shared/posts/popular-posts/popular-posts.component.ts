import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/core/models/Post';
import { GlobalService } from 'src/app/core/services/global-service/global-service.service';
import { GeneralServiceService } from 'src/app/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/core/services/users/users-service.service';
import { PostsService } from 'src/app/core/services/posts-services/posts.service';

@Component({
  selector: 'app-popular-posts',
  templateUrl: './popular-posts.component.html',
  styleUrls: ['./popular-posts.component.css']
})
export class PopularPostsComponent implements OnInit {
  /**
   * @param posts Post[]
   */
  public posts: Post[] = [];
  
  /**
   * @param sortBy string
   */
  public sortBy = 'CreatedAt';

  /**
   * @param orderBy string
   */
  public orderBy = 'asc';
  constructor(
    private _globalService: GlobalService,
    private _generalService: GeneralServiceService,
    private _activatedRoute: ActivatedRoute,
    private _usersService: UsersService,
    private _postsService: PostsService
  ) { }

  /**
   * @inheritdoc
   */
  ngOnInit() {
    this.sort();

    this._postsService.postChanged.subscribe(
      () => {
        this.posts = this._postsService.getPosts();
      }
    );
  }

  /**
   * Sort posts by parameter.
   * @returns void
   */
  public sort(): void {
    this.posts = this._postsService.sort(this.sortBy).slice(0, 5);
    debugger
  }

}
