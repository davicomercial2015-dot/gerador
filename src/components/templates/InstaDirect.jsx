import React from 'react';
import { ChevronLeft, ChevronRight, Phone, Video, Mic, Image as ImageIcon, Smile, Plus, Camera } from 'lucide-react';

const VerifiedIcon = () => (
  <svg aria-label="Verificado" color="#0095f6" fill="#0095f6" height="12" role="img" viewBox="0 0 40 40" width="12">
    <title>Verificado</title>
    <path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fillRule="evenodd"></path>
  </svg>
);

const InstaDirect = ({ data }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', backgroundColor: '#000000', color: '#fff' }}>
      
      {/* iOS Status Bar (Fake) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 20px 8px 20px', fontSize: '12px', fontWeight: '500', backgroundColor: '#000000', color: '#fff', zIndex: 10 }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          <span>{data.waCarrier ?? 'TIM 4G'}</span>
        </div>
        <span>{data.time || '12:00'}</span>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <span>{data.battery || '43'}%</span>
          <div style={{ width: '22px', height: '11px', border: '1px solid #fff', borderRadius: '3px', position: 'relative' }}>
            <div style={{ width: `${data.battery || 43}%`, height: '100%', backgroundColor: '#fff', borderRadius: '1px' }}></div>
            <div style={{ position: 'absolute', right: '-3px', top: '3px', width: '2px', height: '3px', backgroundColor: '#fff', borderRadius: '1px' }}></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div style={{ 
        backgroundColor: '#000000', 
        padding: '8px 16px', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '16px',
        borderBottom: '1px solid #262626',
        zIndex: 10
      }}>
        <ChevronLeft size={30} color="#fff" style={{ marginLeft: '-8px' }} />
        
        <img 
          src={data.avatar} 
          alt="Profile" 
          style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} 
          crossOrigin="anonymous"
        />
        
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ 
              fontSize: '16px', 
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>{data.name}</span>
            {data.isVerified && <div style={{ flexShrink: 0, display: 'flex' }}><VerifiedIcon /></div>}
            <ChevronRight size={16} color="#a8a8a8" style={{ flexShrink: 0 }} />
          </div>
          <span style={{ 
            fontSize: '13px', 
            color: '#a8a8a8',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>{data.igUsername ?? 'Online há 3 h'}</span>
        </div>

        <div style={{ display: 'flex', gap: '20px', color: '#fff' }}>
          {/* Group icon fake */}
          <div style={{ position: 'relative', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px' }}>
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
          </div>
          <Phone size={24} />
          <Video size={26} />
        </div>
      </div>

      {/* Chat Area Container */}
      <div style={{ 
        flex: 1, 
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#000000',
        overflowY: 'hidden'
      }}>
        
        {/* Chat Content */}
        <div style={{
          flex: 1,
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          zIndex: 1,
          overflowY: 'auto'
        }}>
          
          {/* Middle Profile Section (Optional) */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px', marginTop: '16px' }}>
            <div style={{ position: 'relative' }}>
              <img 
                src={data.avatar} 
                alt="Profile Big" 
                style={{ width: '96px', height: '96px', borderRadius: '50%', objectFit: 'cover', marginBottom: '12px' }} 
                crossOrigin="anonymous"
              />
            </div>
            <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{data.name}</span>
            <div style={{ fontSize: '14px', color: '#a8a8a8', marginTop: '2px', marginBottom: '4px' }}>
              {data.igLabel ?? 'Instagram'}
            </div>
            <div style={{ fontSize: '13px', color: '#a8a8a8', marginBottom: '16px' }}>
              {data.igFollowers ?? '3 M de seguidores'} • {data.igPosts ?? '120 publicações'}
            </div>
            <div style={{ 
              backgroundColor: '#262626', 
              padding: '6px 16px', 
              borderRadius: '8px', 
              fontSize: '14px', 
              fontWeight: 'bold'
            }}>
              {data.igButtonText ?? 'Ver perfil'}
            </div>
          </div>

          {/* Time Badge */}
          <div style={{ alignSelf: 'center', color: '#a8a8a8', fontSize: '12px', marginBottom: '24px' }}>
            Hoje às {data.time}
          </div>

          {/* Messages */}
          {data.messages.map((msg, index) => {
            const isSameSenderAsNext = data.messages[index+1] && data.messages[index+1].type === msg.type;
            const isSameSenderAsPrev = index > 0 && data.messages[index-1].type === msg.type;
            
            return (
              <div key={msg.id} style={{ 
                display: 'flex', 
                alignItems: 'flex-end', 
                gap: '8px', 
                marginBottom: isSameSenderAsNext ? '2px' : '16px',
                flexDirection: msg.type === 'in' ? 'row' : 'row-reverse'
              }}>
                {msg.type === 'in' && (
                  <div style={{ width: '28px', height: '28px' }}>
                    {!isSameSenderAsNext && (
                      <img 
                        src={data.avatar} 
                        alt="Profile" 
                        style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} 
                        crossOrigin="anonymous"
                      />
                    )}
                  </div>
                )}
                <div style={{ 
                  backgroundColor: msg.image && !msg.text ? 'transparent' : (msg.type === 'in' ? '#262626' : '#3797f0'), 
                  padding: msg.image && !msg.text ? '0' : '12px 16px', 
                  borderRadius: msg.type === 'in' ? '22px' : '22px', 
                  maxWidth: '75%', 
                  fontSize: '15px',
                  lineHeight: '1.4',
                  color: 'white',
                  wordBreak: 'break-word',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}>
                  {msg.image && (
                    <img src={msg.image} alt="Anexo" style={{ width: '100%', borderRadius: msg.text ? '18px 18px 4px 4px' : '22px', marginBottom: msg.text ? '8px' : '0', maxHeight: '250px', objectFit: 'cover' }} crossOrigin="anonymous" />
                  )}
                  {msg.text && (
                    <span style={{ padding: msg.image ? '0 4px 4px 4px' : '0' }}>{msg.text}</span>
                  )}
                </div>
              </div>
            );
          })}

        </div>
      </div>

      {/* Input Area */}
      <div style={{ padding: '8px 16px', backgroundColor: '#000000', display: 'flex', alignItems: 'center', gap: '12px', zIndex: 10, paddingBottom: '20px' }}>
        
        {/* Blue Camera Icon */}
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#5c33ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Camera size={20} color="#fff" fill="#fff" />
        </div>

        {/* Input Pill */}
        <div style={{ 
          flex: 1, 
          backgroundColor: '#262626', 
          borderRadius: '24px', 
          padding: '10px 16px', 
          color: '#fff', 
          fontSize: '15px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <span style={{ color: '#a8a8a8' }}>Mensagem...</span>
        </div>

        {/* Right Icons */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', color: '#fff' }}>
          <Mic size={24} />
          <ImageIcon size={24} />
          <Smile size={24} />
          <Plus size={24} />
        </div>
      </div>
    </div>
  );
};

export default InstaDirect;
