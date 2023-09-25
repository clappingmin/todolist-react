import { atom } from 'jotai';
import { getTodosFB, updateTodoFB } from '../service/firebase';
import { Todo } from '../shared/interfaces/todo.interface';

// 정의
export const todosAtom = atom<Array<Todo>>([]);

// 파생된 atom - todos의 길이
export const todosLenAtom = atom((get) => get(todosAtom).length);

// 서버에서 전체 todo 가져오기
export const setFBTodosAtom = atom(null, async (get, set) => {
  if (!get(todosLenAtom)) {
    const newTodos: Array<Todo> = await getTodosFB();
    set(todosAtom, newTodos);
  }
});

// 추가하기
export const addTodoAtom = atom(null, (get, set, newTodo: Todo) => {
  set(todosAtom, [...get(todosAtom), newTodo]);
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
