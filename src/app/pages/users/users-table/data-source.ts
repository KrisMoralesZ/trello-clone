import { DataSource } from '@angular/cdk/collections';
import { User } from '@models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

export class DataSourceUser extends DataSource<User> {
  data = new BehaviorSubject<User[]>([]);
  originalData: User[] = [];

  connect(): Observable<User[]> {
    return this.data.asObservable();
  }

  disconnect(): void {
    this.data.complete();
  }

  setData(data: User[]) {
    this.originalData = data;
    this.data.next(data);
  }

  filterData(filter: string) {
    if (!filter) {
      this.data.next(this.originalData);
      return;
    }
    const filteredData = this.originalData.filter((user) =>
      user.name.toLowerCase().includes(filter.toLowerCase())
    );
    this.data.next(filteredData);
  }
}
