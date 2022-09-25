import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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
    private readonly localStorage: LocalStorageService
  ) {}

  login(credential: { email: string; password: string }): void {
    console.log('calling an api');
    console.log(credential);
    this.httpClient
      .post<IResponse<IUser>>(
        'https://localhost:5001/Account/Login',
        credential
      )
      .subscribe((response) => {
        console.log(response.data);
        this.localStorage.setItem('userData', response.data);
      });
  }

  logout(): boolean {
    this.localStorage.removeItem('userData');
    this.router.navigate(['/login']);
    return this.isLogIn;
  }

  registerUser(userData: IUser): void {
    console.log('RegisterUser Calling ');
    console.log(userData.firstName);
    var response = this.httpClient
      .post<IUser>('https://localhost:5001/Account/Register', userData)
      .subscribe((response) => {
        console.log(response);
    });
  }
}
