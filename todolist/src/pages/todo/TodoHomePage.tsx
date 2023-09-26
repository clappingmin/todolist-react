import styled from 'styled-components';
import { Checkbox, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Todo } from '../../shared/interfaces/todo.interface';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  todosAtom,
  setFBTodosAtom,
  updateTodoAtom,
} from '../../store/todo.store';
import { useNavigate } from 'react-router-dom';

function TodoHomePage() {
  const navigate = useNavigate();

  const [readyToRender, setReadyToRender] = useState<boolean>(false);
  const todos = useAtomValue(todosAtom);
  const setTodosFB = useSetAtom(setFBTodosAtom);
  const updateTodos = useSetAtom(updateTodoAtom);

  useEffect(() => {
    setTodosFB();
    setReadyToRender(true);
  }, []);

  const checkboxChangeHandler = (target: Todo) => {
    try {
      const updatedTodo = { ...target, isDone: !target.isDone };
      updateTodos(updatedTodo);
    } catch (e) {}
  };

  const goToDetail = (todo: Todo) => {
    navigate(`${todo.id}`);
  };

  return (
    <Wrapper className={!readyToRender ? 'isRendering' : ''}>
      {readyToRender ? (
        todos.map((todo) => {
          return (
            <TodoBox
              key={todo.id}
              onClick={(event) => {
                goToDetail(todo);
              }}
              data-id={todo.id}
            >
              <Checkbox
                colorScheme="red"
                isChecked={todo.isDone}
                onChange={() => {
                  checkboxChangeHandler(todo);
                }}
              />
              {todo.todo}
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
  display: flex;
  align-items: center;
  gap: 16px;

  &:hover {
    filter: brightness(0.95);
  }
`;

export default TodoHomePage;
