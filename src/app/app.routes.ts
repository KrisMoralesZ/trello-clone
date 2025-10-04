import { Routes } from '@angular/router';
import { Login } from '@pages/authentication/login/login';
import { Boards } from './pages/boards/boards';
import { Board } from './pages/board/board';
import { Signup } from '@pages/authentication/signup/signup';

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
    path: 'boards',
    component: Boards,
  },
  {
    path: 'board',
    component: Board,
  },
];
