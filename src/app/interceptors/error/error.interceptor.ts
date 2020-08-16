import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Toast } from '@models/index';
import { ToastService } from '@services/index';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private toastService: ToastService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let msg = '';

          if (error.error instanceof ErrorEvent) {
            /* client side error */
            msg = `Error: ${error.error.message}`;
          } else {
            /* server side error */
            msg = `Error Status: ${error.status}\nMessage: ${error.message}`;
          }

          /* show the toast with toast and options object */
          const toast: Toast = {
            header: 'Error',
            body: msg
          };
          const options = {
            autohide: false,
            classname: 'bg-danger text-white my-3'
          };
          this.toastService.show(toast, options);

          return throwError(msg);
        })
      );
  }
}
