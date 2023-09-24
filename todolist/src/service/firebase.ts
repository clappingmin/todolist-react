import { collection, addDoc, getDocs, setDoc, doc } from 'firebase/firestore';
import { db } from '../shared/firebase/firebase';
import { Todo, UserInputTodo } from '../shared/interfaces/todo.interface';

export async function addTodoFB(inputTodo: UserInputTodo): Promise<boolean> {
  try {
    const createdAt = new Date().toString();
    const newTodo: Todo = {
      ...inputTodo,
      isDone: false,
      createdAt,
      updatedAt: createdAt,
    };
    const docRef = await addDoc(collection(db, 'todo'), { ...newTodo });
    console.log('Document written with ID: ', docRef.id);

    if (docRef.id) return true;

    return false;
  } catch (e) {
    throw e;
  }
}

export async function getTodos() {
  const todos: Array<Todo> = [];
  const querySnapshot = await getDocs(collection(db, 'todo'));
  querySnapshot.forEach((doc) => {
    todos.push(doc.data() as Todo);
  });

  console.log('getTodos - ', todos);

  return todos;
}
