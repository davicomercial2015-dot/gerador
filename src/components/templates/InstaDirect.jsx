import { ChevronLeft, ChevronRight, Phone, Video, Mic, Image as ImageIcon, PlusCircle } from 'lucide-react';
import StatusBar from '../StatusBar';

const VerifiedIcon = () => (
  <svg aria-label="Verificado" color="#0095f6" fill="#0095f6" height="14" role="img" viewBox="0 0 40 40" width="14">
    <title>Verificado</title>
    <path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z" fillRule="evenodd"></path>
  </svg>
);



const CameraIcon = () => (
  <svg style={{ width: '18px', height: '18px' }} fill="white" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" strokeLinecap="round" strokeLinejoin="round" fill="#4950E4" />
    <path d="M18.75 10.5h.008v.008h-.008V10.5z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const InstaDirect = ({ data }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', backgroundColor: '#000000', color: '#fff' }}>
      
      {/* iOS Status Bar (Fake) */}
      <div style={{ backgroundColor: '#000000' }}>
        <StatusBar carrier={data.waCarrier} time={data.time} battery={data.battery} color="#fff" />
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
        
        {data.avatar ? (
          <img 
            src={data.avatar} 
            alt="Profile" 
            style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} 
            crossOrigin="anonymous"
          />
        ) : (
          <div style={{ 
            width: '36px', 
            height: '36px', 
            borderRadius: '50%', 
            backgroundColor: '#262626', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#a8a8a8',
            border: '1px solid #363636',
            flexShrink: 0
          }}>
            <ImageIcon size={16} />
          </div>
        )}
        
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

        <div style={{ display: 'flex', gap: '16px', color: '#fff', alignItems: 'center' }}>
          <Phone size={22} />
          <Video size={24} />
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
          overflowY: 'auto',
          gap: '4px'
        }}>
          
          {/* Middle Profile Section */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px', marginTop: '16px' }}>
            <div style={{ position: 'relative' }}>
              {data.avatar ? (
                <img 
                  src={data.avatar} 
                  alt="Profile Big" 
                  style={{ width: '96px', height: '96px', borderRadius: '50%', objectFit: 'cover', marginBottom: '12px' }} 
                  crossOrigin="anonymous"
                />
              ) : (
                <div style={{ 
                  width: '96px', 
                  height: '96px', 
                  borderRadius: '50%', 
                  backgroundColor: '#262626', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: '#a8a8a8',
                  border: '1px solid #363636',
                  marginBottom: '12px'
                }}>
                  <ImageIcon size={40} />
                </div>
              )}
            </div>
            <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{data.name}</span>
            <div style={{ fontSize: '14px', color: '#a8a8a8', marginTop: '2px', marginBottom: '4px' }}>
              {data.igLabel ?? 'Instagram'}
            </div>
            <div style={{ fontSize: '13px', color: '#a8a8a8', marginBottom: '16px' }}>
              {data.igFollowers ?? '3 M de seguidores'} · {data.igPosts ?? '120 publicações'}
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
            
            return (
              <div key={msg.id} style={{ 
                display: 'flex', 
                alignItems: 'flex-end', 
                gap: '8px', 
                marginBottom: isSameSenderAsNext ? '2px' : '8px',
                flexDirection: msg.type === 'in' ? 'row' : 'row-reverse'
              }}>
                {/* Avatar: shown only on last bubble of a group for incoming messages */}
                {msg.type === 'in' && !isSameSenderAsNext && (
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, marginBottom: '2px' }}>
                    {data.avatar ? (
                      <img
                        src={data.avatar}
                        alt="Profile"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        crossOrigin="anonymous"
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#262626',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#a8a8a8',
                        border: '1px solid #363636'
                      }}>
                        <ImageIcon size={10} />
                      </div>
                    )}
                  </div>
                )}
                {/* Spacer for incoming messages without avatar */}
                {msg.type === 'in' && isSameSenderAsNext && (
                  <div style={{ width: '24px', flexShrink: 0 }} />
                )}

                {/* Message Bubble */}
                <div style={{
                  backgroundColor: msg.image && !msg.text ? 'transparent' : (msg.type === 'in' ? '#262626' : '#A855F7'),
                  padding: msg.image && !msg.text ? '0' : '8px 16px',
                  borderRadius: msg.type === 'in' ? '20px' : '20px',
                  borderBottomLeftRadius: msg.type === 'in' ? '6px' : '20px',
                  borderBottomRightRadius: msg.type === 'in' ? '20px' : '6px',
                  maxWidth: '75%',
                  fontSize: '14px',
                  lineHeight: '1.4',
                  color: 'white',
                  wordBreak: 'break-word',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}>
                  {msg.image && (
                    <img src={msg.image} alt="Anexo" style={{ width: '100%', borderRadius: msg.text ? '18px 18px 4px 4px' : '20px', marginBottom: msg.text ? '8px' : '0', maxHeight: '250px', objectFit: 'cover', display: 'block' }} crossOrigin="anonymous" />
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
      <div style={{ padding: '12px 12px 32px 12px', backgroundColor: '#000000', zIndex: 10 }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          backgroundColor: '#121212', 
          border: '1px solid #262626', 
          borderRadius: '9999px', 
          padding: '6px 16px 6px 6px'
        }}>
          {/* Camera Button inside input */}
          <div style={{ 
            width: '28px', 
            height: '28px', 
            borderRadius: '50%', 
            backgroundColor: '#4950E4', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginRight: '8px', 
            flexShrink: 0
          }}>
            <CameraIcon />
          </div>

          {/* Placeholder text */}
          <div style={{ flex: 1, fontSize: '14px', color: '#6b7280' }}>
            Mensagem...
          </div>

          {/* Right icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#e5e7eb' }}>
            <Mic size={20} />
            <ImageIcon size={20} />
            <PlusCircle size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstaDirect;
