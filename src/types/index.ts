export interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  tags: Tag[];
}

export interface Tag {
  _id: string;
  name: string;
  color: string;
  count: number;
}
