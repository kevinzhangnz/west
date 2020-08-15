import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

import { Configuration } from '@config/index';
import { Comment, Post } from '@models/index';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  readonly apiURL: string;
  readonly timeout: number;

  constructor(private config: Configuration,
              private http: HttpClient) {
    this.apiURL = this.config.HOST + this.config.POSTS_PATH;
    this.timeout = this.config.TIMEOUT;        
  }

  /** GET posts */
  read(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiURL).pipe(
      timeout(this.timeout)
    );
  }

  /** GET post by id
   *  @param id: id of the post
   */
  readById(id: number): Observable<Post> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Post>(url).pipe(
      timeout(this.timeout)
    );
  }

  /** GET comments by id
   *  @param id: id of the post
   */
  readCommentsById(id: number): Observable<Comment[]> {
    const url = `${this.apiURL}/${id}${this.config.COMMENTS_PATH}`;
    return this.http.get<Comment[]>(url).pipe(
      timeout(this.timeout)
    );
  }

  /** Search posts with params
   *  @param params: query params
   */
  search(params: HttpParams): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiURL, {params}).pipe(
      timeout(this.timeout)
    );
  }
}
