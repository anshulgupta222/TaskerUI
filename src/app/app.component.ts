import { Component } from '@angular/core';
import { AuthService } from './Auth.Service';

@Component({  
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TaskerUI';
  constructor(private readonly authService: AuthService) {}
  logout() : void {
  this.authService.logout();
}
}
