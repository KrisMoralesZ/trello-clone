import { List } from './lists.model';
import { User } from './user.model';

export interface IBoard {
  id: number;
  title: string;
  backgroundColor: 'sky' | 'yellow' | 'green' | 'red' | 'violet' | 'gray';
  members: User[];
}

export interface IBoardDetails extends IBoard {
  lists?: List[];
}
