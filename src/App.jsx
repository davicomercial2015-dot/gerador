import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Import estático para a página inicial (acelera LCP e FCP)
import LandingPage from './pages/LandingPage';

// Import dinâmico (lazy load) para as páginas internas (isola pacotes pesados como html2canvas do bundle inicial)
const Editor = lazy(() => import('./pages/Editor'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Checkout = lazy(() => import('./pages/Checkout'));

function NotFound() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <main className="stagger-children" style={{ textAlign: 'center', maxWidth: '420px' }}>
        <div style={{ fontSize: '72px', fontWeight: '800', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '8px', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', '--i': 0 }}>
          404
        </div>
        <h1 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px', letterSpacing: '-0.01em', '--i': 1 }}>
          Página não encontrada
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px', lineHeight: 1.5, '--i': 2 }}>
          O endereço que você procura não existe ou foi movido.
        </p>
        <button onClick={() => navigate('/')} className="btn btn-primary" style={{ padding: '12px 24px', '--i': 3 }}>
          <ArrowLeft size={18} /> Voltar para o início
        </button>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div style={{ display: 'flex', height: '100vh', width: '100vw', backgroundColor: '#0f1015', alignItems: 'center', justifyContent: 'center', color: '#f8fafc', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid #8b5cf6', borderTopColor: 'transparent', borderRadius: '50%', animation: 'app-spin 1s linear infinite' }} />
            <span style={{ fontSize: '14px', color: '#94a3b8', letterSpacing: '0.01em' }}>Carregando…</span>
            <style>{`@keyframes app-spin { to { transform: rotate(360deg); } }`}</style>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
