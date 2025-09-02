import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
  faBox,
  faWaveSquare,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-boards',
  imports: [CommonModule, Navbar, FontAwesomeModule],
  templateUrl: './boards.html',
})
export class Boards {
  faTrello = faTrello;
  faBox = faBox;
  faWaveSquare = faWaveSquare;
  faClock = faClock;
}
