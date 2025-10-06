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
import { Card } from '@models/cards.model';
import { List } from '@models/lists.model';

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

  cardData: Card;
  listData: List;

  constructor() {
    const data = inject<{
      cardData: Card;
      listData: List;
    }>(DIALOG_DATA);

    this.cardData = data.cardData;
    this.listData = data.listData;
  }

  closeModal(response = false) {
    this.modalRef.close({ response });
  }
}
