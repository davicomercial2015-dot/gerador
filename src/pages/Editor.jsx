import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import { Camera, Download, LayoutTemplate, Smartphone } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import WhatsApp from '../components/templates/WhatsApp';
import InstaDirect from '../components/templates/InstaDirect';
import InstaComment from '../components/templates/InstaComment';
import { useQuota } from '../hooks/useQuota';
import { useNavigate } from 'react-router-dom';

function Editor() {
  const [activeTab, setActiveTab] = useState('whatsapp');
  
  const [data, setData] = useState(() => {
    const savedAvatar = localStorage.getItem('mockupgen_avatar');
    const savedOwnerAvatar = localStorage.getItem('mockupgen_owner_avatar');
    return {
      name: 'Elon Musk',
      avatar: savedAvatar || `https://i.pravatar.cc/150?u=${Math.random().toString(36).substring(7)}`,
      messages: [
        { id: 1, type: 'in', text: 'Oi! Adorei a sua ferramenta de gerador de mockups!', image: null, time: '10:42' },
        { id: 2, type: 'out', text: 'Muito obrigado! Já assinou o plano PRO?', image: null, time: '10:43' }
      ],
      isVerified: true,
      waTheme: 'dark',
      waCarrier: 'TIM 4G',
      waUnreadCount: '12',
      waStatus: 'Mensagens para mim',
      waIsMe: true,
      igUsername: 'divertido_ludico',
      igFollowers: '3 M de seguidores',
      igPosts: '120 publicações',
      igButtonText: 'Ver perfil',
      igLabel: 'Instagram',
      battery: '100',
      likes: '1,234',
      postOwnerName: 'seuperfil',
      postOwnerAvatar: savedOwnerAvatar || `https://i.pravatar.cc/150?u=${Math.random().toString(36).substring(7)}`,
      postText: 'Aqui está a minha nova postagem!'
    };
  });

  const mockupRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  const navigate = useNavigate();
  const { hasQuota, remaining, incrementQuota } = useQuota();

  const handleExport = async () => {
    if (!hasQuota) {
      navigate('/pricing');
      return;
    }
    
    if (!mockupRef.current) return;
    setIsExporting(true);
    
    try {
      const canvas = await html2canvas(mockupRef.current, {
        scale: 3, // High quality
        backgroundColor: null,
        useCORS: true,
        logging: false
      });
      
      const image = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = image;
      link.download = `depoimento-${activeTab}-${Date.now()}.png`;
      link.click();
    } catch (err) {
      console.error("Erro ao exportar:", err);
      alert("Houve um erro ao gerar a imagem. Verifique se a URL da foto permite acesso externo (CORS).");
    } finally {
      setIsExporting(false);
      incrementQuota();
    }
  };

  const handleDataChange = (field, value) => {
    if (field === 'avatar') {
      try {
        localStorage.setItem('mockupgen_avatar', value);
      } catch (e) {
        console.warn('Erro ao salvar avatar no localStorage', e);
      }
    }
    if (field === 'postOwnerAvatar') {
      try {
        localStorage.setItem('mockupgen_owner_avatar', value);
      } catch (e) {
        console.warn('Erro ao salvar owner avatar no localStorage', e);
      }
    }
    setData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="app-container">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        data={data} 
        onChange={handleDataChange} 
      />
      
      <div className="preview-area">
        <div className="preview-header">
          <span className="preview-title">Visualização em Tempo Real</span>
          <div className="preview-actions">
            {hasQuota ? (
              <span className="quota-indicator">
                Você ainda tem <strong>{remaining}</strong> {remaining === 1 ? 'geração grátis' : 'gerações grátis'}
              </span>
            ) : (
              <span className="quota-indicator error">
                Limite gratuito atingido. Assine um plano para continuar.
              </span>
            )}
            <button className="btn btn-primary" onClick={handleExport} disabled={isExporting} style={{ padding: '10px 20px', fontSize: '14px', borderRadius: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Download size={16} />
              {isExporting ? 'Gerando Imagem...' : 'Exportar Imagem'}
            </button>
          </div>
        </div>
        
        <div className="mockup-wrapper" ref={mockupRef} style={{ marginTop: '50px' }}>
          {/* Status Bar */}
          {activeTab === 'comment' && (
            <>
              <div className="mockup-header">
                <span>{data.time}</span>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <Smartphone size={14} />
                  <span>{data.battery}%</span>
                </div>
              </div>
              <div className="mockup-notch"></div>
            </>
          )}
          
          {/* Mockup Content */}
          <div key={activeTab} className="mockup-content-animate" style={{ paddingTop: activeTab === 'comment' ? '44px' : '0', backgroundColor: activeTab === 'whatsapp' ? '#000' : 'var(--ig-bg)' }}>
            {activeTab === 'whatsapp' && <WhatsApp data={data} />}
            {activeTab === 'instagram' && <InstaDirect data={data} />}
            {activeTab === 'comment' && <InstaComment data={data} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editor;
