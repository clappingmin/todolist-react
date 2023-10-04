import { atom, useAtom, useSetAtom } from 'jotai';
import {
  addTodoFB,
  deleteTodoFB,
  getTodosFB,
  updateTodoFB,
} from '../service/firebase';
import { Todo } from '../shared/interfaces/todo.interface';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

// 정의
export const todosAtom = atom<Array<Todo>>([]);

// 파생된 atom - todos의 길이
export const todosLenAtom = atom((get) => get(todosAtom).length);

// 원하는 투두 하나 찾기
export const useFindTodo = (todoId: string) => {
  useSetAtom(setFBTodosAtom)();

  return useAtom(todosAtom)[0].find((todo) => todo.id === todoId);
};

// 서버에서 전체 todo 가져오기
export const setFBTodosAtom = atom(null, async (get, set) => {
  if (!get(todosLenAtom)) {
    const newTodos: Array<Todo> = await getTodosFB();
    set(todosAtom, newTodos);
  }
});

// 추가하기
export const addTodoAtom = atom(null, async (get, set, newTodo: Todo) => {
  if (await addTodoFB(newTodo)) {
    set(todosAtom, [...get(todosAtom), newTodo]);
    return true;
  }
  return false;
});

// 수정하기
export const updateTodoAtom = atom(null, (get, set, updateTodo: Todo) => {
  const updatedtodos = get(todosAtom).map((todo) => {
    if (todo.id === updateTodo.id) return updateTodo;
    return todo;
  });

  updateTodoFB(updateTodo);

  set(todosAtom, updatedtodos);
});

export const deleteTodoAtom = atom(null, (get, set, todoId: string) => {
  deleteTodoFB(todoId);

  const filterdTodos = get(todosAtom).filter((todo) => todo.id !== todoId);
  set(todosAtom, filterdTodos);
});
