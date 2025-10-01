import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { Card, IBoardDetails, List } from '@models/boards.model';
import { BoardsService } from '@services/boards/boards-service';
import { Modal } from '../../components/modal/modal';

@Component({
  selector: 'app-board',
  imports: [DragDropModule, DialogModule],
  templateUrl: './board.html',
})
export class Board {
  private dialog = inject(Dialog);
  private boardsService = inject(BoardsService);
  private route = inject(ActivatedRoute);

  board: IBoardDetails | null = null;
  cardData: Card | null = null;

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
  }

  // addColumn() {
  //   this.lists.push({
  //     title: 'New Column',
  //     cards: [],
  //   });
  // }

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
    console.log(cardData);
  }
}
