export interface Item {
  id: number;
  title: string;
}

export interface Column {
  columnTitle: string;
  item: Item[];
}
