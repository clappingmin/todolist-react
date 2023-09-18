import Root from './Root';
import { createBrowserRouter } from 'react-router-dom';
import TodoDetailPage from './pages/TodoDetailPage/TodoDetailPage';
import HomePage from './pages/HomePage/HomePage';

const router = createBrowserRouter([
  {
    path: '/', // 부모
    element: <Root />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      { path: 'about', element: <TodoDetailPage /> },
    ],
  },
]);

export default router;
