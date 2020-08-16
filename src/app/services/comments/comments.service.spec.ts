import { HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Configuration } from '@config/index';
import { Comment } from '@models/index';
import { CommentsService } from './comments.service';

describe('Service: Comments', () => {
  let service: CommentsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ Configuration ]
    });

    service = TestBed.inject(CommentsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search', () => {
    const mock: Comment[] = [new Comment()];
    const param = 'postId';
    const params = new HttpParams().set(param, '1');

    service.search(params)
      .subscribe((data: Comment[]) =>
        expect(data).toEqual(mock)
      );

    const req = httpTestingController.expectOne(service.apiURL + '?' + param + '=' + params.get(param));
    expect(req.request.method).toEqual('GET');
    req.flush(mock);
  });
});
