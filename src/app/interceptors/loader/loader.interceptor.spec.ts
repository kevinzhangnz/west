import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LoaderService } from '@services/index';
import { LoaderInterceptor } from './loader.interceptor';

describe('Interceptor: Loader', () => {
  const apiURL = '';
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let interceptor: LoaderInterceptor;
  let loaderService: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        LoaderInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: LoaderInterceptor,
          multi: true
        },
        {
          provide: LoaderService,
          useValue: {
            hide: jasmine.createSpy(),
            show: jasmine.createSpy()
          }
        }
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    interceptor = TestBed.inject(LoaderInterceptor);
    loaderService = TestBed.inject(LoaderService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should loader service show be called', () => {
    httpClient.get(apiURL).subscribe();

    const req = httpTestingController.expectOne(apiURL);
    expect(req.request.method).toEqual('GET');
    expect(loaderService.show).toHaveBeenCalled();
    req.flush({});
  });

});
