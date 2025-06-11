import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import FormPage from './pages/FormPage';
import ListPage from './pages/ListPage';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <nav style={{ padding: '1rem', background: '#eee' }}>
          <Link to="/" style={{ marginRight: '1rem' }}>Formulário</Link>
          <Link to="/lista">Listagem</Link>
        </nav>
        <Routes>
          <Route path="/" element={<FormPage />} />
          <Route path="/lista" element={<ListPage />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
