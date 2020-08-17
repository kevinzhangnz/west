import { Component, OnInit } from '@angular/core';

import { Post } from '@models/index';
import { PostsService } from '@services/index';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Post[];

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  /* Get Posts */
  getPosts(): void {
    this.postsService.read()
      .subscribe(data => {
        this.posts = data;
      });
  }

}