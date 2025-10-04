import { User } from './user.model';

export interface Item {
  id: number;
  title: string;
}

export interface Column {
  columnTitle: string;
  item: Item[];
}

export interface List {
  id: string;
  title: string;
  position: number;
  cards: Card[];
}

export interface Card {
  id: string;
  title: string;
  description: string;
  position: number;
  list: List;
}

export interface IBoard {
  id: number;
  title: string;
  backgroundColor: 'sky' | 'yellow' | 'green' | 'red' | 'violet' | 'gray';
  members: User[];
}

export interface IBoardDetails extends IBoard {
  lists?: List[];
}
