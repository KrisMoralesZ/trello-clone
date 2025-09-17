import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
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
import { Item } from '../../models/boards.model';

@Component({
  selector: 'app-modal',
  imports: [CommonModule, DialogModule, FontAwesomeModule, Button],
  templateUrl: './modal.html',
})
export class Modal {
  private modalRef = inject<DialogRef<{
    response: boolean;
}>>(DialogRef);

  faClose = faClose;
  faCheckToSlot = faCheckToSlot;
  faBars = faBars;
  faUser = faUser;
  faTag = faTag;
  faCheckSquare = faCheckSquare;
  faClock = faClock;

  modalData: Item;

  constructor() {
    const data = inject<{
    item: Item;
}>(DIALOG_DATA);

    this.modalData = data.item;
  }

  closeModal(response = false) {
    this.modalRef.close({ response });
  }
}
