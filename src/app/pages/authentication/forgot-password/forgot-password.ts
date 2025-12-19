import { Component } from '@angular/core';
import { AuthenticationLayout } from '../../../layout/authentication-layout/authentication-layout';
import { TextInput } from '../../../components/text-input/text-input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AppButton } from '../../../components/button/button';

@Component({
    selector: 'app-forgot-password',
    standalone: true,
    imports: [AuthenticationLayout, TextInput, ReactiveFormsModule, RouterLink, AppButton],
    templateUrl: './forgot-password.html',
    styleUrl: './forgot-password.css',
})
export class ForgotPassword {
    form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
    });

    constructor(private router: Router) { }

    resetPassword() {
        if (this.form.valid) {
            console.log('Reset password request for:', this.form.value.email);
            // Navigate or show success message
        } else {
            this.form.markAllAsTouched();
        }
    }
}
