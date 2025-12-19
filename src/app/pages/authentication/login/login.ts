import { Component } from '@angular/core';
import { AuthenticationLayout } from '../../../layout/authentication-layout/authentication-layout';
import { TextInput } from '../../../components/text-input/text-input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AppButton } from '../../../components/button/button';
import { PasswordValidator } from '../../../shared/validators/password.validator';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthenticationLayout, TextInput, ReactiveFormsModule, RouterLink, AppButton],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, PasswordValidator.strong]),
  });

  constructor(private router: Router) { }

  login() {
    if (this.form.valid) {
      console.log('Login successful');
      this.router.navigate(['/applicant']);
    } else {
      console.log('Form is invalid');
      this.form.markAllAsTouched();
    }
  }
}
