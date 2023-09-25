import { atom } from 'jotai';
import { getTodosFB, updateTodoFB } from '../service/firebase';
import { Todo } from '../shared/interfaces/todo.interface';

// 정의
export const todosAtom = atom<Array<Todo>>([]);

// 파생된 atom - todos의 길이
export const todosLenAtom = atom((get) => get(todosAtom).length);

// 서버에서 전체 todo 가져오기
export const setFBTodosAtom = atom(null, (get, set) => {
  if (!get(todosLenAtom)) {
    getTodosFB().then((todos: any) => {
      set(todosAtom, todos);
    });
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

/**
 * 예시
 * 
 * 
const priceAtom = atom(10)
const messageAtom = atom('hello')
const productAtom = atom({ id: 12, name: 'good stuff' })

const readOnlyAtom = atom((get) => get(priceAtom) * 2)
const writeOnlyAtom = atom(
  null, // it's a convention to pass `null` for the first argument
  (get, set, update) => {
    // `update` is any single value we receive for updating this atom
    set(priceAtom, get(priceAtom) - update.discount)
  }
)
const readWriteAtom = atom(
  (get) => get(priceAtom) * 2,
  (get, set, newPrice) => {
    set(priceAtom, newPrice / 2)
    // you can set as many atoms as you want at the same time
  }
)
 */
