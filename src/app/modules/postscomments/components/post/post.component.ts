import { Component, Input, OnInit } from '@angular/core';

import { Comment, Post } from '@models/index';
import { PostsService } from '@services/index';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post: Post;
  comments: Comment[];
  isCollapsed = true;

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.getComments(this.post.id);
  }

  /** GET comments by id
   *  @param id: id of the post
   */
  getComments(id: number): void {
    this.postsService.readCommentsById(id)
      .subscribe(data => this.comments = data);
  }

}
