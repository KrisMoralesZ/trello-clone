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
}

export interface IBoards {
  boards: IBoard[];
}
