import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Colors } from '@models/colors.model';
import { BoardsService } from '@services/boards/boards-service';
import { Button } from '@components/button/button';

@Component({
  selector: 'app-new-board-form',
  imports: [CommonModule, ReactiveFormsModule, Button],
  templateUrl: './new-board-form.html',
})
export class NewBoardForm {
  private formBuilder = inject(FormBuilder);
  private boardsService = inject(BoardsService);
  private router = inject(Router);

  @Output() closeForm = new EventEmitter<boolean>();

  closeNewBoardForm() {
    this.closeForm.emit(false);
  }

  form = this.formBuilder.nonNullable.group({
    title: [''],
    backgroundColor: new FormControl<Colors>('sky', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  onSaveForm() {
    if (this.form.valid) {
      const { title, backgroundColor } = this.form.value;
      if (title && backgroundColor) {
        this.boardsService.createBoard(title, backgroundColor).subscribe({
          next: (board) => {
            this.closeNewBoardForm();
            this.form.reset();
            this.router.navigateByUrl(`app/boards/${board.id}`);
          },
          error: (err) => {
            console.error('Error creating board:', err);
          },
        });
      }
    }
  }
}
