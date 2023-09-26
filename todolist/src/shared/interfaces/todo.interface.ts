export interface Tag {
  name: string;
  // todo : color 추가하기
}

export interface UserInputTodo {
  todo: string;
  tags?: Tag[];
  memo?: string;
  isRepeated: boolean;
  startDate?: string;
  endDate?: string;
  order: number;
}

export interface Todo extends UserInputTodo {
  // todo: userId 후순위
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
  id: string | -1;
}

export interface AddTodoResult {
  isSuccess: boolean;
  newTodo?: Todo;
}
