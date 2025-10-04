
import { Component } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBell,
  faInfoCircle,
  faClose,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '@components/button/button';

@Component({
  selector: 'app-navbar',
  imports: [OverlayModule, FontAwesomeModule, Button],
  templateUrl: './navbar.html',
})
export class Navbar {
  faBell = faBell;
  faInfoCircle = faInfoCircle;
  faClose = faClose;

  isOpen = false;
}
