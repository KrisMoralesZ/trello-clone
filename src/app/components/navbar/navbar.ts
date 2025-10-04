import { Component, inject } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBell,
  faInfoCircle,
  faClose,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '@components/button/button';
import { AuthService } from '@services/auth/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [OverlayModule, FontAwesomeModule, Button],
  templateUrl: './navbar.html',
})
export class Navbar {
  private authService = inject(AuthService);
  private router = inject(Router);
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;

  isOpen = false;

  logoutUser() {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }
}
