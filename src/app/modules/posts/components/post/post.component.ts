import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Comment, Post } from '@models/index';
import { PostsService } from '@services/index';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnDestroy, OnInit {
  comments: Comment[];
  id: number;
  post: Post;
  commentSubscription: Subscription;
  postSubscription: Subscription;

  constructor(private route: ActivatedRoute,
              private postsService: PostsService) {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getComments(this.id);
    this.getPost(this.id);
  }

  ngOnDestroy(): void {
    this.commentSubscription.unsubscribe();
    this.postSubscription.unsubscribe();
  }

  /** GET comments by id
   *  @param id: id of the post
   */
  getComments(id: number): void {
    this.commentSubscription = this.postsService.readCommentsById(id)
      .subscribe(data => this.comments = data);
  }

  /** GET post by id
   *  @param id: id of the post
   */
  getPost(id: number): void {
    this.postSubscription = this.postsService.readById(id)
      .subscribe(data => this.post = data);
  }

}
