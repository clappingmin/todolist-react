import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  orderBy,
  query,
} from 'firebase/firestore';
import { db } from '../shared/firebase/firebase';
import {
  AddTodoResult,
  Todo,
  UserInputTodo,
} from '../shared/interfaces/todo.interface';

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

export async function getTodos() {
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
