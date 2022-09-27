import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { IUser } from "./user.interface";

@Injectable({
    providedIn: 'root',
  })
export class UserService{

   user$ : Observable<IUser> = new Subject<IUser>();

}