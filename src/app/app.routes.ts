import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'register',
    loadComponent: () => import('./pages/authentication/register/register').then((c) => c.Register),
  },
];
