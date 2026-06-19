import { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MessageSquare, Zap, Shield, CheckCircle2, ArrowRight, Check, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

export default function LandingPage() {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 3;
  const autoplayRef = useRef(null);

  const featuresRef = useReveal();
  const galleryRef = useReveal();
  const pricingRef = useReveal();
  const trustRef = useReveal();

  const handleStart = () => {
    navigate('/login');
  };

  const goToSlide = useCallback((index) => {
    if (!carouselRef.current) return;
    const clamped = ((index % totalSlides) + totalSlides) % totalSlides;
    carouselRef.current.scrollTo({ left: clamped * carouselRef.current.clientWidth, behavior: 'smooth' });
    setActiveSlide(clamped);
  }, [totalSlides]);

  const handlePrev = () => goToSlide(activeSlide - 1);
  const handleNext = () => goToSlide(activeSlide + 1);

  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      goToSlide(activeSlide + 1);
    }, 4000);
    return () => clearInterval(autoplayRef.current);
  }, [activeSlide, goToSlide]);

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

      {/* Hero Section — split layout */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(48px, 8vh, 100px) 20px', display: 'flex', alignItems: 'center', gap: '48px', flexWrap: 'wrap' }} className="stagger-children">
        
        {/* Left: Copy */}
        <div style={{ flex: '1 1 380px', minWidth: '280px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(139, 92, 246, 0.08)', color: 'var(--accent-primary)', padding: '6px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: '500', marginBottom: '24px', border: '1px solid rgba(139, 92, 246, 0.15)', '--i': 0 }}>
            <Zap size={14} /> Aprovado por +10.000 marqueteiros
          </div>

          <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: '800', lineHeight: '1.1', marginBottom: '16px', color: 'var(--text-primary)', letterSpacing: '-0.025em', '--i': 1 }}>
            Provas sociais que disparam suas vendas.
          </h1>

          <p style={{ fontSize: 'clamp(15px, 2vw, 17px)', color: 'var(--text-secondary)', maxWidth: '440px', lineHeight: '1.6', marginBottom: '32px', '--i': 2 }}>
            Gere conversas de WhatsApp, Instagram Direct e comentários com aparência real. 100% customizável. Sem marca d'água.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', '--i': 3 }}>
            <button onClick={handleStart} className="cta-hover" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--accent-primary)', color: '#fff', border: 'none', padding: '14px 28px', fontSize: '15px', fontWeight: '600', borderRadius: '8px', cursor: 'pointer' }}>
              Começar Grátis <ArrowRight size={18} />
            </button>
            <button onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-color)', padding: '14px 28px', fontSize: '15px', fontWeight: '500', borderRadius: '8px', cursor: 'pointer' }}>
              Ver Planos
            </button>
          </div>
        </div>

        {/* Right: Product preview */}
        <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'center', '--i': 2 }}>
          <img
            src="/1.png"
            alt="Preview do mockup WhatsApp"
            className="hero-mockup"
            style={{
              width: '260px',
              borderRadius: '16px',
              boxShadow: '0 24px 48px -12px rgba(0,0,0,0.6), 0 0 48px -12px oklch(55% 0.25 285 / 0.12)',
              display: 'block',
              transform: 'rotate(-3deg)',
              animation: 'heroFloat 5s ease-in-out infinite',
            }}
          />
        </div>
      </section>

      {/* Features Showcase */}
      <section ref={featuresRef} className="reveal" style={{ backgroundColor: 'var(--bg-secondary)', padding: 'clamp(48px, 8vh, 80px) 20px', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="grid-3-cols stagger-children">
            <div className="feature-card" style={{ '--i': 0 }}>
              <div style={{ backgroundColor: '#22c55e', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <MessageCircle size={20} color="#fff" />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px', letterSpacing: '-0.01em' }}>WhatsApp Perfeito</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5', fontSize: '14px', margin: 0 }}>Conversas com papel de parede, status, operadora e bateria reais.</p>
            </div>

            <div className="feature-card" style={{ '--i': 1 }}>
              <div style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Camera size={20} color="#fff" />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px', letterSpacing: '-0.01em' }}>Instagram Direct</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5', fontSize: '14px', margin: 0 }}>Perfil verificado, seguidores e botão "Ver perfil" idênticos ao real.</p>
            </div>

            <div className="feature-card" style={{ '--i': 2 }}>
              <div style={{ backgroundColor: 'var(--accent-primary)', width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <MessageSquare size={20} color="#fff" />
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px', letterSpacing: '-0.01em' }}>Comentários</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5', fontSize: '14px', margin: 0 }}>Múltiplos comentários com likes e respostas como no Instagram real.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demonstrations Gallery — auto-carousel */}
      <section ref={galleryRef} className="reveal" style={{ backgroundColor: 'var(--bg-primary)', padding: 'clamp(48px, 8vh, 80px) 20px' }}>
        <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: '800', marginBottom: '32px', letterSpacing: '-0.02em' }}>Resultados que assustam</h2>
          
          <div style={{ position: 'relative' }}>
            <button onClick={handlePrev} aria-label="Anterior" className="carousel-arrow carousel-arrow-left">
              <ChevronLeft size={20} />
            </button>
            <button onClick={handleNext} aria-label="Próximo" className="carousel-arrow carousel-arrow-right">
              <ChevronRight size={20} />
            </button>

            <div 
              ref={carouselRef}
              className="carousel-scroll"
              onScroll={(e) => {
                const idx = Math.round(e.target.scrollLeft / e.target.clientWidth);
                if (idx !== activeSlide) setActiveSlide(idx);
              }}
              style={{ 
                display: 'flex', 
                overflowX: 'auto', 
                scrollSnapType: 'x mandatory', 
                gap: '0px',
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                borderRadius: '12px'
              }}>
              {[{ src: '/1.png', label: 'WhatsApp Dark' }, { src: '/2.png', label: 'IG Direct Verificado' }, { src: '/3.png', label: 'Comentário' }].map((slide, i) => (
                <div key={i} className="carousel-item">
                  <img src={slide.src} alt={slide.label} loading={i === 0 ? 'eager' : 'lazy'} style={{ width: '100%', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 8px 24px -4px rgba(0,0,0,0.4)' }} />
                  <p style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-secondary)', marginTop: '14px' }}>{slide.label}</p>
                </div>
              ))}
            </div>

            {/* Dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  aria-label={`Slide ${i + 1}`}
                  style={{
                    width: i === activeSlide ? '24px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    border: 'none',
                    background: i === activeSlide ? 'var(--accent-primary)' : 'var(--border-strong)',
                    cursor: 'pointer',
                    transition: 'all 0.3s var(--ease-out-quart)',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" ref={pricingRef} className="reveal" style={{ padding: 'clamp(48px, 8vh, 80px) 20px', backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: '800', marginBottom: '8px', letterSpacing: '-0.02em' }}>
            Escale suas Provas Sociais
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '440px', margin: '0 auto' }}>
            Comece de graça. Assine quando precisar de volume.
          </p>
        </div>

        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div className="grid-3-cols stagger-children" style={{ alignItems: 'start' }}>
          
          {/* Starter */}
          <div className="pricing-card" style={{ '--i': 0 }}>
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', fontWeight: '600' }}>Para testar</span>
              <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', fontWeight: '700', marginTop: '4px', marginBottom: '8px' }}>Starter</h3>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>R$</span>
                <span style={{ fontSize: '36px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.03em' }}>9,90</span>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>/mês</span>
              </div>
            </div>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              <Feature text="20 depoimentos/mês" highlight />
              <Feature text="WhatsApp, Direct e Comentários" />
              <Feature text="Download PNG alta qualidade" />
              <Feature text="Sem marca d'água" />
            </ul>
            
            <button onClick={() => handleSubscribe('plan_iniciante')} style={secondaryBtnStyle}>Começar</button>
          </div>

          {/* Professional */}
          <div className="pricing-card featured" style={{ position: 'relative', '--i': 1 }}>
            <div className="popular-badge">Popular</div>
            
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--accent-primary)', fontWeight: '600' }}>Para vender</span>
              <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', fontWeight: '700', marginTop: '4px', marginBottom: '8px' }}>Professional</h3>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>R$</span>
                <span style={{ fontSize: '36px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.03em' }}>14,90</span>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>/mês</span>
              </div>
            </div>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              <Feature text="50 depoimentos/mês" highlight />
              <Feature text="Todos os templates" highlight />
              <Feature text="Download PNG alta qualidade" />
              <Feature text="Sem marca d'água" />
              <Feature text="Suporte prioritário" />
            </ul>
            
            <button onClick={() => handleSubscribe('plan_pro')} style={primaryBtnStyle}>Assinar agora</button>
          </div>

          {/* Scale */}
          <div className="pricing-card" style={{ '--i': 2 }}>
            <div style={{ marginBottom: '16px' }}>
              <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', fontWeight: '600' }}>Para agências</span>
              <h3 style={{ fontSize: '18px', color: 'var(--text-primary)', fontWeight: '700', marginTop: '4px', marginBottom: '8px' }}>Scale</h3>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>R$</span>
                <span style={{ fontSize: '36px', fontWeight: '800', lineHeight: '1', letterSpacing: '-0.03em' }}>19,90</span>
                <span style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '6px' }}>/mês</span>
              </div>
            </div>
            
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              <Feature text="100 depoimentos/mês" highlight />
              <Feature text="Novos templates primeiro" />
              <Feature text="Download PNG alta qualidade" />
              <Feature text="Sem marca d'água" />
              <Feature text="Suporte VIP" />
            </ul>
            
            <button onClick={() => handleSubscribe('plan_agencia')} style={secondaryBtnStyle}>Assinar</button>
          </div>
        </div>
        </div>
      </section>

      {/* Trust / Bottom CTA */}
      <section ref={trustRef} className="reveal" style={{ padding: 'clamp(40px, 6vh, 64px) 20px', textAlign: 'center', backgroundColor: 'var(--bg-primary)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}><CheckCircle2 size={16} color="var(--accent-primary)" /> Operadora, Hora e Bateria</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}><CheckCircle2 size={16} color="var(--accent-primary)" /> Perfis Verificados</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}><CheckCircle2 size={16} color="var(--accent-primary)" /> Múltiplas Mensagens</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}><Shield size={16} color="var(--accent-primary)" /> Sem Marca D'Água</div>
        </div>
        
        <button onClick={handleStart} className="cta-hover" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--accent-primary)', color: '#fff', border: 'none', padding: '14px 28px', fontSize: '15px', fontWeight: '600', borderRadius: '8px', cursor: 'pointer' }}>
          Começar Agora <ArrowRight size={18} />
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
