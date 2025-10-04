import { Routes } from '@angular/router';
import { Login } from '@pages/authentication/login/login';
import { Boards } from './pages/boards/boards';
import { Board } from './pages/board/board';
import { Signup } from '@pages/authentication/signup/signup';
import { PasswordReset } from '@pages/authentication/password-reset/password-reset';
import { Recovery } from '@pages/authentication/recovery/recovery';
import { Layout } from './layout/layout';
import { authenticationGuard } from './guards/authentication-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'signup',
    component: Signup,
  },
  {
    path: 'reset-password',
    component: PasswordReset,
  },
  {
    path: 'recover',
    component: Recovery,
  },
  {
    path: 'app',
    component: Layout,
    canActivate: [authenticationGuard],
    children: [
      {
        path: 'boards',
        component: Boards,
      },
      {
        path: 'board',
        component: Board,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
