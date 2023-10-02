import './App.css';
import TopNav from './component/topnav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLandingPage from './page/landing/admin';
import NotFoundPage from './page/error/notFound';

function App() {
  return (

    <BrowserRouter>
      <TopNav/>
      <div className="container">
        <Routes>
          <Route path="/" element={<AdminLandingPage/>} />
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
