import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import {
  faBox,
  faWaveSquare,
  faClock,
  faAngleUp,
  faAngleDown,
  faHeart,
  faBorderAll,
  faUsers,
  faGear,
} from '@fortawesome/free-solid-svg-icons';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import { BoardsService } from '@services/boards/boards-service';
import { IBoard } from '@models/boards.model';
import { CardColor } from '@components/card-color/card-color';

@Component({
  selector: 'app-boards',
  imports: [FontAwesomeModule, CdkAccordionModule, CardColor],
  templateUrl: './boards.html',
})
export class Boards {
  private boardsService = inject(BoardsService);

  faTrello = faTrello;
  faBox = faBox;
  faWaveSquare = faWaveSquare;
  faClock = faClock;
  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;
  faHeart = faHeart;
  faBorderAll = faBorderAll;
  faUsers = faUsers;
  faGear = faGear;

  boards: IBoard[] = [];

  ngOnInit() {
    this.getBoards();
  }

  getBoards() {
    this.boardsService.getBoards().subscribe({
      next: (boards) => {
        this.boards = boards;
      },
      error: (err) => {
        console.error('Error fetching boards:', err);
      },
    });
  }

  goToBoard(boardId: number) {
    window.location.href = `/app/boards/${boardId}`;
  }
}
