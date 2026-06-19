import { useNavigate } from 'react-router-dom';
import { MessageCircle, Camera, MessageSquare, Upload, Plus, Trash2, Image as ImageIcon, Home, CreditCard, LogOut } from 'lucide-react';
import CollapsibleSection from './CollapsibleSection';

const Sidebar = ({ activeTab, setActiveTab, data, onChange, remaining, hasQuota }) => {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      {/* Logo + Nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <img src="/download.svg" alt="Logo" style={{ width: '24px', height: '24px' }} />
          <span style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>Depo Fast</span>
        </div>
        <div style={{ display: 'flex', gap: '2px' }}>
          <button
            onClick={() => navigate('/')}
            aria-label="Início"
            className="sidebar-icon-btn"
            title="Início"
          >
            <Home size={16} />
          </button>
          <button
            onClick={() => navigate('/pricing')}
            aria-label="Planos"
            className="sidebar-icon-btn"
            title="Planos"
          >
            <CreditCard size={16} />
          </button>
          <button
            onClick={() => { localStorage.removeItem('depofast_token'); navigate('/login'); }}
            aria-label="Sair"
            className="sidebar-icon-btn"
            title="Sair"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>

      {/* Indicador de Cotas na Sidebar */}
      {hasQuota !== undefined && (
        <div style={{ marginBottom: '16px', padding: '10px 12px', borderRadius: '8px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', fontSize: '12px' }}>
          {hasQuota ? (
            <span style={{ color: 'var(--text-secondary)' }}>
              Você ainda tem <strong style={{ color: 'var(--text-primary)' }}>{remaining}</strong> {remaining === 1 ? 'geração grátis' : 'gerações grátis'}
            </span>
          ) : (
            <span style={{ color: 'var(--color-error)', fontWeight: '600' }}>
              Limite gratuito atingido. Assine um plano.
            </span>
          )}
        </div>
      )}

      <div className="tabs" role="tablist">
        <div 
          className={`tab ${activeTab === 'whatsapp' ? 'active' : ''}`}
          onClick={() => setActiveTab('whatsapp')}
          role="tab"
          aria-selected={activeTab === 'whatsapp'}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setActiveTab('whatsapp');
            }
          }}
        >
          <MessageCircle size={15} />
          <span>WhatsApp</span>
        </div>
        <div 
          className={`tab ${activeTab === 'instagram' ? 'active' : ''}`}
          onClick={() => setActiveTab('instagram')}
          role="tab"
          aria-selected={activeTab === 'instagram'}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setActiveTab('instagram');
            }
          }}
        >
          <Camera size={15} />
          <span>Direct</span>
        </div>
        <div 
          className={`tab ${activeTab === 'comment' ? 'active' : ''}`}
          onClick={() => setActiveTab('comment')}
          role="tab"
          aria-selected={activeTab === 'comment'}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setActiveTab('comment');
            }
          }}
        >
          <MessageSquare size={15} />
          <span>Comment</span>
        </div>
      </div>

      {/* Perfil do Remetente */}
      <CollapsibleSection title="Perfil do Remetente" defaultOpen={true}>
        <div className="form-group">
          <label htmlFor="user-name">Nome do Usuário</label>
          <input 
            type="text" 
            id="user-name"
            className="form-control" 
            value={data.name} 
            onChange={(e) => onChange('name', e.target.value)} 
            placeholder="Ex: Neymar Jr"
          />
        </div>

        <div className="form-group">
          <label htmlFor="user-avatar">Foto de Perfil (URL ou Upload)</label>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              type="text"
              id="user-avatar"
              className="form-control"
              value={data.avatar}
              onChange={(e) => onChange('avatar', e.target.value)}
              placeholder="https://..."
              style={{ flex: 1, height: '44px' }}
            />
            {data.avatar && (
              <button
                type="button"
                onClick={() => onChange('avatar', '')}
                aria-label="Remover foto de perfil"
                title="Remover foto"
                className="sidebar-icon-btn"
                style={{ width: '44px', height: '44px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
              >
                <Trash2 size={16} />
              </button>
            )}
            <label
              className="btn"
              style={{ width: '44px', height: '44px', cursor: 'pointer', padding: 0, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title="Fazer Upload da Foto"
              aria-label="Upload da foto de perfil"
            >
              <Upload size={16} color="var(--text-secondary)" />
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  if (!file.type.startsWith('image/')) return;
                  if (file.size > 5 * 1024 * 1024) {
                    alert('Imagem muito grande. Limite: 5MB.');
                    e.target.value = '';
                    return;
                  }
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    onChange('avatar', event.target.result);
                  };
                  reader.readAsDataURL(file);
                  e.target.value = '';
                }}
              />
            </label>
          </div>
          {/* Avatar Preview */}
          {data.avatar && (
            <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img src={data.avatar} alt="Preview" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-color)' }} crossOrigin="anonymous" />
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Pré-visualização do perfil</span>
            </div>
          )}
        </div>

        <div className="toggle-wrapper">
          <span className="toggle-label" id="verified-label">Conta Verificada (Selo Azul)</span>
          <label className="toggle-switch">
            <input 
              type="checkbox" 
              checked={data.isVerified} 
              onChange={(e) => onChange('isVerified', e.target.checked)} 
              aria-labelledby="verified-label"
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </CollapsibleSection>

      {/* Conteúdo da Conversa */}
      <CollapsibleSection title={activeTab === 'comment' ? 'Comentários' : 'Conteúdo da Conversa'} defaultOpen={true}>
        {activeTab === 'comment' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '12px' }}>
            {data.messages.map((msg, index) => (
              <div key={msg.id} className="message-card message-card-enter" style={{ '--i': Math.min(index, 5) }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-secondary)' }}>Comentário #{index + 1}</span>
                  {data.messages.length > 1 && (
                    <button 
                      aria-label={`Remover comentário ${index + 1}`}
                      className="btn"
                      style={{ width: '44px', height: '44px', padding: 0, border: '1px solid rgba(239, 68, 68, 0.2)', backgroundColor: 'rgba(239, 68, 68, 0.05)', color: '#ef4444', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                      onClick={() => {
                        const newMsgs = data.messages.filter(m => m.id !== msg.id);
                        onChange('messages', newMsgs);
                      }}
                      title="Remover Comentário"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                <textarea 
                  className="form-control" 
                  value={msg.text} 
                  onChange={(e) => {
                    const newMsgs = [...data.messages];
                    newMsgs[index].text = e.target.value;
                    onChange('messages', newMsgs);
                  }} 
                  placeholder="Digite o comentário..."
                  style={{ minHeight: '48px' }}
                />
              </div>
            ))}
            <button 
              className="btn btn-primary" 
              onClick={() => {
                const newMsgs = [...data.messages, { id: Date.now(), type: 'in', text: '', image: null, time: '' }];
                onChange('messages', newMsgs);
              }}
              style={{ width: '100%' }}
            >
              <Plus size={18} /> Adicionar Comentário
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '12px' }}>
            {data.messages.map((msg, index) => (
              <div key={msg.id} className="message-card message-card-enter" style={{ position: 'relative', '--i': Math.min(index, 5) }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-secondary)' }}>Mensagem #{index + 1}</span>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <select 
                      className="form-control" 
                      style={{ width: 'auto', padding: '4px 8px', fontSize: '12px', height: '32px' }}
                      value={msg.type}
                      aria-label={`Tipo da mensagem ${index + 1}`}
                      onChange={(e) => {
                        const newMsgs = [...data.messages];
                        newMsgs[index].type = e.target.value;
                        onChange('messages', newMsgs);
                      }}
                    >
                      <option value="in">Recebida</option>
                      <option value="out">Enviada</option>
                    </select>

                    <button 
                      aria-label={`Remover mensagem ${index + 1}`}
                      className="btn"
                      style={{ width: '44px', height: '44px', padding: 0, border: '1px solid rgba(239, 68, 68, 0.2)', backgroundColor: 'rgba(239, 68, 68, 0.05)', color: '#ef4444', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                      onClick={() => {
                        const newMsgs = data.messages.filter(m => m.id !== msg.id);
                        onChange('messages', newMsgs);
                      }}
                      title="Remover Mensagem"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <label htmlFor={`msg-text-${msg.id}`} style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
                  Texto da mensagem {index + 1}
                </label>
                <textarea 
                  className="form-control" 
                  id={`msg-text-${msg.id}`}
                  value={msg.text} 
                  onChange={(e) => {
                    const newMsgs = [...data.messages];
                    newMsgs[index].text = e.target.value;
                    onChange('messages', newMsgs);
                  }} 
                  placeholder="Texto da mensagem..."
                  style={{ minHeight: '56px' }}
                />

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <label htmlFor={`msg-time-${msg.id}`} style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>
                    Horário da mensagem {index + 1}
                  </label>
                  <input 
                    type="text" 
                    id={`msg-time-${msg.id}`}
                    className="form-control" 
                    value={msg.time} 
                    onChange={(e) => {
                      const newMsgs = [...data.messages];
                      newMsgs[index].time = e.target.value;
                      onChange('messages', newMsgs);
                    }}
                    placeholder="Horário (10:42)"
                    style={{ flex: 1, height: '36px' }}
                  />

                  <label
                    className="btn"
                    style={{ width: '36px', height: '36px', cursor: 'pointer', padding: 0, flexShrink: 0 }}
                    title="Anexar Imagem ao Balão"
                    aria-label={`Anexar imagem à mensagem ${index + 1}`}
                  >
                    <ImageIcon size={15} color="var(--text-secondary)" />
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        if (!file.type.startsWith('image/')) return;
                        if (file.size > 5 * 1024 * 1024) {
                          alert('Imagem muito grande. Limite: 5MB.');
                          e.target.value = '';
                          return;
                        }
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const newMsgs = [...data.messages];
                          newMsgs[index].image = event.target.result;
                          onChange('messages', newMsgs);
                        };
                        reader.readAsDataURL(file);
                        e.target.value = '';
                      }}
                    />
                  </label>
                  
                  {msg.image && (
                    <button 
                      className="btn" 
                      aria-label={`Remover imagem da mensagem ${index + 1}`}
                      style={{ width: '36px', height: '36px', backgroundColor: '#ef444420', borderColor: '#ef444440', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
                      onClick={() => {
                        const newMsgs = [...data.messages];
                        newMsgs[index].image = null;
                        onChange('messages', newMsgs);
                      }}
                      title="Remover Imagem"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>

                {/* Image Preview */}
                {msg.image && (
                  <div style={{ marginTop: '8px', position: 'relative', display: 'inline-block' }}>
                    <img src={msg.image} alt={`Anexo da mensagem ${index + 1}`} style={{ width: '100%', maxHeight: '100px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--border-color)' }} crossOrigin="anonymous" />
                  </div>
                )}
              </div>
            ))}

            <button 
              className="btn btn-primary" 
              onClick={() => {
                const newMsgs = [...data.messages, { id: Date.now(), type: 'in', text: '', image: null, time: '12:00' }];
                onChange('messages', newMsgs);
              }}
              style={{ width: '100%' }}
            >
              <Plus size={18} /> Adicionar Mensagem
            </button>
          </div>
        )}
      </CollapsibleSection>

      {/* Detalhes do Aparelho */}
      <CollapsibleSection title="Detalhes do Aparelho" defaultOpen={false}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="device-time">Horário</label>
            <input 
              type="text" 
              id="device-time"
              className="form-control" 
              value={data.time} 
              onChange={(e) => onChange('time', e.target.value)} 
            />
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="device-battery">Bateria (%)</label>
            <input 
              type="number" 
              id="device-battery"
              className="form-control" 
              value={data.battery} 
              onChange={(e) => onChange('battery', e.target.value)} 
              min="1" max="100"
            />
          </div>
        </div>
      </CollapsibleSection>

      {/* WhatsApp Header Settings */}
      {activeTab === 'whatsapp' && (
        <CollapsibleSection title="Cabeçalho do WhatsApp" defaultOpen={false}>
          <div className="form-group">
            <label htmlFor="wa-theme">Tema do WhatsApp</label>
            <select 
              className="form-control" 
              id="wa-theme"
              value={data.waTheme || 'dark'} 
              onChange={(e) => onChange('waTheme', e.target.value)}
            >
              <option value="dark">Modo Escuro (Dark)</option>
              <option value="light">Modo Claro (Light)</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="wa-carrier">Operadora</label>
              <input type="text" id="wa-carrier" className="form-control" value={data.waCarrier ?? 'TIM 4G'} onChange={(e) => onChange('waCarrier', e.target.value)} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="wa-unread">Voltar (Núm)</label>
              <input type="text" id="wa-unread" className="form-control" value={data.waUnreadCount ?? '12'} onChange={(e) => onChange('waUnreadCount', e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="wa-status">Subtítulo / Status (ex: online, digitando...)</label>
            <input type="text" id="wa-status" className="form-control" value={data.waStatus ?? 'Mensagens para mim'} onChange={(e) => onChange('waStatus', e.target.value)} />
          </div>

          <div className="form-group">
            <label htmlFor="wa-isme">Sufixo no Nome</label>
            <select className="form-control" id="wa-isme" value={data.waIsMe === false ? 'false' : 'true'} onChange={(e) => onChange('waIsMe', e.target.value === 'true')}>
              <option value="true">Mostrar "(Você)"</option>
              <option value="false">Nenhum (Ocultar)</option>
            </select>
          </div>
        </CollapsibleSection>
      )}

      {/* Instagram Header Settings */}
      {activeTab === 'instagram' && (
        <CollapsibleSection title="Cabeçalho do Instagram" defaultOpen={false}>
          <div className="toggle-wrapper">
            <span className="toggle-label" id="ig-header-label">Mostrar Perfil (foto, seguidores, botão)</span>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={data.igShowHeader !== false} 
                onChange={(e) => onChange('igShowHeader', e.target.checked)} 
                aria-labelledby="ig-header-label"
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="ig-username">@ Username (Subtítulo do Topo)</label>
            <input type="text" id="ig-username" className="form-control" value={data.igUsername ?? 'divertido_ludico'} onChange={(e) => onChange('igUsername', e.target.value)} />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="ig-label">Rótulo</label>
              <input type="text" id="ig-label" className="form-control" value={data.igLabel ?? 'Instagram'} onChange={(e) => onChange('igLabel', e.target.value)} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="ig-btn-text">Texto Botão</label>
              <input type="text" id="ig-btn-text" className="form-control" value={data.igButtonText ?? 'Ver perfil'} onChange={(e) => onChange('igButtonText', e.target.value)} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="ig-followers">Seguidores</label>
              <input type="text" id="ig-followers" className="form-control" value={data.igFollowers ?? '3 M de seguidores'} onChange={(e) => onChange('igFollowers', e.target.value)} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label htmlFor="ig-posts">Publicações</label>
              <input type="text" id="ig-posts" className="form-control" value={data.igPosts ?? '120 publicações'} onChange={(e) => onChange('igPosts', e.target.value)} />
            </div>
          </div>
        </CollapsibleSection>
      )}

      {/* Postagem Original (Comment tab) */}
      {activeTab === 'comment' && (
        <CollapsibleSection title="Postagem Original" defaultOpen={true}>
          <div className="form-group">
            <label htmlFor="post-owner-name">Nome do Seu Perfil</label>
            <input 
              type="text" 
              id="post-owner-name"
              className="form-control" 
              value={data.postOwnerName} 
              onChange={(e) => onChange('postOwnerName', e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="post-owner-avatar">Foto do Seu Perfil (URL ou Upload)</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                id="post-owner-avatar"
                className="form-control"
                value={data.postOwnerAvatar}
                onChange={(e) => onChange('postOwnerAvatar', e.target.value)}
                style={{ flex: 1 }}
              />
              {data.postOwnerAvatar && (
                <button
                  type="button"
                  onClick={() => onChange('postOwnerAvatar', '')}
                  aria-label="Remover foto do perfil"
                  title="Remover foto"
                  className="sidebar-icon-btn"
                  style={{ width: '44px', height: '44px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                >
                  <Trash2 size={16} />
                </button>
              )}
              <label
                className="btn"
                style={{ width: '44px', height: '44px', cursor: 'pointer', padding: 0, flexShrink: 0 }}
                title="Fazer Upload da Foto do Post"
                aria-label="Upload da foto do perfil"
              >
                <Upload size={16} color="var(--text-secondary)" />
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    if (!file.type.startsWith('image/')) return;
                    if (file.size > 5 * 1024 * 1024) {
                      alert('Imagem muito grande. Limite: 5MB.');
                      e.target.value = '';
                      return;
                    }
                    const reader = new FileReader();
                    reader.onload = (event) => onChange('postOwnerAvatar', event.target.result);
                    reader.readAsDataURL(file);
                    e.target.value = '';
                  }}
                />
              </label>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="post-text">Texto da Postagem</label>
            <textarea 
              className="form-control" 
              id="post-text"
              value={data.postText} 
              onChange={(e) => onChange('postText', e.target.value)} 
              style={{ minHeight: '60px' }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="post-likes">Número de Likes do Comentário</label>
            <input 
              type="text" 
              id="post-likes"
              className="form-control" 
              value={data.likes} 
              onChange={(e) => onChange('likes', e.target.value)} 
            />
          </div>
        </CollapsibleSection>
      )}
    </div>
  );
};

export default Sidebar;
