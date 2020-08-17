import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PostsCommentsRoutingModule } from './postscomments-routing.module';
import { CommentComponent } from './components/comment/comment.component';
import { PostComponent } from './components/post/post.component';
import { PostsComponent } from './components/posts/posts.component';

@NgModule({
  declarations: [
    PostComponent,
    PostsComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    PostsCommentsRoutingModule
  ]
})
export class PostsCommentsModule { }
