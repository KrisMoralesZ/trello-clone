import { Card } from './cards.model';
import { User } from './user.model';

export interface List {
  id: number;
  title: string;
  position: number;
  cards: Card[];
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
