import { Component, Inject } from '@angular/core';
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
  faClose = faClose;
  faCheckToSlot = faCheckToSlot;
  faBars = faBars;
  faUser = faUser;
  faTag = faTag;
  faCheckSquare = faCheckSquare;
  faClock = faClock;

  modalData: Item;

  constructor(
    private modalRef: DialogRef<{ response: boolean }>,
    @Inject(DIALOG_DATA) data: { item: Item }
  ) {
    this.modalData = data.item;
  }

  closeModal(response: boolean = false) {
    this.modalRef.close({ response });
  }
}
