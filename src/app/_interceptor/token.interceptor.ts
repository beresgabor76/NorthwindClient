import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const currentToken = this.authService.CurrentToken;
    if (currentToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentToken}`
        }
      });
    }
    return next.handle(request);
  }
}
