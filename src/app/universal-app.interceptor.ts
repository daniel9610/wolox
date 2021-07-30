import { Injectable } from '@angular/core';
import { LocalStorageService } from './services/local-storage.service';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UniversalAppInterceptor implements HttpInterceptor {

  constructor(
    private authStorageService: LocalStorageService,

  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authStorageService.get('token');
    request = request.clone({
      url:  request.url,
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(request);
  }
}
