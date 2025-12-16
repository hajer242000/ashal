import { Component, signal } from '@angular/core';
import { Register } from './pages/authentication/register/register';
import { AuthenticationLayout } from './layout/authentication-layout/authentication-layout';
import { Login } from './pages/authentication/login/login';
import { TextInput } from './components/text-input/text-input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [Login],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('ashal');
  control = new FormControl('');
}
