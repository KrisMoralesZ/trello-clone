import { List } from './boards.model';

export interface Card {
  id: string;
  title: string;
  description?: string;
  position?: number;
  list?: List;
}
