import { Routes } from '@angular/router';
import { Login } from '@pages/authentication/login/login';
import { Boards } from './pages/boards/boards';
import { Board } from './pages/board/board';
import { Signup } from '@pages/authentication/signup/signup';
import { PasswordReset } from '@pages/authentication/password-reset/password-reset';
import { Recovery } from '@pages/authentication/recovery/recovery';
import { Layout } from './components/layout/layout';
import { authenticationGuard } from './guards/authentication-guard';
import { loggedUserGuard } from './guards/logged-user-guard';
import { UsersTable } from '@pages/users/users-table/users-table';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [loggedUserGuard],
    component: Login,
  },
  {
    path: 'signup',
    canActivate: [loggedUserGuard],
    component: Signup,
  },
  {
    path: 'reset-password',
    canActivate: [loggedUserGuard],
    component: PasswordReset,
  },
  {
    path: 'recovery',
    canActivate: [loggedUserGuard],
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
        path: 'boards/:id',
        component: Board,
      },
      {
        path: 'users',
        component: UsersTable,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
