import { atom } from 'jotai';
import { getTodos } from '../service/firebase';
import { Todo, UserInputTodo } from '../shared/interfaces/todo.interface';

// 정의
export const todosAtom = atom<Array<Todo | UserInputTodo>>([]);

// write only
export const setFBTodosAtom = atom(null, (get, set) => {
  getTodos().then((todos: any) => {
    set(todosAtom, todos);
  });
});

export const addTodoAtom = atom(null, (get, set, newTodo: UserInputTodo) => {
  set(todosAtom, [...get(todosAtom), newTodo]);
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
