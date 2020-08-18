import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '@models/index';
import { PostsService } from '@services/index';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnDestroy, OnInit {
  posts: Post[];
  subscription: Subscription;

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /* Get Posts */
  getPosts(): void {
    this.subscription = this.postsService.read()
      .subscribe(data => this.posts = data);
  }

}
