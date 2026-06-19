import { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { Download, Smartphone } from 'lucide-react';
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
  const [toast, setToast] = useState(null); // { type: 'error'|'success', message: string }
  const toastTimerRef = useRef(null);
  const navigate = useNavigate();
  const { hasQuota, remaining, incrementQuota } = useQuota();

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const showToast = (message, type = 'error') => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ message, type });
    toastTimerRef.current = setTimeout(() => setToast(null), 4500);
  };

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
      showToast('Imagem exportada com sucesso!', 'success');
    } catch (err) {
      console.error("Erro ao exportar:", err);
      showToast('Erro ao gerar a imagem. Verifique se a URL da foto permite acesso externo (CORS).', 'error');
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
    <div className="editor-layout">
      <div className="app-container">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          data={data}
          onChange={handleDataChange}
          remaining={remaining}
          hasQuota={hasQuota}
        />

        <main className="preview-area">
          <div className="mockup-wrapper" ref={mockupRef}>
            {/* Status Bar */}
            {activeTab === 'comment' && (
              <>
                <div className="mockup-header">
                  <span>{data.time}</span>
                  <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
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

          {/* Botão Flutuante Redondo de Download (FAB) */}
          <button
            className="btn-floating"
            onClick={handleExport}
            disabled={isExporting}
            title={isExporting ? 'Gerando imagem...' : (hasQuota ? 'Exportar Imagem PNG (Alta Resolução)' : 'Assine um plano para exportar')}
            aria-label="Exportar Imagem"
          >
            {isExporting ? <span className="btn-spinner" /> : <Download size={24} />}
          </button>

          {/* Toast */}
          {toast && (
            <div
              role="status"
              aria-live="polite"
              style={{
                position: 'fixed',
                bottom: '100px',
                right: '32px',
                padding: '12px 18px',
                backgroundColor: toast.type === 'success' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                color: toast.type === 'success' ? '#22c55e' : '#ef4444',
                border: `1px solid ${toast.type === 'success' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: '500',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                zIndex: 200,
                animation: 'toastIn 0.3s var(--ease-out-quart)',
                maxWidth: '320px'
              }}
            >
              {toast.message}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Editor;
