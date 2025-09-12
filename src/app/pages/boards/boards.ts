import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-boards',
  imports: [CommonModule, Navbar],
  templateUrl: './boards.html',
})
export class Boards {}
