import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from '../services/localStorage';
import { IUser } from '../interfaces/user.interface';
import { AuthService } from '../services/Auth.service';

@Injectable()

export class HeaderInterceptor implements HttpInterceptor {
  constructor(
    private localstorage: LocalStorageService,
    private router: Router,
    private readonly authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let userToken = this.localstorage.getItem<IUser>('userData')?.token; 
    if (userToken) {
      request = request.clone({
        headers: request.headers.set('Authorization', 'Bearer '+`${userToken}`),
      });
    }
    return next.handle(request).pipe(
      tap(
        () => {},
        (error: any) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status !== 401) {
              return;
            }
            this.authService.logout();
            // this.router.navigate(['/login']);
          }
        }
      )
    );
  }
}
