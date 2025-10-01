import { Injectable, inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { Card } from '@models/boards.model';
import { Modal } from '@components/modal/modal';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private dialog = inject(Dialog);

  open(cardData: Card) {
    const dialogRef = this.dialog.open(Modal, {
      data: { cardData },
    });

    return dialogRef.closed;
  }
}
