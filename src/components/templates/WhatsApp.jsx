import { ChevronLeft, Plus, Video, Phone, Mic, Camera, Image as ImageIcon } from 'lucide-react';
import StatusBar from '../StatusBar';

const themeStyles = {
  light: {
    containerBg: '#efeef4',
    bgImage: 'url("/wa-bg-light.png")',
    bgOpacity: '0.5',
    headerBg: '#f6f6f6',
    headerBorder: '#d1d1d6',
    textMain: '#000',
    textSecondary: '#8e8e93',
    bubbleIn: '#ffffff',
    bubbleOut: '#DCF7C5',
    bubbleText: '#000',
    bubbleTime: 'rgba(0, 0, 0, 0.4)',
    bubbleTimeOut: 'rgba(0, 0, 0, 0.4)',
    dateBadgeBg: '#d1e4f0',
    dateBadgeText: '#4b5563',
    inputBg: '#ffffff',
    inputBorder: '#d1d1d6',
    statusBarText: '#000',
    iconColor: '#3b82f6',
    batteryBg: '#000',
    batteryOutline: 'rgba(0,0,0,0.35)',
    footerBg: '#f6f6f6'
  },
  dark: {
    containerBg: '#0b141a',
    bgImage: 'url("/wa-bg-dark.png")',
    bgOpacity: '0.12',
    headerBg: '#121212',
    headerBorder: '#2c2c2e',
    textMain: '#fff',
    textSecondary: '#8e8e93',
    bubbleIn: '#202c33',
    bubbleOut: '#005d4b',
    bubbleText: '#fff',
    bubbleTime: 'rgba(255,255,255,0.6)',
    bubbleTimeOut: 'rgba(255,255,255,0.6)',
    dateBadgeBg: '#1c1c1e',
    dateBadgeText: '#8e8e93',
    inputBg: '#2c2c2e',
    inputBorder: '#3a3a3c',
    statusBarText: '#fff',
    iconColor: '#3b82f6',
    batteryBg: '#fff',
    batteryOutline: '#fff',
    footerBg: '#121212'
  }
};

/* Pencil/Edit icon inside the input field */
const EditIcon = () => (
  <svg style={{ width: '22px', height: '22px' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* Camera icon for the footer */
const CameraOutlineIcon = () => (
  <svg style={{ width: '28px', height: '28px' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* Microphone icon for the footer */
const MicOutlineIcon = () => (
  <svg style={{ width: '28px', height: '28px' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WhatsApp = ({ data }) => {
  const theme = data.waTheme === 'light' ? themeStyles.light : themeStyles.dark;
  const isLight = data.waTheme === 'light';
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', backgroundColor: theme.containerBg, color: theme.textMain }}>
      
      {/* iOS Status Bar (Fake) */}
      <div style={{ backgroundColor: theme.headerBg }}>
        <StatusBar carrier={data.waCarrier} time={data.time} battery={data.battery} color={theme.statusBarText} />
      </div>

      {/* Header */}
      <div style={{ 
        backgroundColor: theme.headerBg, 
        padding: '8px 12px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: `1px solid ${theme.headerBorder}`,
        zIndex: 20
      }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Back Arrow */}
          <ChevronLeft size={24} color={theme.iconColor} style={{ marginRight: '4px' }} />
          
          {/* Contact Info */}
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            {data.avatar ? (
              <img 
                src={data.avatar} 
                alt="Profile" 
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', marginRight: '12px', flexShrink: 0 }} 
                crossOrigin="anonymous"
              />
            ) : (
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                backgroundColor: isLight ? '#e5e5ea' : '#2c2c2e', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: theme.textSecondary,
                border: `1px solid ${theme.headerBorder}`,
                marginRight: '12px',
                flexShrink: 0
              }}>
                <ImageIcon size={18} />
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ 
                fontSize: '16px', 
                fontWeight: '700',
                lineHeight: '1.2',
                color: theme.textMain,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>{data.name}</span>
              <span style={{ 
                fontSize: '11px', 
                color: theme.textSecondary
              }}>{data.waStatus ?? 'toque aqui para info do contato'}</span>
            </div>
          </div>
        </div>

        {/* Header Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: theme.iconColor }}>
          <Video size={24} />
          <Phone size={22} />
        </div>
      </div>

      {/* Chat Area Container */}
      <div style={{ 
        flex: 1, 
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'hidden'
      }}>
        
        {/* WhatsApp Wallpaper Background */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: isLight ? '#e5ddd5' : '#0b141a',
          backgroundImage: theme.bgImage,
          backgroundRepeat: 'repeat',
          backgroundSize: '300px',
          opacity: theme.bgOpacity,
          zIndex: 0,
          pointerEvents: 'none'
        }} />

        {/* Chat Content */}
        <div style={{
          flex: 1,
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          zIndex: 1,
          overflowY: 'auto',
          gap: '6px',
          position: 'relative'
        }}>
          {/* Date badge */}
          <div style={{ alignSelf: 'center', backgroundColor: theme.dateBadgeBg, color: theme.dateBadgeText, fontSize: '12px', fontWeight: '500', padding: '4px 12px', borderRadius: '8px', marginBottom: '8px' }}>
            HOJE
          </div>

          {data.messages.map((msg, index) => {
            const isSameSender = index > 0 && data.messages[index-1].type === msg.type;
            const hasImage = !!msg.image;
            const hasText = !!msg.text && msg.text.trim().length > 0;

            return (
              <div key={msg.id} style={{
                display: 'flex',
                justifyContent: msg.type === 'in' ? 'flex-start' : 'flex-end',
                marginBottom: '2px'
              }}>
                <div style={{
                  backgroundColor: msg.type === 'in' ? theme.bubbleIn : theme.bubbleOut,
                  padding: hasImage && !hasText ? '5px' : '4px 12px',
                  borderRadius: '8px',
                  borderTopLeftRadius: msg.type === 'in' && !isSameSender ? '0' : '8px',
                  borderTopRightRadius: msg.type === 'out' && !isSameSender ? '0' : '8px',
                  maxWidth: '80%',
                  position: 'relative',
                  color: theme.bubbleText,
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 1px 1px rgba(0,0,0,0.08)',
                  fontSize: '14.5px',
                  lineHeight: '1.35'
                }}>
                  {/* Tail for first message in a group */}
                  {!isSameSender && (
                    <svg viewBox="0 0 8 13" width="8" height="13" style={{ position: 'absolute', top: 0, [msg.type === 'in' ? 'left' : 'right']: '-8px', fill: msg.type === 'in' ? theme.bubbleIn : theme.bubbleOut }}>
                      {msg.type === 'in' ? (
                        <path d="M1.5 0L8 0V13L1.5 6.5C0 5 0 2 1.5 0Z" />
                      ) : (
                        <path d="M6.5 0L0 0V13L6.5 6.5C8 5 8 2 6.5 0Z" />
                      )}
                    </svg>
                  )}

                  {msg.image && (
                    <div style={{ position: 'relative' }}>
                      <img src={msg.image} alt="Anexo" style={{ width: '100%', borderRadius: '6px', marginBottom: msg.text ? '4px' : '0', maxHeight: '250px', objectFit: 'cover', display: 'block' }} crossOrigin="anonymous" />
                      {!hasText && (
                        <div style={{ position: 'absolute', bottom: '6px', right: '6px', display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: 'rgba(0,0,0,0.45)', padding: '3px 7px', borderRadius: '10px' }}>
                          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.9)' }}>{msg.time}</span>
                          {msg.type === 'out' && (
                            <svg viewBox="0 0 16 15" width="16" height="15" fill="#3497F9"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.32.32 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"/></svg>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {hasText && (
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, wordBreak: 'break-word', paddingRight: '12px' }}>
                        {msg.text.includes('http') ? (
                          <span style={{ color: isLight ? '#007aff' : '#53bdeb', textDecoration: 'underline' }}>{msg.text}</span>
                        ) : (
                          msg.text
                        )}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
                        <span style={{ fontSize: '10px', color: msg.type === 'in' ? theme.bubbleTime : theme.bubbleTimeOut }}>{msg.time}</span>
                        {msg.type === 'out' && (
                          <svg viewBox="0 0 16 15" width="14" height="14" fill="#60a5fa"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.32.32 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"/></svg>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

        </div>
      </div>

      {/* Footer Input Area */}
      <div style={{ 
        padding: '8px 12px 24px 12px', 
        backgroundColor: theme.footerBg, 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px', 
        zIndex: 20 
      }}>
        {/* Plus Button */}
        <Plus size={28} color={theme.iconColor} strokeWidth={2} />
        
        {/* Input Pill */}
        <div style={{ 
          flex: 1, 
          backgroundColor: theme.inputBg, 
          border: `1px solid ${theme.inputBorder}`, 
          borderRadius: '9999px', 
          height: '36px', 
          display: 'flex', 
          alignItems: 'center', 
          paddingLeft: '16px',
          paddingRight: '8px'
        }}>
          <div style={{ flex: 1 }} />
          <div style={{ color: theme.iconColor }}>
            <EditIcon />
          </div>
        </div>

        {/* Camera Icon */}
        <div style={{ color: theme.iconColor }}>
          <CameraOutlineIcon />
        </div>

        {/* Microphone Icon */}
        <div style={{ color: theme.iconColor }}>
          <MicOutlineIcon />
        </div>
      </div>
    </div>
  );
};

export default WhatsApp;
