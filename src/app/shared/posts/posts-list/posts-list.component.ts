import { Component, OnInit } from '@angular/core';
import { Posts } from "../../../core/data/posts";
import { GeneralServiceService } from 'src/app/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  public posts: any;
  private _post: any;
  constructor(
    private _generalService: GeneralServiceService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.posts = Posts;
  }

  ngOnInit() {
    this._post = parseInt(this._generalService.getRoutePeram("post", this._activatedRoute))
  }

}
