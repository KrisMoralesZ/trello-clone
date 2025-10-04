import { User } from './user.model';

export interface Item {
  id: number;
  title: string;
}

export interface Column {
  columnTitle: string;
  item: Item[];
}

export interface IBoard {
  id: number;
  title: string;
  backgroundColor: 'sky' | 'yellow' | 'green' | 'red' | 'violet' | 'gray';
  members: User[];
}

export interface IBoards {
  boards: IBoard[];
}
