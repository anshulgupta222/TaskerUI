import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/Auth.service';
import { IUser } from './interfaces/user.interface';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'TaskerUI';
  user : IUser | undefined ;
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
   ) {}

  ngOnInit(): void {
    console.log("Component Initialised");
    this.userService.user$.subscribe(data =>{
      console.log("Pipeline Emitted");
      console.log(data);
      this.user = data;
    });
  }
  
  logout(): void {
    this.authService.logout();
  }
}
