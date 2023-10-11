import { Heading } from '@chakra-ui/react';
import { Provider } from 'jotai';
import { Outlet } from 'react-router-dom';

function TodoPage() {
  return (
    // store 범위 지정
    <Provider>
      <Outlet />
    </Provider>
  );
}

export default TodoPage;
