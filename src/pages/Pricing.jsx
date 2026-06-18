import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Zap, Image as ImageIcon, ArrowLeft } from 'lucide-react';
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
        window.location.href = data.url; // Redireciona para o checkout do Stripe ou url simulada
      }
    } catch (err) {
      console.error('Erro ao gerar checkout:', err);
      alert('Houve um erro ao processar o pagamento.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#fff', padding: '40px 20px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      
      {/* Header */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
        <button onClick={() => navigate('/editor')} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '16px', fontWeight: '500' }}>
          <ArrowLeft size={20} /> Voltar ao Editor
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '20px', fontWeight: 'bold' }}>
          <img src="/download.svg" alt="Logo" style={{ width: '28px', height: '28px' }} />
          Depo Fast
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', marginBottom: '60px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', padding: '6px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '24px' }}>
          <Zap size={16} /> Você atingiu o limite do plano grátis
        </div>
        <h1 style={{ fontSize: '40px', fontWeight: '800', marginBottom: '16px', background: 'linear-gradient(to right, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Escale suas Provas Sociais
        </h1>
        <p style={{ fontSize: '18px', color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
          Escolha o plano ideal para o tamanho da sua operação e continue gerando mockups ultra-realistas que convertem visitantes em clientes.
        </p>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        
        {/* Plano Iniciante */}
        <div style={pricingCardStyle}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '20px', color: '#cbd5e1', fontWeight: '600', marginBottom: '8px' }}>Starter</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
              <span style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '6px' }}>R$</span>
              <span style={{ fontSize: '48px', fontWeight: '800', lineHeight: '1' }}>9,90</span>
              <span style={{ fontSize: '16px', color: '#94a3b8', marginBottom: '6px' }}>/mês</span>
            </div>
            <p style={{ color: '#64748b', fontSize: '14px', marginTop: '12px' }}>Para quem está validando as primeiras ofertas.</p>
          </div>
          
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
            <Feature text="20 depoimentos mensais" highlight />
            <Feature text="WhatsApp, Insta Direct e Comentários" />
            <Feature text="Download em Alta Qualidade (PNG)" />
            <Feature text="Sem marca d'água" />
          </ul>
          
          <button onClick={() => handleSubscribe('plan_iniciante')} style={secondaryBtnStyle}>Assinar Starter</button>
        </div>

        {/* Plano Pro (Destaque) */}
        <div style={{ ...pricingCardStyle, border: '2px solid #3b82f6', position: 'relative', transform: 'scale(1.05)', zIndex: 1, boxShadow: '0 20px 25px -5px rgba(59, 130, 246, 0.2)' }}>
          <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#3b82f6', color: '#fff', fontSize: '12px', fontWeight: 'bold', padding: '4px 16px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Mais Popular
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '20px', color: '#fff', fontWeight: '600', marginBottom: '8px' }}>Professional</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
              <span style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '6px' }}>R$</span>
              <span style={{ fontSize: '48px', fontWeight: '800', lineHeight: '1' }}>14,90</span>
              <span style={{ fontSize: '16px', color: '#94a3b8', marginBottom: '6px' }}>/mês</span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '12px' }}>Ideal para afiliados e produtores ativos.</p>
          </div>
          
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
            <Feature text="50 depoimentos mensais" highlight />
            <Feature text="Todos os templates desbloqueados" />
            <Feature text="Download em Alta Qualidade (PNG)" />
            <Feature text="Sem marca d'água" />
            <Feature text="Suporte prioritário" />
          </ul>
          
          <button onClick={() => handleSubscribe('plan_pro')} style={primaryBtnStyle}>Assinar Professional</button>
        </div>

        {/* Plano Agência */}
        <div style={pricingCardStyle}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '20px', color: '#cbd5e1', fontWeight: '600', marginBottom: '8px' }}>Scale</h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
              <span style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '6px' }}>R$</span>
              <span style={{ fontSize: '48px', fontWeight: '800', lineHeight: '1' }}>19,90</span>
              <span style={{ fontSize: '16px', color: '#94a3b8', marginBottom: '6px' }}>/mês</span>
            </div>
            <p style={{ color: '#64748b', fontSize: '14px', marginTop: '12px' }}>Para operações grandes e lançamentos.</p>
          </div>
          
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px 0', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
            <Feature text="100 depoimentos mensais" highlight />
            <Feature text="Acesso a novos templates antecipado" />
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
  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', color: highlight ? '#fff' : '#cbd5e1', fontWeight: highlight ? '600' : 'normal' }}>
    <div style={{ backgroundColor: highlight ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)', padding: '4px', borderRadius: '50%' }}>
      <Check size={14} color={highlight ? '#60a5fa' : '#94a3b8'} strokeWidth={3} />
    </div>
    {text}
  </li>
);

const pricingCardStyle = {
  backgroundColor: '#1e293b',
  border: '1px solid #334155',
  borderRadius: '24px',
  padding: '40px 32px',
  display: 'flex',
  flexDirection: 'column',
};

const primaryBtnStyle = {
  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
  color: '#fff',
  border: 'none',
  padding: '16px',
  fontSize: '16px',
  fontWeight: 'bold',
  borderRadius: '12px',
  cursor: 'pointer',
  width: '100%',
  transition: 'transform 0.2s',
  boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)',
};

const secondaryBtnStyle = {
  background: '#0f172a',
  color: '#fff',
  border: '1px solid #334155',
  padding: '16px',
  fontSize: '16px',
  fontWeight: 'bold',
  borderRadius: '12px',
  cursor: 'pointer',
  width: '100%',
  transition: 'background 0.2s',
};
