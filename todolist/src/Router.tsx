import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import TodoDetailPage from './pages/TodoDetailPage/TodoDetailPage';
function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<TodoDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
