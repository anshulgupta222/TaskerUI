import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LocalStorageService } from './localStorage';
import { IResponse } from './response';
import { IUser } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogIn: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly httpClient: HttpClient,
    private readonly localStorage: LocalStorageService,
    private readonly toaster: ToastrService
  ) {}

  login(credential: { email: string; password: string }): void {
    console.log('calling an api');
    console.log(credential);
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
        console.log(response);
        if (response) {
          console.log(response.data);
          this.localStorage.setItem('userData', response.data);
        }
      });
  }

  logout(): boolean {
    this.localStorage.removeItem('userData');
    this.router.navigate(['/login']);
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
