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
import { BoardsDataSource } from './BoardDataSource';
import { IBoard } from '@models/boards.model';

@Component({
  selector: 'app-boards',
  imports: [FontAwesomeModule, CdkAccordionModule],
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

  dataSource = new BoardsDataSource();
  boards: IBoard[] = [];

  ngOnInit() {
    this.getBoards();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterData(filterValue.trim().toLowerCase());
  }

  getBoards() {
    this.boardsService.getBoards().subscribe({
      next: (boards) => {
        this.dataSource.setData(boards as IBoard[]);
        console.log(boards);
      },
    });
  }
}
