import { Heart, Image as ImageIcon } from 'lucide-react';
import StatusBar from '../StatusBar';

const InstaComment = ({ data }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', backgroundColor: 'var(--ig-bg)', color: 'white' }}>
      
      {/* iOS Status Bar */}
      <div style={{ backgroundColor: '#000' }}>
        <StatusBar carrier={data.waCarrier} time={data.time} battery={data.battery} color="#fff" />
      </div>
      
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '12px 16px',
        borderBottom: '1px solid #262626'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ArrowLeftIcon />
          <span style={{ fontSize: '16px', fontWeight: '600' }}>Comentários</span>
        </div>
      </div>

      {/* Post Owner (fake) */}
      <div style={{ padding: '16px', display: 'flex', gap: '12px', borderBottom: '1px solid #262626' }}>
        {data.postOwnerAvatar ? (
          <img 
            src={data.postOwnerAvatar} 
            alt="Post Owner" 
            style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} 
            crossOrigin="anonymous"
          />
        ) : (
          <div style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%', 
            backgroundColor: '#262626', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#a8a8a8',
            border: '1px solid #363636',
            flexShrink: 0
          }}>
            <ImageIcon size={14} />
          </div>
        )}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <span style={{ fontWeight: '600', fontSize: '14px' }}>{data.postOwnerName}</span>
            <span style={{ fontSize: '14px' }}>{data.postText}</span>
          </div>
          <span style={{ fontSize: '12px', color: '#A8A8A8', marginTop: '4px', display: 'block' }}>2 h</span>
        </div>
      </div>

      {/* Comments Area */}
      <div style={{ padding: '16px', display: 'flex', gap: '12px', flex: 1 }}>
        {data.avatar ? (
          <img
            src={data.avatar}
            alt="Profile"
            style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
            crossOrigin="anonymous"
          />
        ) : (
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#262626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#a8a8a8',
            border: '1px solid #363636',
            flexShrink: 0
          }}>
            <ImageIcon size={14} />
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span style={{ fontWeight: '600', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              {data.name}
              {data.isVerified && (
                <svg aria-label="Verificado" color="#0095f6" fill="#0095f6" height="12" role="img" viewBox="0 0 40 40" width="12">
                  <title>Verificado</title>
                  <path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fillRule="evenodd"></path>
                </svg>
              )}
            </span>
            <span style={{ fontSize: '12px', color: '#A8A8A8' }}>2 m</span>
          </div>
          <div style={{
            fontSize: '14px',
            marginTop: '4px',
            wordBreak: 'break-word',
            lineHeight: '1.4',
            color: (data.messages[0]?.text || '').trim() ? 'white' : '#6b6b6b',
            fontStyle: (data.messages[0]?.text || '').trim() ? 'normal' : 'italic'
          }}>
            {(data.messages[0]?.text || '').trim() || 'Adicione um comentário no painel ao lado…'}
          </div>
          {(data.messages[0]?.text || '').trim() && (
            <div style={{ display: 'flex', gap: '16px', marginTop: '8px', color: '#A8A8A8', fontSize: '12px', fontWeight: '500' }}>
              <span>Responder</span>
              <span>Enviar</span>
              <span>{data.likes} curtidas</span>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
          <Heart size={14} color={(data.messages[0]?.text || '').trim() ? '#ed4956' : '#A8A8A8'} fill={(data.messages[0]?.text || '').trim() ? '#ed4956' : 'none'} />
        </div>
      </div>

      {/* Input Fake */}
      <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid #262626' }}>
        {data.postOwnerAvatar ? (
          <img 
            src={data.postOwnerAvatar} 
            alt="Post Owner Input" 
            style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} 
            crossOrigin="anonymous"
          />
        ) : (
          <div style={{ 
            width: '32px', 
            height: '32px', 
            borderRadius: '50%', 
            backgroundColor: '#262626', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#a8a8a8',
            border: '1px solid #363636',
            flexShrink: 0
          }}>
            <ImageIcon size={14} />
          </div>
        )}
        <span style={{ color: '#A8A8A8', fontSize: '14px', flex: 1 }}>Adicione um comentário...</span>
        <span style={{ color: '#0095f6', fontSize: '14px', fontWeight: '600', opacity: 0.5 }}>Publicar</span>
      </div>

    </div>
  );
};

const ArrowLeftIcon = () => (
  <svg aria-label="Voltar" color="white" fill="white" height="24" role="img" viewBox="0 0 24 24" width="24">
    <title>Voltar</title>
    <path d="M21 11.75H5.31l6.83-6.82a.75.75 0 1 0-1.06-1.06l-8.1 8.11a.75.75 0 0 0 0 1.06l8.11 8.11a.75.75 0 1 0 1.06-1.06l-6.83-6.83H21a.75.75 0 0 0 0-1.5Z"></path>
  </svg>
);

export default InstaComment;
