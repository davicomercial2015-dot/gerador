import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import estático para a página inicial (acelera LCP e FCP)
import LandingPage from './pages/LandingPage';

// Import dinâmico (lazy load) para as páginas internas (isola pacotes pesados como html2canvas do bundle inicial)
const Editor = lazy(() => import('./pages/Editor'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Checkout = lazy(() => import('./pages/Checkout'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#0f1015', alignItems: 'center', justifyContent: 'center', color: '#f8fafc', fontFamily: 'sans-serif' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid #8b5cf6', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <span style={{ fontSize: '14px', color: '#94a3b8' }}>Carregando...</span>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
