import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Camera, MessageSquare, Zap, Shield, CheckCircle2, ArrowRight, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { API_URL } from '../config';

export default function LandingPage() {
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  const handleStart = () => {
    navigate('/login');
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -carouselRef.current.clientWidth, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 10) {
        carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carouselRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' });
      }
    }
  };

  const handleSubscribe = async (planId) => {
    navigate(`/checkout?planId=${planId}`);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      
      {/* Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 5%', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '24px', fontWeight: 'bold' }}>
          <img src="/download.svg" alt="Logo" style={{ width: '32px', height: '32px' }} />
          Depo Fast
        </div>
        <nav style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button onClick={() => {
            document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
          }} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontWeight: '500', fontSize: '16px' }}>
            Planos
          </button>
          <button onClick={handleStart} style={{ background: 'var(--accent-primary)', color: 'var(--text-primary)', border: 'none', padding: '8px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = 'var(--accent-hover)'} onMouseOut={e => e.currentTarget.style.background = 'var(--accent-primary)'}>
            Entrar
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 5%', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent-primary)', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '24px' }}>
          <Zap size={16} /> Aprovado por mais de 10.000 marqueteiros
        </div>
        
        <h1 style={{ fontSize: 'clamp(36px, 8vw, 64px)', fontWeight: '800', lineHeight: '1.1', marginBottom: '24px', color: 'var(--text-primary)' }}>
          Provas sociais ultra-realistas<br/>que disparam suas vendas.
        </h1>
        
        <p style={{ fontSize: 'clamp(16px, 4vw, 20px)', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 40px auto', lineHeight: '1.5' }}>
          Gere conversas autênticas de WhatsApp, Instagram Direct e comentários de forma rápida. 100% customizável. Sem marca d'água.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <button onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)', color: 'var(--text-primary)', border: 'none', padding: '18px 36px', fontSize: '18px', fontWeight: 'bold', borderRadius: '12px', cursor: 'pointer', boxShadow: 'var(--shadow-accent)', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
            Ver Planos <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Features Showcase */}
      <section style={{ backgroundColor: 'var(--bg-secondary)', padding: '96px 5%', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '16px' }}>Tudo que você precisa em um só lugar</h2>
            <p style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>Diga adeus ao Photoshop. Crie em segundos diretamente do navegador.</p>
          </div>

          <div className="grid-3-cols">
            {/* Feature 1 */}
            <div style={{ backgroundColor: 'var(--bg-primary)', padding: '32px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ backgroundColor: '#22c55e', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <MessageCircle size={24} color="#fff" />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>WhatsApp Perfeito</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Simule conversas inteiras com suporte a envio de imagens, fotos de perfil dinâmicas e o papel de parede escuro ou claro nativo.</p>
            </div>

            {/* Feature 2 */}
            <div style={{ backgroundColor: 'var(--bg-primary)', padding: '32px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Camera size={24} color="#fff" />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Instagram Direct</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>A interface idêntica do IG Direct. Altere seguidores, publicações, texto do botão e simule engajamento de influenciadores e clientes.</p>
            </div>

            {/* Feature 3 */}
            <div style={{ backgroundColor: 'var(--bg-primary)', padding: '32px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ backgroundColor: 'var(--accent-primary)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <MessageSquare size={24} color="#fff" />
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Comentários Múltiplos</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>Crie fluxos de comentários aninhados em publicações, imitando o comportamento viral do Instagram para alavancar sua autoridade.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demonstrations Gallery */}
      <section style={{ backgroundColor: 'var(--bg-primary)', padding: '96px 5%' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', overflow: 'hidden' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '16px' }}>Resultados tão reais que assustam</h2>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '48px' }}>Veja o nível de detalhe dos mockups gerados pela nossa ferramenta. Você controla tudo.</p>
          
          <div style={{ position: 'relative', maxWidth: '400px', margin: '0 auto' }}>
            <button 
              onClick={handlePrev}
              aria-label="Anterior"
              style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, backgroundColor: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '50%', padding: '10px', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)' }}>
              <ChevronLeft size={24} />
            </button>

            <button 
              onClick={handleNext}
              aria-label="Próximo"
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, backgroundColor: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '50%', padding: '10px', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)' }}>
              <ChevronRight size={24} />
            </button>

            <button 
              onClick={handleNext}
              style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, backgroundColor: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '50%', padding: '10px', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-md)' }}>
              <ChevronRight size={24} />
            </button>

            <div 
              ref={carouselRef}
              style={{ 
              display: 'flex', 
              overflowX: 'auto', 
              scrollSnapType: 'x mandatory', 
              gap: '0px', 
              paddingBottom: '24px',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              justifyContent: 'flex-start',
              borderRadius: '16px'
            }}>
            
            <div className="carousel-item">
              <img src="/1.png" alt="Demonstração WhatsApp" loading="lazy" style={{ width: '100%', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-primary)', marginTop: '16px' }}>WhatsApp Dark Mode</h3>
            </div>
            
            <div className="carousel-item">
              <img src="/2.png" alt="Demonstração Instagram Direct" loading="lazy" style={{ width: '100%', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-primary)', marginTop: '16px' }}>Instagram Direct Verificado</h3>
            </div>
            
            <div className="carousel-item">
              <img src="/3.png" alt="Demonstração Comentário" loading="lazy" style={{ width: '100%', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.5)' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-primary)', marginTop: '16px' }}>Postagem de Comentário</h3>
            </div>
          </div>
            
            <div className="carousel-item">
              <img src="/2.png" alt="Demonstração Instagram Direct" loading="lazy" style={{ width: '100%', objectFit: 'cover', borderRadius: '16px', boxShadow: 'var(--shadow-lg)' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-primary)', marginTop: '16px' }}>Instagram Direct Verificado</h3>
            </div>
            
            <div className="carousel-item">
              <img src="/3.png" alt="Demonstração Comentário" loading="lazy" style={{ width: '100%', objectFit: 'cover', borderRadius: '16px', boxShadow: 'var(--shadow-lg)' }} />
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-primary)', marginTop: '16px' }}>Postagem de Comentário</h3>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Pricing Section on Landing Page */}
      <section id="pricing" style={{ padding: '96px 5%', backgroundColor: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: '40px', fontWeight: '800', marginBottom: '16px' }}>
            Escale suas Provas Sociais
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Comece de graça e assine um plano quando precisar de volume. Nossos limites acompanham o crescimento do seu negócio.
          </p>
        </div>

        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="grid-3-cols" style={{ alignItems: 'start' }}>
          
          {/* Plano Iniciante */}
          <div style={pricingCardStyle}>
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', fontWeight: '600', marginBottom: '8px' }}>Starter</h3>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
                <span style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '6px' }}>R$</span>
                <span style={{ fontSize: '48px', fontWeight: '800', lineHeight: '1' }}>9,90</span>
                <span style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '6px' }}>/mês</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '12px' }}>Para quem está validando as primeiras ofertas.</p>
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
          <div style={{ ...pricingCardStyle, border: '2px solid var(--accent-primary)', position: 'relative', zIndex: 1, boxShadow: 'var(--shadow-accent)' }}>
            <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--accent-primary)', color: 'var(--text-primary)', fontSize: '11px', fontWeight: 'bold', padding: '4px 14px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Mais Popular
            </div>
            
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', fontWeight: '600', marginBottom: '8px' }}>Professional</h3>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
                <span style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '6px' }}>R$</span>
                <span style={{ fontSize: '48px', fontWeight: '800', lineHeight: '1' }}>14,90</span>
                <span style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '6px' }}>/mês</span>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '12px' }}>Ideal para afiliados e produtores ativos.</p>
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
              <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', fontWeight: '600', marginBottom: '8px' }}>Scale</h3>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
                <span style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '6px' }}>R$</span>
                <span style={{ fontSize: '48px', fontWeight: '800', lineHeight: '1' }}>19,90</span>
                <span style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '6px' }}>/mês</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginTop: '12px' }}>Para operações grandes e lançamentos.</p>
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
      </section>

      {/* Trust / Bottom CTA */}
      <section style={{ padding: '80px 20px', textAlign: 'center', backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '32px' }}>100% customizável. Exportação em PNG transparente.</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}><CheckCircle2 color="var(--accent-primary)" /> Operadora, Hora e Bateria</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}><CheckCircle2 color="var(--accent-primary)" /> Perfis Verificados</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}><CheckCircle2 color="var(--accent-primary)" /> Múltiplas Mensagens</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}><Shield color="var(--accent-primary)" /> Sem Marca D'Água</div>
        </div>
        
        <button onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)', border: 'none', padding: '16px 32px', fontSize: '18px', fontWeight: 'bold', borderRadius: '12px', cursor: 'pointer', transition: 'transform 0.2s' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
          Ver Planos de Assinatura <ArrowRight size={20} />
        </button>
      </section>

    </div>
  );
}

const Feature = ({ text, highlight }) => (
  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', color: highlight ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: highlight ? '600' : 'normal' }}>
    <div style={{ backgroundColor: highlight ? 'rgba(139, 92, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)', padding: '4px', borderRadius: '50%' }}>
      <Check size={14} color={highlight ? 'var(--accent-primary)' : 'var(--text-secondary)'} strokeWidth={3} />
    </div>
    {text}
  </li>
);

const pricingCardStyle = {
  backgroundColor: 'var(--bg-secondary)',
  border: '1px solid var(--border-color)',
  borderRadius: '12px',
  padding: '32px 28px',
  display: 'flex',
  flexDirection: 'column',
};

const primaryBtnStyle = {
  background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
  color: 'var(--text-primary)',
  border: 'none',
  padding: '14px 24px',
  fontSize: '15px',
  fontWeight: '600',
  borderRadius: '8px',
  cursor: 'pointer',
  width: '100%',
  transition: 'transform 0.2s',
  boxShadow: 'var(--shadow-accent)',
};

const secondaryBtnStyle = {
  background: 'var(--bg-primary)',
  color: 'var(--text-primary)',
  border: '1px solid var(--border-color)',
  padding: '14px 24px',
  fontSize: '15px',
  fontWeight: '600',
  borderRadius: '8px',
  cursor: 'pointer',
  width: '100%',
  transition: 'background 0.2s',
};
