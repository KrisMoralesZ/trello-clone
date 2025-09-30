import { Component, inject } from '@angular/core';

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
import { Card, Item } from '../../models/boards.model';

@Component({
  selector: 'app-modal',
  imports: [DialogModule, FontAwesomeModule, Button],
  templateUrl: './modal.html',
})
export class Modal {
  private modalRef = inject<
    DialogRef<{
      response: boolean;
    }>
  >(DialogRef);

  faClose = faClose;
  faCheckToSlot = faCheckToSlot;
  faBars = faBars;
  faUser = faUser;
  faTag = faTag;
  faCheckSquare = faCheckSquare;
  faClock = faClock;

  modalData: Item;
  cardData: Card | null = null;

  constructor() {
    const data = inject<{
      item: Item;
      card: Card;
    }>(DIALOG_DATA);

    this.modalData = data.item;
  }

  closeModal(response = false) {
    this.modalRef.close({ response });
  }
}
