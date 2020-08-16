import { HttpErrorResponse, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { throwError } from 'rxjs';

import { Configuration } from '@config/index';
import { ToastService } from '@services/index';
import { ErrorInterceptor } from './error.interceptor';

describe('Interceptor: Error', () => {
  let error: HttpErrorResponse;
  let interceptor: ErrorInterceptor;
  let toastServiceSpy: jasmine.SpyObj<ToastService>;
  const httpRequestSpy = jasmine.createSpyObj('HttpRequest', ['']);
  const httpHandlerSpy = jasmine.createSpyObj('HttpHandler', ['handle']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        Configuration,
        ErrorInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true
        },
      ]
    });

    toastServiceSpy = jasmine.createSpyObj('ToastService', ['show']);
    interceptor = new ErrorInterceptor(toastServiceSpy);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should intercept client side error', () => {
    const errorEvent = new ErrorEvent('error', {
      error: new Error('error'),
      message: 'Bad Request',
      lineno: 402,
      filename: 'error.html'
    });
    error = new HttpErrorResponse({
      error: errorEvent,
      headers: new HttpHeaders(),
      status: 400,
      statusText: '',
      url: '',
    });
    httpHandlerSpy.handle.and.returnValue(throwError(error));

    interceptor.intercept(httpRequestSpy, httpHandlerSpy)
      .subscribe(
        result => {},
        err => {
          expect(err).toEqual(`Error: ${error.error.message}`);
          expect(toastServiceSpy.show).toHaveBeenCalled();
        }
      );
  });

  it('should intercept server side error', () => {
    error = {
      name: 'HttpErrorResponse',
      message: 'error',
      error: 'Internal Server Error',
      ok: false,
      status: 500,
      headers: new HttpHeaders(),
      statusText: '',
      type: 2,
      url: ''
    };
    httpHandlerSpy.handle.and.returnValue(throwError(error));

    interceptor.intercept(httpRequestSpy, httpHandlerSpy)
      .subscribe(
        result => {},
        err => {
          expect(err).toEqual(`Error Status: ${error.status}\nMessage: ${error.message}`);
          expect(toastServiceSpy.show).toHaveBeenCalled();
        }
      );
  });
});
