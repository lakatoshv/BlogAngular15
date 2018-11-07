import { Component, OnInit } from '@angular/core';

import { Posts } from "../../../data/posts";

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  public post: any; 
  private postId: number;
  
  constructor() { }

  ngOnInit() {
    var posts = Posts;
    this.post = posts[3];
  }
  public findByValue(){
    //const index = Data.findIndex(item => item.name === 'John');
  }

}
