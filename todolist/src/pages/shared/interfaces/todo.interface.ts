export interface Tag {
  name: string;
}

export interface UserInputTodo {
  todo: string;
  tag?: Tag[];
  memo?: string;
  isRepeated: boolean;
  startDate?: Date;
  endDate?: Date;
}

export interface Todo extends UserInputTodo {
  // userId 후순위
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
}
