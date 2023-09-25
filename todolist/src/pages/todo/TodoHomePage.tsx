import styled from 'styled-components';
import { Checkbox, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getTodos } from '../../service/firebase';
import { Todo } from '../../shared/interfaces/todo.interface';
import { useAtom } from 'jotai';
import { todosAtom } from '../../store/todo.store';

function TodoHomePage() {
  const [readyToRender, setReadyToRender] = useState<boolean>(false);
  const [todos, setTodos] = useAtom(todosAtom);

  useEffect(() => {
    getTodos().then((todos: Array<Todo>) => setTodos(todos));

    setReadyToRender(true);
  }, []);

  const checkboxChangeHandler = (todo: Todo) => {
    /**
     * Todo : FB에 저장할 때 set으로 해서 id 지정하기
     * Todo : 그 id로 update
     */
  };

  return (
    <Wrapper className={!readyToRender ? 'isRendering' : ''}>
      {readyToRender ? (
        todos.map((todo, index) => {
          return (
            <TodoBox key={index}>
              <Checkbox
                colorScheme="red"
                isChecked={todo.isDone}
                onChange={() => {
                  checkboxChangeHandler(todo);
                }}
              >
                {todo.todo}
              </Checkbox>
            </TodoBox>
          );
        })
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &.isRendering {
    justify-content: center;
    align-items: center;
  }
`;

const TodoBox = styled.div`
  width: 100%;
  height: fit-content;
  border-radius: 16px;
  padding: 16px;
  border: 1px solid #242424;
  background: #fff;
  cursor: pointer;

  &:hover {
    filter: brightness(0.95);
  }
`;

export default TodoHomePage;
