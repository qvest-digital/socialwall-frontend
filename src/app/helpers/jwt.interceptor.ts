import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const token = localStorage.getItem('access_token');
    if (token) {
      request = request.clone({
        setHeaders: {
          'Cache-Control':  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
            'Pragma': 'no-cache',
          'Expires': '0',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        }
      });
    }

    return next.handle(request);
  }
}
