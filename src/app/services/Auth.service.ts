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
    private readonly userService: UserService
  ) {}

  registerUser(userData: IUser): void {
    console.log('RegisterUser Calling');
    var response = this.httpClient
      .post<IUser>('https://localhost:5001/Account/Register', userData)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status == 401 || error.status == 400) {
            this.toaster.error('Please Try Again');
            console.log(error.message);
          } else {
            console.log('Inside Registration API Call');
          }
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          this.toaster.success('New User is created');
          console.log(response);
        }
      });
  }

  login(credential: { email: string; password: string }): void {
    this.httpClient
      .post<IResponse<IUser> | null>(
        'https://localhost:5001/Account/Login',
        credential
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status == 401 || error.status == 400) {
            this.toaster.error('Login Failed');
            console.log(error.message);
          } else {
            console.log('Inside Login API Call: Something Went Wrong !!');
          }
          return of(null);
        })
      )
      .subscribe((response) => {
        if (response) {
          this.toaster.success('Access Granted');
          this.localStorage.setItem('userData', response.data);
          this.router.navigate(['/taskDashboard']);
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
}
