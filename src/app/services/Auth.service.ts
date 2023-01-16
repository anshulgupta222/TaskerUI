import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LocalStorageService } from './localStorage';
import { IResponse } from '../interfaces/response';
import { IUser } from '../interfaces/user.interface';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogIn: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly httpClient: HttpClient,
    private readonly localStorage: LocalStorageService,
    private readonly toaster: ToastrService,
    private readonly userService : UserService
  ) {}

  login(credential: { email: string; password: string }): void {
  
    this.httpClient
      .post<IResponse<IUser> | null>(
        'https://localhost:5001/Account/Login',
        credential
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status == 401) {
            this.toaster.error('Login Failed');
          } else {
            console.log('An Error is occured');
          }
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          this.localStorage.setItem('userData', response.data);
          this.userService.refreshUser();
        }
      });
  }

  logout(): boolean {
    this.localStorage.removeItem('userData');
    this.router.navigate(['/login']);
    this.userService.refreshUser();
    return this.isLogIn;
  }

  registerUser(userData: IUser): void {
    console.log('RegisterUser Calling');
    var response = this.httpClient
      .post<IUser>('https://localhost:5001/Account/Register', userData)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
