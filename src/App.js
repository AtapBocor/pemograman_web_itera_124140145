import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';
import './App.css';

function App() {
  return (
    <BookProvider>
      <BrowserRouter>
        <nav className="navbar">
          <div className="navbar-brand">
            Buku Pribadiku
          </div>

          <div className="navbar-links">
            <NavLink to="/" end>
              Beranda
            </NavLink>

            <NavLink to="/statistik">
              Statistik
            </NavLink>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/statistik" element={<Stats />} />
        </Routes>
      </BrowserRouter>
    </BookProvider>
  );
}

export default App;
