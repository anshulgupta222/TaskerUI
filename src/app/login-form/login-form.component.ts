import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent{

  form = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',Validators.required)
  });

  login(){
    if(!this.form.valid){
    this.form.setErrors({});
    }
  }
}
