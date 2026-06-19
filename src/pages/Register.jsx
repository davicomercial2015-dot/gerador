import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { API_URL } from '../config';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar conta');
      }
      
      localStorage.setItem('depofast_token', data.token);
      localStorage.setItem('depofast_user', JSON.stringify(data.user));
      navigate('/editor');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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
          <h1 style={{ color: 'var(--text-primary)', fontSize: '24px', fontWeight: 'bold' }}>Crie sua conta</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '8px' }}>Crie seu acesso gratuito à plataforma.</p>
        </div>

        {error && <div role="alert" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '12px', borderRadius: '8px', marginBottom: '24px', fontSize: '14px', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label htmlFor="register-email" style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>Email</label>
            <input 
              type="email" 
              id="register-email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '12px 16px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '16px' }}
            />
          </div>
          <div>
            <label htmlFor="register-password" style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>Senha</label>
            <input 
              type="password" 
              id="register-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              style={{ width: '100%', padding: '12px 16px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '16px' }}
            />
          </div>
          <button type="submit" disabled={loading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'var(--accent-primary)', color: 'var(--text-primary)', border: 'none', padding: '14px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '8px', transition: 'background 0.2s', opacity: loading ? 0.7 : 1 }} onMouseOver={e => !loading && (e.currentTarget.style.background = 'var(--accent-hover)')} onMouseOut={e => !loading && (e.currentTarget.style.background = 'var(--accent-primary)')}>
            <UserPlus size={20} /> {loading ? 'Criando conta...' : 'Criar Conta'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
          Já tem conta? <Link to="/login" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 'bold' }}>Fazer login</Link>
        </div>
      </main>
    </div>
  );
}
