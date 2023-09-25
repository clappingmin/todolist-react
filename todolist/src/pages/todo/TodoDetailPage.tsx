import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTodoFB } from '../../service/firebase';
import { Todo } from '../../shared/interfaces/todo.interface';
import { Spinner } from '@chakra-ui/react';

function TodoDetailPage() {
  const navigate = useNavigate();
  const { todoId } = useParams();
  const [todo, setTodo] = useState<Todo>();

  useEffect(() => {
    getTodoFB(todoId).then((fetchData: Todo | null) => {
      if (!fetchData) {
        // todo 데이터 없다고 토스트 띄우기!
        navigate('/todo');
        return;
      }

      setTodo(fetchData);
    });
  }, []);
  return <>{todo ? <div>{todo.id}</div> : <Spinner />}</>;
}

export default TodoDetailPage;
