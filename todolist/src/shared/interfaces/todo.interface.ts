export interface Tag {
  name: string;
}

export interface UserInputTodo {
  todo: string;
  tags?: Tag[];
  memo?: string;
  isRepeated: boolean;
  startDate?: string;
  endDate?: string;
}

export interface Todo extends UserInputTodo {
  // todo: userId 후순위
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
}
