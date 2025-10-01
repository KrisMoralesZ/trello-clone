import { Injectable, inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { List } from '@models/boards.model';
import { Modal } from '@components/modal/modal';
import { Card } from '@models/cards.model';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private dialog = inject(Dialog);

  open(cardData: Card, listData: List) {
    const dialogRef = this.dialog.open(Modal, {
      data: { cardData, listData },
    });

    return dialogRef.closed;
  }
}
