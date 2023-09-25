import Root from './Root';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import TodoDetailPage from './pages/todo/TodoDetailPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ErrorComponent from './components/ErrorComponent/ErrorComponent';
import User from './pages/users/User/User';
import Followers from './pages/users/Followers/Followers';
import TodoPage from './pages/todo/TodoPage';
import TodoAddPage from './pages/todo/TodoAddPage';
import TodoHomePage from './pages/todo/TodoHomePage';

const router = createBrowserRouter([
  {
    path: '/', // 부모
    element: <Root />,
    children: [
      // /로 접근시 redirect
      {
        path: '',
        element: <Navigate replace to="todo" />,
      },
      {
        path: 'todo',
        element: <TodoPage />,
        errorElement: <ErrorComponent />,
        children: [
          {
            path: '',
            element: <TodoHomePage />,
          },
          {
            path: 'add',
            element: <TodoAddPage />,
          },
          {
            path: ':todoId',
            element: <TodoDetailPage />,
          },
        ],
      },
      { path: 'about', element: <TodoDetailPage /> },
      /**  users로 가서 뭔가를 볼수 있으면 children 방식으로 해야하지만
       * users 뒤에 꼭 id가 있어야 하지만 그렇지 않은 경우 아래 방식으로..
       * users로만 접근하면 not Found 페이지로
       */
      {
        path: 'users/:userId',
        element: <User />,
        children: [
          {
            path: 'followers',
            element: <Followers />,
          },
        ],
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

export default router;
