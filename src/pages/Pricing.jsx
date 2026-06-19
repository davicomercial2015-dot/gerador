import { useNavigate } from 'react-router-dom';
import { Check, Zap, ArrowLeft } from 'lucide-react';
import { API_URL } from '../config';

export default function Pricing() {
  const navigate = useNavigate();

  const handleSubscribe = async (planId) => {
    try {
      const token = localStorage.getItem('depofast_token');
      if (!token) {
        navigate(`/checkout?planId=${planId}`);
        return;
      }
      
      const response = await fetch(`${API_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ planId })
      });
      
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Erro ao gerar checkout:', err);
      alert('Houve um erro ao processar o pagamento.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', padding: '40px 6%' }}>
      
      {/* Header */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
        <button onClick={() => navigate('/editor')} style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
          <ArrowLeft size={16} /> Voltar ao Editor
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '20px', fontWeight: '700' }}>
          <img src="/download.svg" alt="Logo" style={{ width: '28px', height: '28px' }} />
          Depo Fast
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', marginBottom: '56px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(139, 92, 246, 0.08)', color: 'var(--accent-primary)', padding: '6px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: '500', marginBottom: '24px', border: '1px solid rgba(139, 92, 246, 0.15)' }}>
          <Zap size={14} /> Você atingiu o limite do plano grátis
        </div>
        <h1 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: '800', marginBottom: '12px', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          Escale suas Provas Sociais
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
          Escolha o plano ideal e continue gerando mockups que convertem.
        </p>
      </div>

      <div className="grid-3-cols stagger-children" style={{ maxWidth: '1000px', margin: '0 auto', alignItems: 'start' }}>

        {/* Plano Iniciante */}
        <div className="pricing-card" style={{ '--i': 0 }}>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', color: 'var(--text-secondary)', fontWeight: '500', marginBottom: '12px' }}>Starter</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
              <span style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>R$</span>
              <span style={{ fontSize: '40px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.03em' }}>9,90</span>
              <span style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>/mês</span>
            </div>
          </div>
          
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            <Feature text="20 depoimentos mensais" highlight />
            <Feature text="WhatsApp, Insta Direct e Comentários" />
            <Feature text="Download em Alta Qualidade (PNG)" />
            <Feature text="Sem marca d'água" />
          </ul>
          
          <button onClick={() => handleSubscribe('plan_iniciante')} style={secondaryBtnStyle}>Assinar Starter</button>
        </div>

        {/* Plano Pro (Destaque) */}
        <div className="pricing-card featured" style={{ position: 'relative', '--i': 1 }}>
          <div className="popular-badge">
            Popular
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', color: 'var(--text-primary)', fontWeight: '600', marginBottom: '12px' }}>Professional</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
              <span style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>R$</span>
              <span style={{ fontSize: '40px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.03em' }}>14,90</span>
              <span style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>/mês</span>
            </div>
          </div>
          
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            <Feature text="50 depoimentos mensais" highlight />
            <Feature text="Todos os templates desbloqueados" />
            <Feature text="Download em Alta Qualidade (PNG)" />
            <Feature text="Sem marca d'água" />
            <Feature text="Suporte prioritário" />
          </ul>
          
          <button onClick={() => handleSubscribe('plan_pro')} style={primaryBtnStyle}>Assinar Professional</button>
        </div>

        {/* Plano Agência */}
        <div className="pricing-card" style={{ '--i': 2 }}>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '16px', color: 'var(--text-secondary)', fontWeight: '500', marginBottom: '12px' }}>Scale</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
              <span style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>R$</span>
              <span style={{ fontSize: '40px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.03em' }}>19,90</span>
              <span style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>/mês</span>
            </div>
          </div>
          
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px 0', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            <Feature text="100 depoimentos mensais" highlight />
            <Feature text="Acesso antecipado a novos templates" />
            <Feature text="Download em Alta Qualidade (PNG)" />
            <Feature text="Sem marca d'água" />
            <Feature text="Suporte VIP" />
          </ul>
          
          <button onClick={() => handleSubscribe('plan_agencia')} style={secondaryBtnStyle}>Assinar Scale</button>
        </div>

      </div>
    </div>
  );
}

const Feature = ({ text, highlight }) => (
  <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: highlight ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: highlight ? '500' : 'normal' }}>
    <Check size={16} color={highlight ? 'var(--accent-primary)' : 'var(--text-muted)'} strokeWidth={2.5} />
    {text}
  </li>
);

const primaryBtnStyle = {
  background: 'var(--accent-primary)',
  color: '#fff',
  border: 'none',
  padding: '12px 20px',
  fontSize: '14px',
  fontWeight: '600',
  borderRadius: '8px',
  cursor: 'pointer',
  width: '100%',
};

const secondaryBtnStyle = {
  background: 'transparent',
  color: 'var(--text-primary)',
  border: '1px solid var(--border-color)',
  padding: '12px 20px',
  fontSize: '14px',
  fontWeight: '500',
  borderRadius: '8px',
  cursor: 'pointer',
  width: '100%',
};
