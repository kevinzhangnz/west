import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Comment, Post } from '@models/index';
import { PostsService } from '@services/index';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  comments: Comment[];
  id: number;
  post: Post;

  constructor(private route: ActivatedRoute,
              private postsService: PostsService) {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getComments(this.id);
    this.getPost(this.id);
  }

  /** GET comments by id
   *  @param id: id of the post
   */
  getComments(id: number): void {
    this.postsService.readCommentsById(id)
      .subscribe(data => this.comments = data);
  }

  /** GET post by id
   *  @param id: id of the post
   */
  getPost(id: number): void {
    this.postsService.readById(id)
      .subscribe(data => this.post = data);
  }

}
