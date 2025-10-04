import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { IBoardDetails } from '@models/boards.model';
import { Card } from '@models/cards.model';
import { List } from '@models/lists.model';
import { BoardsService } from '@services/boards/boards-service';
import { CardsService } from '@services/cards/cards-service';
import { Modal } from '../../components/modal/modal';
import { Button } from '@components/button/button';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-board',
  imports: [
    CommonModule,
    DragDropModule,
    DialogModule,
    Button,
    ReactiveFormsModule,
  ],
  templateUrl: './board.html',
})
export class Board {
  private dialog = inject(Dialog);
  private boardsService = inject(BoardsService);
  private cardsService = inject(CardsService);
  private route = inject(ActivatedRoute);
  private formBuilder = inject(FormBuilder);

  board: IBoardDetails | null = null;
  cardData: Card | null = null;
  inputCard = new FormControl<string>('', {
    nonNullable: true,
    validators: [Validators.required],
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap?.get('id'));
    if (id) {
      this.getBoard(id);
    } else {
      console.error('Invalid board ID');
    }
  }

  getBoard(id: number) {
    this.boardsService.getBoard(id).subscribe((board) => {
      this.board = board;
      console.log('Fetched board:', this.board);
    });
  }

  openCardForm(list: List) {
    if (this.board && this.board.lists) {
      const targetList = this.board.lists.map((iteratorList) => {
        if (iteratorList.id === list.id) {
          return {
            ...iteratorList,
            showCardForm: true,
          };
        }
        return { ...iteratorList, showCardForm: false };
      });
      this.board.lists = targetList;
    }
  }

  closeCardForm(list: List) {
    list.showCardForm = false;
  }

  createCard(list: List) {
    if (this.inputCard.valid && this.board) {
      const cardDto = {
        title: this.inputCard.value,
        listId: list.id,
        boardId: this.board.id,
        position: this.boardsService.getPositionNewCard(list.cards),
      };
      this.cardsService.createCard(cardDto).subscribe((card) => {
        console.log('Card created:', card);
        let targetList: List | undefined;
        if (this.board && this.board.lists) {
          targetList = this.board.lists.find(
            (iteratorList) => iteratorList.id === list.id
          );
        }
        if (targetList) {
          targetList.cards.push(card);
          targetList.showCardForm = false;
        }
        this.inputCard.reset();
      });
    } else {
      console.error('Invalid card input or board not found');
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    const position = this.boardsService.getPosition(
      event.container.data,
      event.currentIndex
    );
    const card = event.container.data[event.currentIndex];
    const listId = Number(event.container.id);
    this.updateCard(card, position, listId);
  }

  private updateCard(card: Card, position: number, listId: number | string) {
    this.cardsService
      .update(card.id, { position, listId })
      .subscribe((updatedCard) => {
        console.log('Card updated:', updatedCard);
      });
  }

  openModal(cardData: Card) {
    this.dialog.open(Modal, {
      minWidth: '300px',
      maxWidth: '50%',
      data: {
        cardData,
        board: this.board,
        listData: this.board?.lists
          ? this.board.lists.find((list) =>
              list.cards.some((card) => card.id === cardData.id)
            )
          : undefined,
      },
    });
  }
}
