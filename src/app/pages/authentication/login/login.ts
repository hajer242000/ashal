import { Component } from '@angular/core';
import { AuthenticationLayout } from '../../../layout/authentication-layout/authentication-layout';
import { TextInput } from '../../../components/text-input/text-input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthenticationLayout, TextInput, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
}
