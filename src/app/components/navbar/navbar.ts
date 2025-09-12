import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { Button } from '@components/button/button';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, OverlayModule, Button],
  templateUrl: './navbar.html',
})
export class Navbar {
  isOpen = false;
}
