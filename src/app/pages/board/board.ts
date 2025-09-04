import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  DragDropModule,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
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
  ];

  doing: ToDo[] = [
    {
      id: '3',
      title: 'Watch Angular Path in Platzi',
    },
  ];

  done: ToDo[] = [
    {
      id: '4',
      title: 'Play video games',
    },
  ];

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
