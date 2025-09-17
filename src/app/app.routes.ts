import { Routes } from '@angular/router';
import { Login } from '@pages/authentication/login/login';
import { Boards } from './pages/boards/boards';
import { Board } from './pages/board/board';

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
    path: 'boards',
    component: Boards,
  },
  {
    path: 'board',
    component: Board,
  },
];
