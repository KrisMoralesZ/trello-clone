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
import { BoardsService } from '@services/boards/boards-service';
import { Item } from './../../models/boards.model';
import { Column } from '../../models/boards.model';
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

  columns: Column[] = [
    {
      columnTitle: 'To Do',
      item: [
        {
          id: 1,
          title: 'Make dishes',
        },
        {
          id: 2,
          title: 'Buy a unicorn',
        },
      ],
    },
    {
      columnTitle: 'In Progress',
      item: [
        {
          id: 1,
          title: 'Make dishes',
        },
        {
          id: 2,
          title: 'Buy a unicorn',
        },
      ],
    },
    {
      columnTitle: 'Done',
      item: [
        {
          id: 1,
          title: 'Make dishes',
        },
        {
          id: 2,
          title: 'Buy a unicorn',
        },
      ],
    },
  ];

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
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

  addColumn() {
    this.columns.push({
      columnTitle: 'New Column',
      item: [],
    });
  }

  openModal(item: Item) {
    this.dialog.open(Modal, {
      minWidth: '300px',
      maxWidth: '50%',
      data: { item },
    });
  }
}
