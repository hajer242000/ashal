import { Component } from '@angular/core';
import { AuthenticationLayout } from '../../../layout/authentication-layout/authentication-layout';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [AuthenticationLayout],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {}
