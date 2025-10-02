import { Component, inject } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBell,
  faInfoCircle,
  faClose,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '@components/button/button';
import { AuthService } from '@services/auth/auth-service';
import { Router, RouterLinkWithHref } from '@angular/router';
import { UsersService } from '@services/users/users-service';
import { AsyncPipe } from '@angular/common';
import { NewBoardForm } from '@components/new-board-form/new-board-form';

@Component({
  selector: 'app-navbar',
  imports: [
    OverlayModule,
    FontAwesomeModule,
    Button,
    AsyncPipe,
    RouterLinkWithHref,
    NewBoardForm,
  ],
  templateUrl: './navbar.html',
})
export class Navbar {
  private authService = inject(AuthService);
  private userService = inject(UsersService);
  private router = inject(Router);
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;
  faAngleDown = faAngleDown;

  isOpenOverlayAvatar = false;
  isOpenOverlayBoards = false;
  isOpenOverlayCreateBoard = false;

  user$ = this.userService.user$;

  logoutUser() {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }

  closeNewBoardForm(event: boolean) {
    this.isOpenOverlayCreateBoard = event;
  }
}
