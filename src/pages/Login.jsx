import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, LogIn } from 'lucide-react';
import { API_URL } from '../config';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao fazer login');
      }
      
      localStorage.setItem('depofast_token', data.token);
      localStorage.setItem('depofast_user', JSON.stringify(data.user));
      navigate('/editor');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <main style={{ width: '100%', maxWidth: '400px', backgroundColor: 'var(--bg-secondary)', padding: '40px', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>
        
        <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: '32px' }}>
          <ArrowLeft size={20} /> Voltar
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: 'var(--text-primary)' }}>
            <img src="/download.svg" alt="Logo" style={{ width: '32px', height: '32px' }} />
            Depo Fast
          </div>
          <h1 style={{ color: 'var(--text-primary)', fontSize: '24px', fontWeight: 'bold' }}>Bem-vindo de volta</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '8px' }}>Entre para acessar seus mockups.</p>
        </div>

        {error && <div role="alert" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '12px', borderRadius: '8px', marginBottom: '24px', fontSize: '14px', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label htmlFor="login-email" style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>Email</label>
            <input 
              type="email" 
              id="login-email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '12px 16px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '16px' }}
            />
          </div>
          <div>
            <label htmlFor="login-password" style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>Senha</label>
            <input 
              type="password" 
              id="login-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '12px 16px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '16px' }}
            />
          </div>
          <button type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'var(--accent-primary)', color: 'var(--text-primary)', border: 'none', padding: '14px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = 'var(--accent-hover)'} onMouseOut={e => e.currentTarget.style.background = 'var(--accent-primary)'}>
            <LogIn size={20} /> Entrar
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
          Não tem uma conta? <Link to="/register" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 'bold' }}>Crie grátis</Link>
        </div>
      </main>
    </div>
  );
}
