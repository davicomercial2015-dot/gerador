import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Lock, CheckCircle2, CreditCard, Copy, Check } from 'lucide-react';
import { API_URL } from '../config';

export default function Checkout() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pixData, setPixData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('depofast_token'));
  const isLoggedIn = !!token;
  
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const planId = queryParams.get('planId') || 'plan_iniciante';

  const planDetails = {
    plan_iniciante: { name: 'Starter', price: 'R$ 9,90', credits: 20 },
    plan_pro: { name: 'Professional', price: 'R$ 14,90', credits: 50 },
    plan_agencia: { name: 'Scale', price: 'R$ 19,90', credits: 100 }
  };

  const selectedPlan = planDetails[planId] || planDetails['plan_iniciante'];

  useEffect(() => {
    let interval;
    if (pixData) {
      interval = setInterval(async () => {
        try {
          const token = localStorage.getItem('depofast_token');
          if (!token) return;
          const res = await fetch(`${API_URL}/api/me`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            const data = await res.json();
            if (data.plan !== 'free' || data.credits_remaining > 0) {
              clearInterval(interval);
              navigate('/editor');
            }
          }
        } catch (err) {}
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [pixData, navigate]);

  const copyPix = () => {
    if (pixData && pixData.qr_code) {
      navigator.clipboard.writeText(pixData.qr_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCheckout = async (e) => {
    if (e) e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      let currentToken = token;

      if (!currentToken) {
        const response = await fetch(`${API_URL}/api/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Erro ao preparar checkout');
        }
        
        localStorage.setItem('depofast_token', data.token);
        localStorage.setItem('depofast_user', JSON.stringify(data.user));
        currentToken = data.token;
        setToken(currentToken);
      }
      
      const checkoutResponse = await fetch(`${API_URL}/api/create-pix-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentToken}`
        },
        body: JSON.stringify({ planId })
      });

      const checkoutData = await checkoutResponse.json();
      
      if (checkoutData.qr_code_base64) {
        setPixData(checkoutData);
        setLoading(false);
      } else {
        throw new Error(checkoutData.error || 'Erro ao gerar código Pix do Mercado Pago');
      }

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px' }}>
      
      <div style={{ width: '100%', maxWidth: '900px', marginBottom: '24px' }}>
        <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <ArrowLeft size={20} /> Voltar para o Início
        </button>
      </div>

      <div className="grid-2-cols" style={{ width: '100%', maxWidth: '900px' }}>
        
        {/* Resumo do Pedido (Esquerda) */}
        <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '40px', borderRadius: '12px', border: '1px solid var(--border-color)', height: 'fit-content' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <img src="/download.svg" alt="Depo Fast" style={{ width: '32px', height: '32px' }} />
            <h2 style={{ color: 'var(--text-primary)', fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Depo Fast</h2>
          </div>
          
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Resumo da Compra</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '24px', borderBottom: '1px solid var(--border-color)', marginBottom: '24px' }}>
            <div>
              <div style={{ color: 'var(--text-primary)', fontSize: '20px', fontWeight: 'bold' }}>Plano {selectedPlan.name}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>{selectedPlan.credits} gerações/mês</div>
            </div>
            <div style={{ color: 'var(--text-primary)', fontSize: '24px', fontWeight: '800' }}>{selectedPlan.price}</div>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)', fontSize: '15px' }}>
              <CheckCircle2 size={18} color="#22c55e" /> Liberação imediata após o pagamento
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)', fontSize: '15px' }}>
              <CheckCircle2 size={18} color="#22c55e" /> Acesso ao gerador sem marca d'água
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)', fontSize: '15px' }}>
              <CheckCircle2 size={18} color="#22c55e" /> Imagens em altíssima resolução (PNG)
            </li>
          </ul>
        </div>

        {/* Formulário de Cadastro e Pagamento (Direita) */}
        <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '40px', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ color: 'var(--text-primary)', fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Finalizar Compra</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Crie seu acesso abaixo para prosseguir para o pagamento seguro no Mercado Pago.</p>
          </div>

          {error && <div role="alert" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '12px', borderRadius: '8px', marginBottom: '24px', fontSize: '14px', textAlign: 'center' }}>{error}</div>}

          {pixData ? (
            <div style={{ textAlign: 'center' }}>
              <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', padding: '12px', borderRadius: '8px', marginBottom: '24px', fontSize: '14px', fontWeight: 'bold' }}>
                ✓ Conta criada! Pague o Pix abaixo para liberar.
              </div>
              <img 
                src={`data:image/jpeg;base64,${pixData.qr_code_base64}`} 
                alt="QR Code Pix" 
                style={{ width: '200px', height: '200px', borderRadius: '16px', margin: '0 auto 24px auto', display: 'block', border: '4px solid #fff' }} 
              />
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>Ou copie o código (Pix Copia e Cola):</p>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="text" 
                  readOnly 
                  value={pixData.qr_code} 
                  style={{ flex: 1, padding: '12px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-muted)', fontSize: '12px' }}
                />
                <button onClick={copyPix} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: copied ? '#22c55e' : 'var(--accent-primary)', color: 'var(--text-primary)', border: 'none', padding: '0 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }}>
                  {copied ? <Check size={18} /> : <Copy size={18} />} {copied ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
              
              <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                <div style={{ width: '16px', height: '16px', border: '2px solid var(--accent-primary)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                Aguardando confirmação do pagamento...
              </div>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          ) : (
            <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {!isLoggedIn && (
                <>
                  <div>
                    <label htmlFor="checkout-email" style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>E-mail de Acesso</label>
                    <input 
                      type="email" 
                      id="checkout-email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      placeholder="Para onde enviaremos seu acesso?"
                      style={{ width: '100%', padding: '14px 16px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-primary)', fontSize: '16px' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-password" style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '8px' }}>Criar Senha</label>
                    <input 
                      type="password" 
                      id="checkout-password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      minLength={6}
                      placeholder="Mínimo 6 caracteres"
                      style={{ width: '100%', padding: '14px 16px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '12px', color: 'var(--text-primary)', fontSize: '16px' }}
                    />
                  </div>
                </>
              )}
              
              {isLoggedIn && (
                <div style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent-primary)', padding: '16px', borderRadius: '12px', fontSize: '15px', textAlign: 'center', marginBottom: '8px' }}>
                  Você já está logado! Clique abaixo para gerar o Pix e assinar o <b>Plano {selectedPlan.name}</b>.
                </div>
              )}
              
              <button type="submit" disabled={loading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)', color: 'var(--text-primary)', border: 'none', padding: '18px', borderRadius: '12px', fontSize: '18px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '16px', transition: 'transform 0.2s', boxShadow: 'var(--shadow-accent)', opacity: loading ? 0.7 : 1 }} onMouseOver={e => !loading && (e.currentTarget.style.transform = 'scale(1.02)')} onMouseOut={e => !loading && (e.currentTarget.style.transform = 'scale(1)')}>
                <CreditCard size={24} /> {loading ? 'Gerando Pix...' : 'Gerar Pix'}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '12px', marginTop: '8px' }}>
                <Lock size={14} /> Pagamento 100% seguro via Mercado Pago
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
