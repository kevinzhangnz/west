import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Comment, Post } from '@models/index';
import { PostsService } from '@services/index';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnDestroy, OnInit {
  @Input() post: Post;
  comments: Comment[];
  isCollapsed = true;
  subscription: Subscription;

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.getComments(this.post.id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /** GET comments by id
   *  @param id: id of the post
   */
  getComments(id: number): void {
    this.subscription = this.postsService.readCommentsById(id)
      .subscribe(data => this.comments = data);
  }

}
