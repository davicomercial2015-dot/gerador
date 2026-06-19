import React, { useRef } from 'react';
import { Settings, MessageCircle, Camera, MessageSquare, Upload, Plus, Trash2, Image as ImageIcon, Download } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, data, onChange, onExport }) => {
  return (
    <div className="sidebar">
      <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <img src="/download.svg" alt="Depo Fast Logo" style={{ width: '28px', height: '28px' }} />
        Depo Fast
      </div>

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
          <MessageCircle size={18} style={{ marginBottom: '4px' }} />
          <div>WhatsApp</div>
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
          <Camera size={18} style={{ marginBottom: '4px' }} />
          <div>Insta Direct</div>
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
          <MessageSquare size={18} style={{ marginBottom: '4px' }} />
          <div>Insta Comment</div>
        </div>
      </div>

      <div className="section-title">Perfil do Remetente / Comentarista</div>
      
      <div className="form-group">
        <label>Nome do Usuário</label>
        <input 
          type="text" 
          className="form-control" 
          value={data.name} 
          onChange={(e) => onChange('name', e.target.value)} 
          placeholder="Ex: Neymar Jr"
        />
      </div>

      <div className="form-group">
        <label>Foto de Perfil (URL ou Upload)</label>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <input 
            type="text" 
            className="form-control" 
            value={data.avatar} 
            onChange={(e) => onChange('avatar', e.target.value)} 
            placeholder="https://..."
            style={{ flex: 1, height: '40px' }}
          />
          <label className="btn" style={{ width: '40px', height: '40px', cursor: 'pointer', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, flexShrink: 0 }} title="Fazer Upload da Foto">
            <Upload size={16} color="var(--text-secondary)" />
            <input 
              type="file" 
              accept="image/*" 
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    onChange('avatar', event.target.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>
        </div>
      </div>

      <div className="toggle-wrapper">
        <span className="toggle-label">Conta Verificada (Selo Azul)</span>
        <label className="toggle-switch">
          <input 
            type="checkbox" 
            checked={data.isVerified} 
            onChange={(e) => onChange('isVerified', e.target.checked)} 
          />
          <span className="toggle-slider"></span>
        </label>
      </div>

      <div className="section-title">Conteúdo da Conversa</div>

      {activeTab === 'comment' ? (
        <div className="form-group">
          <label>Comentário</label>
          <textarea 
            className="form-control" 
            value={data.messages[0]?.text || ''} 
            onChange={(e) => {
              const newMsgs = [...data.messages];
              if (!newMsgs[0]) newMsgs.push({ id: Date.now(), type: 'in', text: '', image: null, time: '' });
              newMsgs[0].text = e.target.value;
              onChange('messages', newMsgs);
            }} 
            placeholder="Digite o comentário..."
          />
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
          {data.messages.map((msg, index) => (
            <div key={msg.id} style={{ backgroundColor: 'var(--bg-primary)', padding: '14px', borderRadius: '10px', border: '1px solid var(--border-color)', position: 'relative' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <select 
                  className="form-control" 
                  style={{ width: 'auto', padding: '6px 10px', fontSize: '13px' }}
                  value={msg.type}
                  onChange={(e) => {
                    const newMsgs = [...data.messages];
                    newMsgs[index].type = e.target.value;
                    onChange('messages', newMsgs);
                  }}
                >
                  <option value="in">Recebida (Esq)</option>
                  <option value="out">Enviada (Dir)</option>
                </select>

                <button 
                  style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '8px', margin: '-8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: '36px', minHeight: '36px' }}
                  onClick={() => {
                    const newMsgs = data.messages.filter(m => m.id !== msg.id);
                    onChange('messages', newMsgs);
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <textarea 
                className="form-control" 
                value={msg.text} 
                onChange={(e) => {
                  const newMsgs = [...data.messages];
                  newMsgs[index].text = e.target.value;
                  onChange('messages', newMsgs);
                }} 
                placeholder="Texto da mensagem..."
                style={{ minHeight: '56px', marginBottom: '10px' }}
              />

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input 
                  type="text" 
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

                <label className="btn" style={{ width: '36px', height: '36px', cursor: 'pointer', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, flexShrink: 0 }} title="Anexar Imagem ao Balão">
                  <ImageIcon size={16} color="var(--text-secondary)" />
                  <input 
                    type="file" 
                    accept="image/*" 
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const newMsgs = [...data.messages];
                          newMsgs[index].image = event.target.result;
                          onChange('messages', newMsgs);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </label>
                
                {msg.image && (
                  <button 
                    className="btn" 
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



      <div className="section-title">Detalhes do Aparelho</div>
      
      {activeTab === 'whatsapp' && (
        <div className="form-group">
          <label>Tema do WhatsApp</label>
          <select 
            className="form-control" 
            value={data.waTheme || 'dark'} 
            onChange={(e) => onChange('waTheme', e.target.value)}
          >
            <option value="dark">Modo Escuro (Dark)</option>
            <option value="light">Modo Claro (Light)</option>
          </select>
        </div>
      )}

      {activeTab === 'whatsapp' && (
        <>
          <div className="section-title">Cabeçalho do WhatsApp</div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Operadora</label>
              <input type="text" className="form-control" value={data.waCarrier ?? 'TIM 4G'} onChange={(e) => onChange('waCarrier', e.target.value)} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Voltar (Núm)</label>
              <input type="text" className="form-control" value={data.waUnreadCount ?? '12'} onChange={(e) => onChange('waUnreadCount', e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label>Subtítulo / Status (ex: online, digitando...)</label>
            <input type="text" className="form-control" value={data.waStatus ?? 'Mensagens para mim'} onChange={(e) => onChange('waStatus', e.target.value)} />
          </div>

          <div className="form-group">
            <label>Sufixo no Nome</label>
            <select className="form-control" value={data.waIsMe === false ? 'false' : 'true'} onChange={(e) => onChange('waIsMe', e.target.value === 'true')}>
              <option value="true">Mostrar "(Você)"</option>
              <option value="false">Nenhum (Ocultar)</option>
            </select>
          </div>
        </>
      )}

      {activeTab === 'instagram' && (
        <>
          <div className="section-title">Cabeçalho e Perfil (Instagram)</div>
          
          <div className="form-group">
            <label>@ Username (Subtítulo do Topo)</label>
            <input type="text" className="form-control" value={data.igUsername ?? 'divertido_ludico'} onChange={(e) => onChange('igUsername', e.target.value)} />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Rótulo</label>
              <input type="text" className="form-control" value={data.igLabel ?? 'Instagram'} onChange={(e) => onChange('igLabel', e.target.value)} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Texto Botão</label>
              <input type="text" className="form-control" value={data.igButtonText ?? 'Ver perfil'} onChange={(e) => onChange('igButtonText', e.target.value)} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Seguidores</label>
              <input type="text" className="form-control" value={data.igFollowers ?? '3 M de seguidores'} onChange={(e) => onChange('igFollowers', e.target.value)} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Publicações</label>
              <input type="text" className="form-control" value={data.igPosts ?? '120 publicações'} onChange={(e) => onChange('igPosts', e.target.value)} />
            </div>
          </div>
        </>
      )}

      <div style={{ display: 'flex', gap: '12px' }}>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Horário</label>
          <input 
            type="text" 
            className="form-control" 
            value={data.time} 
            onChange={(e) => onChange('time', e.target.value)} 
          />
        </div>
        <div className="form-group" style={{ flex: 1 }}>
          <label>Bateria (%)</label>
          <input 
            type="number" 
            className="form-control" 
            value={data.battery} 
            onChange={(e) => onChange('battery', e.target.value)} 
            min="1" max="100"
          />
        </div>
      </div>

      {activeTab === 'comment' && (
        <>
          <div className="section-title">Postagem Original (Seu Perfil)</div>
          
          <div className="form-group">
            <label>Nome do Seu Perfil</label>
            <input 
              type="text" 
              className="form-control" 
              value={data.postOwnerName} 
              onChange={(e) => onChange('postOwnerName', e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label>Foto do Seu Perfil (URL ou Upload)</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                className="form-control" 
                value={data.postOwnerAvatar} 
                onChange={(e) => onChange('postOwnerAvatar', e.target.value)} 
                style={{ flex: 1 }}
              />
              <label className="btn" style={{ width: '40px', height: '40px', cursor: 'pointer', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, flexShrink: 0 }} title="Fazer Upload da Foto do Post">
                <Upload size={16} color="var(--text-secondary)" />
                <input 
                  type="file" 
                  accept="image/*" 
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => onChange('postOwnerAvatar', event.target.result);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Texto da Postagem</label>
            <textarea 
              className="form-control" 
              value={data.postText} 
              onChange={(e) => onChange('postText', e.target.value)} 
              style={{ minHeight: '60px' }}
            />
          </div>

          <div className="form-group">
            <label>Número de Likes do Comentário</label>
            <input 
              type="text" 
              className="form-control" 
              value={data.likes} 
              onChange={(e) => onChange('likes', e.target.value)} 
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
