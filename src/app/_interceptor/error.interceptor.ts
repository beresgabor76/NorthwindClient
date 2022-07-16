import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from '../_services/message.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private messageService: MessageService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
          switch (error.status) {
            case 400:
              if (error.error.errors) {
                var message: string = "";
                var items: string[] = Object.values(error.error.errors);
                for (let i = 0; i < items.length; i++) {
                  message = message.concat(items[i][0] + '\n');
                }
                this.messageService.showError(message);
              }
              else if (error.error.Message) {
                this.messageService.showError(error.error.Message);
              }
              else if (error.error) {
                this.messageService.showError(error.error);
              }
              break;
            case 401:
              this.messageService.showError("You are not allowed to do this action!");
              break;
            case 404:
              this.messageService.showError('Requested Page Not Found');
              this.router.navigateByUrl('home');
              break;
            case 500:
              this.messageService.showError('Internal Server Error');
          }
        }
        return throwError(error);
      })
    );
  }
}
