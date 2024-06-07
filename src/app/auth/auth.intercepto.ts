import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService){
  }

  intercept(req: HttpRequest<any>, next: HttpHandler){
  const token = this.authService.getAccessToken();

  if (!token) {
    return next.handle(req);
  }

  const req1 = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
    url: req.url
  });

      return next.handle(req1).pipe(tap(
        event => {
        },
        err => {
          if(err.error?.auth === false){
            this.authService.logout();
          }
        }
      ));

  }
}
