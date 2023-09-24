import { Heading } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

function TodoPage() {
  return (
    <>
      <Heading>ToDo 페이지</Heading>
      <Outlet />
    </>
  );
}

export default TodoPage;
