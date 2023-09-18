import Root from './Root';
import { createBrowserRouter } from 'react-router-dom';
import TodoDetailPage from './pages/TodoDetailPage/TodoDetailPage';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ErrorComponent from './components/ErrorComponent/ErrorComponent';

const router = createBrowserRouter([
  {
    path: '/', // 부모
    element: <Root />,
    children: [
      {
        path: '',
        element: <HomePage />,
        errorElement: <ErrorComponent />,
      },
      { path: 'about', element: <TodoDetailPage /> },
    ],
    errorElement: <NotFoundPage />,
  },
]);

export default router;
