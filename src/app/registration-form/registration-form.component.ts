import { Component} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SpaceValidators} from './space.validators';

@Component({
  selector: 'registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent{

  form = new FormGroup({
    firstName : new FormControl('',[Validators.required,SpaceValidators.cannotContainSpace]),
    lastName : new FormControl(),
    email : new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',[Validators.required,Validators.pattern(/(?=.*[A-Z])/)])
  });

  get firstName()
  {
    return this.form.get('firstName');
  }

  get email()
  {
    return this.form.get('email');
  }

  get password()
  {
    return this.form.get('password');
  }
  register(){
    if(!this.form.valid){
      this.form.setErrors({})
    }
  }
}
