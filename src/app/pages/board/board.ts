import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Column } from '../../models/boards.model';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-board',
  imports: [CommonModule, DragDropModule, Navbar],
  templateUrl: './board.html',
})
export class Board {
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
}
