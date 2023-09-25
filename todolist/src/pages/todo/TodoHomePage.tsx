import styled from 'styled-components';
import { Checkbox, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { getTodosFB, updateTodoFB } from '../../service/firebase';
import { Todo } from '../../shared/interfaces/todo.interface';
import { useAtom } from 'jotai';
import { todosAtom } from '../../store/todo.store';

function TodoHomePage() {
  const [readyToRender, setReadyToRender] = useState<boolean>(false);
  const [todos, setTodos] = useAtom(todosAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newTodos = await getTodosFB();
        setTodos(newTodos);
        setReadyToRender(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const checkboxChangeHandler = (target: Todo) => {
    try {
      const updatedTodos = todos.map((todo, index) => {
        if (todo.id === target.id) return { ...todo, isDone: !todo.isDone };

        return todo;
      });

      updateTodoFB({ ...target, isDone: !target.isDone });

      setTodos(updatedTodos);
    } catch (e) {}
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
