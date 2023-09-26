import { Heading } from '@chakra-ui/react';
import { Provider } from 'jotai';
import { Outlet } from 'react-router-dom';

function TodoPage() {
  return (
    <Provider>
      <Heading>ToDo 페이지</Heading>
      <Outlet />
    </Provider>
  );
}

export default TodoPage;
