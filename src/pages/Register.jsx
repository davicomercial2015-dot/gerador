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
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#1e293b', padding: '40px', borderRadius: '16px', border: '1px solid #334155', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}>
        
        <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', marginBottom: '32px' }}>
          <ArrowLeft size={20} /> Voltar
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#fff' }}>
            <img src="/download.svg" alt="Logo" style={{ width: '32px', height: '32px' }} />
            Depo Fast
          </div>
          <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold' }}>Crie sua conta</h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '8px' }}>Crie seu acesso gratuito à plataforma.</p>
        </div>

        {error && <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '12px', borderRadius: '8px', marginBottom: '24px', fontSize: '14px', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '14px', marginBottom: '8px' }}>Email</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '12px 16px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '16px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', color: '#cbd5e1', fontSize: '14px', marginBottom: '8px' }}>Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
              style={{ width: '100%', padding: '12px 16px', backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '8px', color: '#fff', fontSize: '16px' }}
            />
          </div>
          <button type="submit" disabled={loading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#3b82f6', color: '#fff', border: 'none', padding: '14px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '8px', transition: 'background 0.2s', opacity: loading ? 0.7 : 1 }} onMouseOver={e => !loading && (e.currentTarget.style.background = '#2563eb')} onMouseOut={e => !loading && (e.currentTarget.style.background = '#3b82f6')}>
            <UserPlus size={20} /> {loading ? 'Criando conta...' : 'Criar Conta'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#94a3b8' }}>
          Já tem conta? <Link to="/login" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: 'bold' }}>Fazer login</Link>
        </div>
      </div>
    </div>
  );
}
