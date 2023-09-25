import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  orderBy,
  query,
  getDoc,
} from 'firebase/firestore';
import { db } from '../shared/firebase/firebase';
import {
  AddTodoResult,
  Todo,
  UserInputTodo,
} from '../shared/interfaces/todo.interface';

/**
 * 투두 추가하기
 * @param {UserInputTodo} inputTodo
 * @returns {Promise<AddTodoResult>}
 */
export async function addTodoFB(
  inputTodo: UserInputTodo
): Promise<AddTodoResult> {
  try {
    const createdAt = new Date().toString();
    const newTodo: Todo = {
      ...inputTodo,
      isDone: false,
      createdAt,
      updatedAt: createdAt,
      id: -1,
    };
    const docRef = await addDoc(collection(db, 'todo'), { ...newTodo });

    if (docRef.id) {
      await setDoc(docRef, { id: docRef.id }, { merge: true });
      newTodo.id = docRef.id;
      return { isSuccess: true, newTodo };
    }

    return { isSuccess: false };
  } catch (e) {
    throw e;
  }
}

/**
 * 투두 전체 가져오기
 * @returns {Promise<Array<Todo>>}
 */
export async function getTodosFB(): Promise<Array<Todo>> {
  const todos: Array<Todo> = [];
  const orderdTodosQuery = await query(
    collection(db, 'todo'),
    orderBy('order', 'asc')
  );

  const querySnapshot = await getDocs(orderdTodosQuery);

  querySnapshot.forEach((doc) => {
    todos.push(doc.data() as Todo);
  });

  console.log('getTodos - ', todos);

  return todos;
}

/**
 * 투두 수정하기
 * @param {Todo} target
 * @requires {Promise<void>}
 */
export async function updateTodoFB(target: Todo): Promise<void> {
  await setDoc(doc(db, 'todo', String(target.id)), target);
}

/**
 * 특정 투두 가져오기
 * @param {string} todoId
 */
export async function getTodoFB(todoId?: string): Promise<Todo | null> {
  const docRef = doc(db, 'todo', String(todoId));
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) return docSnap.data() as Todo;

  return null;
}
