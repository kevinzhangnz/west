import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

import { Configuration } from '@config/index';
import { Comment } from '@models/index';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  readonly apiURL: string;
  readonly timeout: number;

  constructor(private config: Configuration,
              private http: HttpClient) {
    this.apiURL = this.config.HOST + this.config.COMMENTS_PATH;
    this.timeout = this.config.TIMEOUT;
  }

  /** Search comments with params
   * @param params: query params
   */
  search(params: HttpParams): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.apiURL, {params}).pipe(
      timeout(this.timeout)
    );
  }
}
