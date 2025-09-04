import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { ToDo } from '../../models/todo.model';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-board',
  imports: [CommonModule, DragDropModule, Navbar],
  templateUrl: './board.html',
})
export class Board {
  todos: ToDo[] = [
    {
      id: '1',
      title: 'Make dishes',
    },
    {
      id: '2',
      title: 'Buy a unicorn',
    },
    {
      id: '2',
      title: 'Watch Angular Path in Platzi',
    },
  ];

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }
}
