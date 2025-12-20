import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/authentication/login/login').then((c) => c.Login),
    data: { animation: 'LoginPage' },
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/authentication/register/register').then((c) => c.Register),
    data: { animation: 'RegisterPage' },
  },
  {
    path: 'verify',
    loadComponent: () =>
      import('./pages/authentication/verification/verification').then((c) => c.Verification),
    data: { animation: 'verificationPage' },
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./pages/authentication/forgot-password/forgot-password').then((c) => c.ForgotPassword),
    data: { animation: 'ForgotPasswordPage' },
  },
  {
    path: 'application',
    loadChildren: () => import('./pages/application/application.routes').then((m) => m.APPLICATION_ROUTES),
  },
];
