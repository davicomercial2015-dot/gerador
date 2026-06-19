import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, Camera, MessageSquare, Zap, Shield, CheckCircle2, ArrowRight, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

export default function LandingPage() {
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  const featuresRef = useReveal();
  const galleryRef = useReveal();
  const pricingRef = useReveal();
  const trustRef = useReveal();

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
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderBottom: '1px solid var(--border-color)', gap: '12px' }}>
        <div
          onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '20px', fontWeight: '700', cursor: 'pointer', letterSpacing: '-0.01em' }}>
          <img src="/download.svg" alt="Logo" style={{ width: '28px', height: '28px' }} />
          Depo Fast
        </div>
        <nav style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })}
            className="nav-link"
          >
            Planos
          </button>
          <button
            onClick={handleStart}
            className="btn"
            style={{ padding: '8px 20px', fontWeight: '500', fontSize: '14px' }}
          >
            Entrar
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={{ maxWidth: '800px', margin: '0 auto', padding: 'clamp(60px, 10vh, 140px) 20px clamp(40px, 6vh, 100px)', textAlign: 'center' }} className="stagger-children">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(139, 92, 246, 0.08)', color: 'var(--accent-primary)', padding: '6px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: '500', marginBottom: '32px', border: '1px solid rgba(139, 92, 246, 0.15)', '--i': 0 }}>
          <Zap size={14} /> Aprovado por +10.000 marqueteiros
        </div>

        <h1 style={{ fontSize: 'clamp(28px, 6vw, 56px)', fontWeight: '800', lineHeight: '1.1', marginBottom: '20px', color: 'var(--text-primary)', letterSpacing: '-0.025em', wordBreak: 'normal', overflowWrap: 'break-word', maxWidth: '100%', '--i': 1 }}>
          Provas sociais ultra-realistas que disparam suas vendas.
        </h1>

        <p style={{ fontSize: 'clamp(16px, 2.5vw, 18px)', color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto 48px auto', lineHeight: '1.6', '--i': 2 }}>
          Gere conversas autênticas de WhatsApp, Instagram Direct e comentários. 100% customizável. Sem marca d'água.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', '--i': 3 }}>
          <button onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })} className="cta-hover" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--accent-primary)', color: '#fff', border: 'none', padding: '14px 28px', fontSize: '15px', fontWeight: '600', borderRadius: '8px', cursor: 'pointer' }}>
            Ver Planos <ArrowRight size={18} />
          </button>
          <button onClick={handleStart} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', padding: '14px 28px', fontSize: '15px', fontWeight: '500', borderRadius: '8px', cursor: 'pointer' }}>
            Testar Grátis
          </button>
        </div>
      </section>

      {/* Features Showcase */}
      <section ref={featuresRef} className="reveal" style={{ backgroundColor: 'var(--bg-secondary)', padding: 'clamp(48px, 8vh, 100px) 20px', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: '800', marginBottom: '12px', letterSpacing: '-0.02em', textWrap: 'balance' }}>Tudo que você precisa em um só lugar</h2>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>Diga adeus ao Photoshop. Crie em segundos diretamente do navegador.</p>
          </div>

          <div className="grid-3-cols stagger-children">
            <div className="feature-card" style={{ '--i': 0 }}>
              <div style={{ backgroundColor: '#22c55e', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <MessageCircle size={20} color="#fff" />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '8px', letterSpacing: '-0.01em' }}>WhatsApp Perfeito</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.55', fontSize: '14px', margin: 0 }}>Simule conversas inteiras com suporte a envio de imagens, fotos de perfil dinâmicas e papel de parede nativo.</p>
            </div>

            <div className="feature-card" style={{ '--i': 1 }}>
              <div style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <Camera size={20} color="#fff" />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '8px', letterSpacing: '-0.01em' }}>Instagram Direct</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.55', fontSize: '14px', margin: 0 }}>Interface idêntica do IG Direct. Altere seguidores, publicações e simule engajamento de influenciadores.</p>
            </div>

            <div className="feature-card" style={{ '--i': 2 }}>
              <div style={{ backgroundColor: 'var(--accent-primary)', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <MessageSquare size={20} color="#fff" />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '8px', letterSpacing: '-0.01em' }}>Comentários Múltiplos</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.55', fontSize: '14px', margin: 0 }}>Crie fluxos de comentários aninhados que imitam o comportamento viral do Instagram.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demonstrations Gallery */}
      <section ref={galleryRef} className="reveal" style={{ backgroundColor: 'var(--bg-primary)', padding: 'clamp(48px, 8vh, 100px) 20px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: '800', marginBottom: '12px', letterSpacing: '-0.02em', textWrap: 'balance' }}>Resultados tão reais que assustam</h2>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', marginBottom: '48px', maxWidth: '500px', margin: '0 auto 48px auto' }}>Veja o nível de detalhe dos mockups. Você controla tudo.</p>
          
          <div style={{ position: 'relative', maxWidth: '360px', margin: '0 auto' }}>
            <button
              onClick={handlePrev}
              aria-label="Demonstração anterior"
              className="carousel-arrow carousel-arrow-left"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={handleNext}
              aria-label="Próxima demonstração"
              className="carousel-arrow carousel-arrow-right"
            >
              <ChevronRight size={20} />
            </button>

            <div 
              ref={carouselRef}
              className="carousel-scroll"
              style={{ 
              display: 'flex', 
              overflowX: 'auto', 
              scrollSnapType: 'x mandatory', 
              gap: '0px', 
              paddingBottom: '20px',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              justifyContent: 'flex-start',
              borderRadius: '12px'
            }}>
            
            <div className="carousel-item">
              <img src="/1.png" alt="Demonstração WhatsApp" loading="lazy" style={{ width: '100%', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 8px 24px -4px rgba(0,0,0,0.4)' }} />
              <p style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-secondary)', marginTop: '14px' }}>WhatsApp Dark Mode</p>
            </div>
            
            <div className="carousel-item">
              <img src="/2.png" alt="Demonstração Instagram Direct" loading="lazy" style={{ width: '100%', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 8px 24px -4px rgba(0,0,0,0.4)' }} />
              <p style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-secondary)', marginTop: '14px' }}>Instagram Direct Verificado</p>
            </div>
            
            <div className="carousel-item">
              <img src="/3.png" alt="Demonstração Comentário" loading="lazy" style={{ width: '100%', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 8px 24px -4px rgba(0,0,0,0.4)' }} />
              <p style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-secondary)', marginTop: '14px' }}>Postagem de Comentário</p>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" ref={pricingRef} className="reveal" style={{ padding: 'clamp(48px, 8vh, 100px) 20px', backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', marginBottom: '56px' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 36px)', fontWeight: '800', marginBottom: '12px', letterSpacing: '-0.02em' }}>
            Escale suas Provas Sociais
          </h2>
          <p style={{ fontSize: '16px', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
            Comece de graça. Assine quando precisar de volume.
          </p>
        </div>

        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="grid-3-cols stagger-children" style={{ alignItems: 'start' }}>
          
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
      </section>

      {/* Trust / Bottom CTA */}
      <section ref={trustRef} className="reveal" style={{ padding: 'clamp(40px, 6vh, 80px) 20px', textAlign: 'center', backgroundColor: 'var(--bg-primary)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}><CheckCircle2 size={16} color="var(--accent-primary)" /> Operadora, Hora e Bateria</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}><CheckCircle2 size={16} color="var(--accent-primary)" /> Perfis Verificados</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}><CheckCircle2 size={16} color="var(--accent-primary)" /> Múltiplas Mensagens</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}><Shield size={16} color="var(--accent-primary)" /> Sem Marca D'Água</div>
        </div>
        
        <button onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })} className="cta-hover" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--accent-primary)', color: '#fff', border: 'none', padding: '14px 28px', fontSize: '15px', fontWeight: '600', borderRadius: '8px', cursor: 'pointer' }}>
          Ver Planos de Assinatura <ArrowRight size={18} />
        </button>
      </section>

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
  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
  color: '#fff',
  border: 'none',
  padding: '12px 20px',
  fontSize: '14px',
  fontWeight: '700',
  borderRadius: '8px',
  cursor: 'pointer',
  width: '100%',
  boxShadow: '0 4px 16px oklch(55% 0.25 285 / 0.35)',
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
