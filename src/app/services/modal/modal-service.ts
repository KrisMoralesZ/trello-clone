import { Injectable, inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { Item } from '@models/boards.model';
import { Modal } from '@components/modal/modal';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private dialog = inject(Dialog);

  open(item: Item) {
    const dialogRef = this.dialog.open(Modal, {
      data: { item },
    });

    return dialogRef.closed;
  }
}
