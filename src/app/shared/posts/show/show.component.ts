import { Component, OnInit } from '@angular/core';

import { Posts } from "../../../core/data/posts";

import { GeneralServiceService } from "@app/core";

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  public post: any; 
  private postId: number;
  
  constructor(private _generalService: GeneralServiceService) { }

  ngOnInit() {
    var posts = Posts;
    this.post = posts[3];
  }
  public findByValue(){
    //const index = Data.findIndex(item => item.name === 'John');
  }

}
