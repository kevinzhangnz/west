import { HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Configuration } from '@config/index';
import { Comment, Post } from '@models/index';
import { PostsService } from './posts.service';

describe('Service: Posts', () => {
  let service: PostsService;
  let httpTestingController: HttpTestingController;
  const configuration = new Configuration();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ Configuration ]
    });

    service = TestBed.inject(PostsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should read', () => {
    const mock: Post[] = [new Post()];

    service.read()
      .subscribe((data: Post[]) =>
        expect(data).toEqual(mock)
      );

    const req = httpTestingController.expectOne(service.apiURL);
    expect(req.request.method).toEqual('GET');
    req.flush(mock);
  });

  it('should readById', () => {
    const id = 1;
    const mock: Post = new Post();

    service.readById(id)
      .subscribe((data: Post) =>
        expect(data).toEqual(mock)
      );

    const req = httpTestingController.expectOne(service.apiURL + '/' + id);
    expect(req.request.method).toEqual('GET');
    req.flush(mock);
  });

  it('should readCommentsById', () => {
    const id = 1;
    const mock: Comment[] = [new Comment()];

    service.readCommentsById(id)
      .subscribe((data: Comment[]) =>
        expect(data).toEqual(mock)
      );

    const req = httpTestingController.expectOne(service.apiURL + '/' + id + configuration.COMMENTS_PATH);
    expect(req.request.method).toEqual('GET');
    req.flush(mock);
  });

  it('should search', () => {
    const mock: Post[] = [new Post()];
    const params = new HttpParams().set('userId', '1');

    service.search(params)
      .subscribe((data: Post[]) =>
        expect(data).toEqual(mock)
      );

    const req = httpTestingController.expectOne(service.apiURL + '?userId=' + params.get('userId'));
    expect(req.request.method).toEqual('GET');
    req.flush(mock);
  });
});
