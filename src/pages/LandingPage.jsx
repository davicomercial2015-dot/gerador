import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Camera, MessageSquare, Zap, Shield, CheckCircle2, ArrowRight, Check } from 'lucide-react';
import { API_URL } from '../config';

export default function LandingPage() {
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Find the width of one item. Since they might be 40% or 100%, we scroll by one clientWidth or item width.
          // In CSS scroll-snap, scrolling by a fraction will snap to the next item automatically.
          carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleStart = () => {
    navigate('/login');
  };

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
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#fff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 5%', borderBottom: '1px solid #1e293b' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '24px', fontWeight: 'bold' }}>
          <img src="/download.svg" alt="Logo" style={{ width: '32px', height: '32px' }} />
          Depo Fast
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button onClick={() => {
            document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
          }} style={{ background: 'transparent', border: 'none', color: '#cbd5e1', cursor: 'pointer', fontWeight: '500', fontSize: '16px' }}>
            Planos
          </button>
          <button onClick={handleStart} style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '8px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = '#2563eb'} onMouseOut={e => e.currentTarget.style.background = '#3b82f6'}>
            Entrar
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 5%', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '24px' }}>
          <Zap size={16} /> Aprovado por mais de 10.000 marqueteiros
        </div>
        
        <h1 style={{ fontSize: 'clamp(36px, 8vw, 64px)', fontWeight: '800', lineHeight: '1.1', marginBottom: '24px', background: 'linear-gradient(to right, #ffffff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Provas sociais ultra-realistas<br/>que disparam suas vendas.
        </h1>
        
        <p style={{ fontSize: 'clamp(16px, 4vw, 20px)', color: '#94a3b8', maxWidth: '700px', margin: '0 auto 40px auto', lineHeight: '1.5' }}>
          Gere conversas autênticas de WhatsApp, Instagram Direct e comentários de forma rápida. 100% customizável. Sem marca d'água.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <button onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', color: '#fff', border: 'none', padding: '18px 36px', fontSize: '18px', fontWeight: 'bold', borderRadius: '12px', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
            Ver Planos <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Features Showcase */}
      <section style={{ backgroundColor: '#1e293b', padding: '60px 5%', borderTop: '1px solid #334155', borderBottom: '1px solid #334155' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '16px' }}>Tudo que você precisa em um só lugar</h2>
            <p style={{ fontSize: '18px', color: '#94a3b8' }}>Diga adeus ao Photoshop. Crie em segundos diretamente do navegador.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {/* Feature 1 */}
            <div style={{ backgroundColor: '#0f172a', padding: '32px', borderRadius: '16px', border: '1px solid #334155' }}>
              <div style={{ backgroundColor: '#22c55e', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <MessageCircle size={24} color="#fff" />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>WhatsApp Perfeito</h3>
              <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>Simule conversas inteiras com suporte a envio de imagens, fotos de perfil dinâmicas e o papel de parede escuro ou claro nativo.</p>
            </div>

            {/* Feature 2 */}
            <div style={{ backgroundColor: '#0f172a', padding: '32px', borderRadius: '16px', border: '1px solid #334155' }}>
              <div style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <Camera size={24} color="#fff" />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>Instagram Direct</h3>
              <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>A interface idêntica do IG Direct. Altere seguidores, publicações, texto do botão e simule engajamento de influenciadores e clientes.</p>
            </div>

            {/* Feature 3 */}
            <div style={{ backgroundColor: '#0f172a', padding: '32px', borderRadius: '16px', border: '1px solid #334155' }}>
              <div style={{ backgroundColor: '#3b82f6', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                <MessageSquare size={24} color="#fff" />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px' }}>Comentários Múltiplos</h3>
              <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>Crie fluxos de comentários aninhados em publicações, imitando o comportamento viral do Instagram para alavancar sua autoridade.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demonstrations Gallery */}
      <section style={{ backgroundColor: '#0f172a', padding: '60px 5%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '16px' }}>Resultados tão reais que assustam</h2>
          <p style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '40px' }}>Veja o nível de detalhe dos mockups gerados pela nossa ferramenta. Você controla tudo.</p>
          
          <div 
            ref={carouselRef}
            style={{ 
            display: 'flex', 
            overflowX: 'auto', 
            scrollSnapType: 'x mandatory', 
            gap: '24px', 
            paddingBottom: '24px',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            justifyContent: 'flex-start'
          }}>
            <style>{`
              div::-webkit-scrollbar { display: none; }
              .carousel-item {
                flex: 0 0 100%;
                scroll-snap-align: center;
                display: flex;
                flex-direction: column;
                align-items: center;
                transition: transform 0.3s ease;
              }
              @media (min-width: 768px) {
                .carousel-item {
                  flex: 0 0 calc(33.333% - 16px);
                  max-width: 380px;
                }
                .carousel-wrapper {
                   justify-content: center;
                }
              }
            `}</style>
            
            <div className="carousel-item">
              <img src="/1.png" alt="Demonstração WhatsApp" style={{ width: '100%', objectFit: 'contain', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginTop: '16px' }}>WhatsApp Dark Mode</h3>
            </div>
            
            <div className="carousel-item">
              <img src="/2.png" alt="Demonstração Instagram Direct" style={{ width: '100%', objectFit: 'contain', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginTop: '16px' }}>Instagram Direct Verificado</h3>
            </div>
            
            <div className="carousel-item">
              <img src="/3.png" alt="Demonstração Comentário" style={{ width: '100%', objectFit: 'contain', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginTop: '16px' }}>Postagem de Comentário</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section on Landing Page */}
      <section id="pricing" style={{ padding: '60px 5%', backgroundColor: '#0f172a' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '40px', fontWeight: '800', marginBottom: '16px' }}>
            Escale suas Provas Sociais
          </h2>
          <p style={{ fontSize: '18px', color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>
            Comece de graça e assine um plano quando precisar de volume. Nossos limites acompanham o crescimento do seu negócio.
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
      </section>

      {/* Trust / Bottom CTA */}
      <section style={{ padding: '80px 20px', textAlign: 'center', backgroundColor: '#1e293b' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '32px' }}>100% customizável. Exportação em PNG transparente.</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}><CheckCircle2 color="#3b82f6" /> Operadora, Hora e Bateria</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}><CheckCircle2 color="#3b82f6" /> Perfis Verificados</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}><CheckCircle2 color="#3b82f6" /> Múltiplas Mensagens</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}><Shield color="#3b82f6" /> Sem Marca D'Água</div>
        </div>
        
        <button onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#fff', color: '#0f172a', border: 'none', padding: '16px 32px', fontSize: '18px', fontWeight: 'bold', borderRadius: '12px', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
          Ver Planos de Assinatura <ArrowRight size={20} />
        </button>
      </section>

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
