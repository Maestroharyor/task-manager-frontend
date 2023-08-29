export interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  tags: Tag[];
}
export interface NewTask {
  title: string;
  description: string;
  completed: boolean;
  tags: string[];
}

export interface Tag {
  _id: string;
  name: string;
  color: string;
  count: number;
}
export interface NewTag {
  name: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiTagDeleteResponse {
  success: boolean;
  message: string;
}
