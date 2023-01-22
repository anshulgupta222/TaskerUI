import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/Auth.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  constructor(private authService: AuthService , private router:Router) {}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  login() {
    if(this.form.valid){
      console.log(this.form);
      console.log("Log In Form is valid");
      this.authService.login(this.form.value);
    }
    else{
      this.form.setErrors({});
    }
    
  }
}
