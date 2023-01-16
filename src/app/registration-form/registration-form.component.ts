import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/Auth.service';

import { SpaceValidators } from './space.validators';

@Component({
  selector: 'registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent {
  constructor(private authService: AuthService) {}

  form = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      SpaceValidators.cannotContainSpace,
    ]),
    lastName: new FormControl(),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/(?=.*[A-Z])/),
    ]),
  });

  register() {
    if (this.form.valid) {
      console.log("Registration Form is valid");
      this.authService.registerUser(this.form.value);
    } else {
      this.form.setErrors({});
    }
  }
}
