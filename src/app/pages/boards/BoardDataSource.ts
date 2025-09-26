import { DataSource } from '@angular/cdk/collections';
import { IBoard } from '@models/boards.model';
import { BehaviorSubject, Observable } from 'rxjs';

export class BoardsDataSource extends DataSource<IBoard> {
  data = new BehaviorSubject<IBoard[]>([]);
  originalData: IBoard[] = [];

  connect(): Observable<IBoard[]> {
    return this.data.asObservable();
  }

  disconnect(): void {
    this.data.complete();
  }

  setData(data: IBoard[]) {
    this.originalData = data;
    this.data.next(data);
  }

  filterData(filter: string) {
    if (!filter) {
      this.data.next(this.originalData);
      return;
    }
    const filteredData = this.originalData.filter((board) =>
      board.title.toLowerCase().includes(filter.toLowerCase())
    );
    this.data.next(filteredData);
  }
}
