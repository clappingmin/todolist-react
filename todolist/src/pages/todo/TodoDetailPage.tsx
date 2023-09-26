import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import { findTodo } from '../../store/todo';
import { useEffect, useMemo } from 'react';

function TodoDetailPage() {
  const navigate = useNavigate();
  const { todoId } = useParams();
  const todo = todoId ? findTodo(todoId) : null;

  // todo todo 뒤로보내기

  return (
    <div>
      {todo ? (
        <>
          <div>{todo.id}</div>
        </>
      ) : (
        <div>없음</div>
      )}
    </div>
  );
}

export default TodoDetailPage;
