import { Card } from './cards.model';

export interface List {
  id: number;
  title: string;
  position: number;
  cards: Card[];
}
