import { Component, OnInit } from '@angular/core';
import { Posts } from "../../../data/posts";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  public posts: any;
  constructor() {
    this.posts = Posts;
  }

  ngOnInit() {
  }

}
