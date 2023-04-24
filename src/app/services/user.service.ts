import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { LocalStorageService } from './localStorage';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$: Observable<IUser | undefined> = new BehaviorSubject<IUser | undefined>(
    undefined
  );

  constructor(private localStorage: LocalStorageService) {
    this.refreshUser();
  }

  refreshUser(): void {
    let user = this.localStorage.getItem<IUser>('userData');
    (
        this.user$ as BehaviorSubject<IUser | undefined>
    )
      .next(user);
  }
}
