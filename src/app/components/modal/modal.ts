import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogRef } from '@angular/cdk/dialog';
import { DialogModule } from '@angular/cdk/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faClose,
  faCheckToSlot,
  faBars,
  faUser,
  faTag,
  faCheckSquare,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '../button/button';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, DialogModule, FontAwesomeModule, Button],
  templateUrl: './modal.html',
})
export class Modal {
  faClose = faClose;
  faCheckToSlot = faCheckToSlot;
  faBars = faBars;
  faUser = faUser;
  faTag = faTag;
  faCheckSquare = faCheckSquare;
  faClock = faClock;

  constructor(private modalRef: DialogRef) {}

  closeModal() {
    this.modalRef.close();
  }
}
