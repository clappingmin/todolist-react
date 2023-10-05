import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import { deleteTodoAtom, useFindTodo } from '../../store/todo.store';
import { useEffect, useMemo } from 'react';
import { useSetAtom } from 'jotai';

function TodoDetailPage() {
  const navigate = useNavigate();
  const { todoId } = useParams();
  const todo = todoId ? useFindTodo(todoId) : null;
  const deleteTodo = useSetAtom(deleteTodoAtom);

  const deleteBtnHandler = () => {
    if (todoId) deleteTodo(todoId);
    navigate('/todo');
  };

  return (
    <div>
      {todo ? (
        <div className="top-wrapper">
          <div>{todo.id}</div>
          <button onClick={deleteBtnHandler}>삭제</button>
        </div>
      ) : (
        <div>없음</div>
      )}
    </div>
  );
}

export default TodoDetailPage;
