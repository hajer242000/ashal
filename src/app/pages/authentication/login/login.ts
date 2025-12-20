import { Component } from '@angular/core';
import { AuthenticationLayout } from '../../../layout/authentication-layout/authentication-layout';
import { TextInput } from '../../../components/text-input/text-input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { AppButton } from '../../../components/button/button';
import { PasswordValidator } from '../../../shared/validators/password.validator';

import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../../core/models/role.model';

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

  constructor(private router: Router, private authService: AuthService) { }

  login() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      if (email && password) {
        this.authService.login({ email, password }).subscribe({
          next: (res) => {
            console.log('Login Response:', res);
            // Map string role from API to Enum
            const role = res.role as UserRole || UserRole.Applicant;
            this.authService.setRole(role);

            if (res.requiresOtp) {
              console.log(`OTP Required! Role: ${res.role}`);
              this.router.navigate(['/verify'], { queryParams: { source: 'login' } });
            } else {
              console.log('Login successful');
              this.router.navigate(['/application']);
            }
          },
          error: (err) => console.error('Login failed', err)
        });
      }
    } else {
      console.log('Form is invalid');
      this.form.markAllAsTouched();
    }
  }
}
