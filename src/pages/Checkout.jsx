import { useState, useEffect } from 'react';
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
        } catch {
          // Silent: poll will retry
        }
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
        <button onClick={() => navigate('/')} className="back-link">
          <ArrowLeft size={18} /> Voltar para o Início
        </button>
      </div>

      <div className="grid-2-cols" style={{ width: '100%', maxWidth: '900px' }}>

        {/* Resumo do Pedido (Esquerda) */}
        <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '40px', borderRadius: '12px', border: '1px solid var(--border-color)', height: 'fit-content' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <img src="/download.svg" alt="Depo Fast" style={{ width: '32px', height: '32px' }} />
            <h2 style={{ color: 'var(--text-primary)', fontSize: '24px', fontWeight: '700', margin: 0, letterSpacing: '-0.01em' }}>Depo Fast</h2>
          </div>

          <h3 style={{ color: 'var(--text-secondary)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px', fontWeight: '600' }}>Resumo da Compra</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '24px', borderBottom: '1px solid var(--border-color)', marginBottom: '24px' }}>
            <div>
              <div style={{ color: 'var(--text-primary)', fontSize: '20px', fontWeight: '700', letterSpacing: '-0.01em' }}>Plano {selectedPlan.name}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '4px' }}>{selectedPlan.credits} gerações por mês</div>
            </div>
            <div style={{ color: 'var(--text-primary)', fontSize: '24px', fontWeight: '800', letterSpacing: '-0.02em' }}>{selectedPlan.price}</div>
          </div>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
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
            <h2 style={{ color: 'var(--text-primary)', fontSize: '24px', fontWeight: '700', marginBottom: '8px', letterSpacing: '-0.01em' }}>Finalizar Compra</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.5 }}>Crie seu acesso abaixo para prosseguir para o pagamento seguro no Mercado Pago.</p>
          </div>

          {error && (
            <div role="alert" className="alert alert-error">
              {error}
            </div>
          )}

          {pixData ? (
            <div style={{ textAlign: 'center' }}>
              <div className="alert alert-success">
                ✓ Conta criada! Pague o Pix abaixo para liberar.
              </div>
              <div style={{ backgroundColor: 'white', padding: '16px', borderRadius: '16px', display: 'inline-block', margin: '0 auto 16px auto' }}>
                <img
                  src={`data:image/jpeg;base64,${pixData.qr_code_base64}`}
                  alt="QR Code Pix"
                  style={{ width: '200px', height: '200px', display: 'block', borderRadius: '8px' }}
                />
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '16px' }}>Ou copie o código (Pix Copia e Cola):</p>

              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  readOnly
                  value={pixData.qr_code}
                  onClick={e => e.target.select()}
                  className="form-control"
                  style={{ flex: 1, fontSize: '12px', fontFamily: 'monospace' }}
                />
                <button
                  onClick={copyPix}
                  className="btn"
                  style={{
                    backgroundColor: copied ? '#22c55e' : 'var(--accent-primary)',
                    color: 'white',
                    border: 'none',
                    padding: '0 16px',
                    fontWeight: '600',
                    transition: 'background-color 0.2s var(--ease-out-quart)'
                  }}
                >
                  {copied ? <><Check size={16} /> Copiado!</> : <><Copy size={16} /> Copiar</>}
                </button>
              </div>

              <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                <span className="btn-spinner" style={{ borderColor: 'var(--accent-primary)', borderTopColor: 'transparent' }} />
                Aguardando confirmação do pagamento…
              </div>
            </div>
          ) : (
            <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {!isLoggedIn && (
                <>
                  <div className="form-group">
                    <label htmlFor="checkout-email">E-mail de Acesso</label>
                    <input
                      type="email"
                      id="checkout-email"
                      className="form-control"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      autoComplete="email"
                      placeholder="Para onde enviaremos seu acesso?"
                      style={{ padding: '12px 14px', fontSize: '15px' }}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="checkout-password">Criar Senha</label>
                    <input
                      type="password"
                      id="checkout-password"
                      className="form-control"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      minLength={6}
                      autoComplete="new-password"
                      placeholder="Mínimo 6 caracteres"
                      style={{ padding: '12px 14px', fontSize: '15px' }}
                    />
                  </div>
                </>
              )}

              {isLoggedIn && (
                <div className="alert alert-info">
                  Você já está logado! Clique abaixo para gerar o Pix e assinar o <b>Plano {selectedPlan.name}</b>.
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ padding: '16px', fontSize: '16px', marginTop: '8px', width: '100%' }}
              >
                {loading ? <><span className="btn-spinner" /> Gerando Pix…</> : <><CreditCard size={20} /> Gerar Pix</>}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '12px', marginTop: '4px' }}>
                <Lock size={13} /> Pagamento 100% seguro via Mercado Pago
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
