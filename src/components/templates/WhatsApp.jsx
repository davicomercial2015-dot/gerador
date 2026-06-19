import { ChevronLeft, Plus, Sticker, Video, Phone, Send, Image as ImageIcon } from 'lucide-react';

const themeStyles = {
  light: {
    containerBg: '#efeef4',
    bgImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
    bgFilter: 'opacity(0.08)',
    headerBg: '#f6f6f6',
    headerBorder: '#d1d1d6',
    textMain: '#000',
    textSecondary: '#8e8e93',
    bubbleIn: '#ffffff',
    bubbleOut: '#DCF7C5',
    bubbleText: '#000',
    bubbleTime: 'rgba(0, 0, 0, 0.4)',
    bubbleTimeOut: 'rgba(0, 0, 0, 0.4)',
    dateBadgeBg: 'rgba(142, 142, 147, 0.18)',
    dateBadgeText: '#8e8e93',
    inputBg: '#ffffff',
    inputBorder: '#d1d1d6',
    statusBarText: '#000',
    iconColor: '#007aff',
    micBg: '#00a884',
    batteryBg: '#000',
    batteryOutline: 'rgba(0,0,0,0.35)'
  },
  dark: {
    containerBg: '#0b141a',
    bgImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")',
    bgFilter: 'invert(1) opacity(0.06)',
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
    iconColor: '#007aff',
    micBg: '#00a884',
    batteryBg: '#fff',
    batteryOutline: '#fff'
  }
};

const WhatsApp = ({ data }) => {
  const theme = data.waTheme === 'light' ? themeStyles.light : themeStyles.dark;
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', backgroundColor: theme.containerBg, color: theme.textMain }}>
      
      {/* iOS Status Bar (Fake) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 20px 8px 20px', fontSize: '12px', fontWeight: '500', backgroundColor: theme.headerBg, color: theme.statusBarText, zIndex: 10 }}>
        <div style={{ display: 'flex', gap: '4px' }}>
          <span>{data.waCarrier ?? 'TIM 4G'}</span>
        </div>
        <span>{data.time || '12:00'}</span>
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          <span>{data.battery || '43'}%</span>
          <div style={{ width: '22px', height: '11px', border: `1px solid ${theme.batteryOutline}`, borderRadius: '3px', position: 'relative' }}>
            <div style={{ width: `${data.battery || 43}%`, height: '100%', backgroundColor: theme.batteryBg, borderRadius: '1px' }}></div>
            <div style={{ position: 'absolute', right: '-3px', top: '3px', width: '2px', height: '3px', backgroundColor: theme.batteryBg, borderRadius: '1px' }}></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div style={{ 
        backgroundColor: theme.headerBg, 
        padding: '8px 16px', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px',
        borderBottom: `1px solid ${theme.headerBorder}`,
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: theme.iconColor, marginLeft: '-8px' }}>
          <ChevronLeft size={28} />
          <span style={{ fontSize: '17px', marginLeft: '-6px' }}>{data.waUnreadCount ?? '12'}</span>
        </div>
        
        {data.avatar ? (
          <img 
            src={data.avatar} 
            alt="Profile" 
            style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} 
            crossOrigin="anonymous"
          />
        ) : (
          <div style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '50%', 
            backgroundColor: data.waTheme === 'light' ? '#e5e5ea' : '#2c2c2e', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: theme.textSecondary,
            border: `1px solid ${theme.headerBorder}`,
            flexShrink: 0
          }}>
            <ImageIcon size={18} />
          </div>
        )}
        
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, marginLeft: '4px', minWidth: 0 }}>
          <span style={{ 
            fontSize: '16px', 
            fontWeight: '600', 
            color: theme.textMain,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {data.name} {data.waIsMe !== false ? '(Você)' : ''}
          </span>
          <span style={{ 
            fontSize: '13px', 
            color: theme.textSecondary,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>{data.waStatus ?? ''}</span>
        </div>

        <div style={{ display: 'flex', gap: '16px', color: theme.iconColor, alignItems: 'center' }}>
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
        backgroundColor: theme.containerBg,
        overflowY: 'hidden'
      }}>
        
        {/* Absolute Background Doodle */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: theme.bgImage,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: theme.bgFilter,
          zIndex: 0,
          pointerEvents: 'none'
        }} />

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
          {/* Date badge */}
          <div style={{ alignSelf: 'center', backgroundColor: theme.dateBadgeBg, color: theme.dateBadgeText, fontSize: '12px', padding: '6px 14px', borderRadius: '12px', marginBottom: '16px', boxShadow: data.waTheme === 'light' ? '0 1px 1px rgba(0,0,0,0.05)' : 'none' }}>
            HOJE
          </div>

          {data.messages.map((msg, index) => {
            const isSameSender = index > 0 && data.messages[index-1].type === msg.type;
            const hasImage = !!msg.image;
            const hasText = !!msg.text && msg.text.trim().length > 0;

            return (
              <div key={msg.id} style={{
                backgroundColor: msg.type === 'in' ? theme.bubbleIn : theme.bubbleOut,
                padding: hasImage && !hasText ? '5px' : '7px 10px 8px 12px',
                borderRadius: msg.type === 'in' ? (isSameSender ? '8px' : '0 8px 8px 8px') : (isSameSender ? '8px' : '8px 0 8px 8px'),
                maxWidth: '85%',
                alignSelf: msg.type === 'in' ? 'flex-start' : 'flex-end',
                position: 'relative',
                marginBottom: '8px',
                color: theme.bubbleText,
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
                marginTop: isSameSender ? '2px' : '8px'
              }}>
                {/* Tail for bubble */}
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
                        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.9)' }}>{msg.time}</span>
                        {msg.type === 'out' && (
                          <svg viewBox="0 0 16 15" width="16" height="15" fill="#3497F9"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.32.32 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"/></svg>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {hasText && (
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                    <div style={{ fontSize: '15px', lineHeight: '1.35', wordBreak: 'break-word', flex: 1, paddingRight: '12px' }}>
                      {msg.text.includes('http') ? (
                        <span style={{ color: data.waTheme === 'light' ? '#007aff' : '#53bdeb', textDecoration: 'underline' }}>{msg.text}</span>
                      ) : (
                        msg.text
                      )}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '4px', marginTop: '-2px', flexShrink: 0 }}>
                      <span style={{ fontSize: '11px', color: msg.type === 'in' ? theme.bubbleTime : theme.bubbleTimeOut }}>{msg.time}</span>
                      {msg.type === 'out' && (
                        <svg viewBox="0 0 16 15" width="16" height="15" fill="#3497F9"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.32.32 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"/></svg>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

        </div>
      </div>

      {/* Input Area */}
      <div style={{ padding: '8px 12px', backgroundColor: theme.headerBg, display: 'flex', alignItems: 'center', gap: '12px', zIndex: 10 }}>
        <Plus size={28} color={theme.iconColor} />
        <div style={{ 
          flex: 1, 
          backgroundColor: theme.inputBg, 
          borderRadius: '20px', 
          padding: '6px 12px', 
          color: theme.textMain, 
          fontSize: '15px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '36px',
          border: `1px solid ${theme.inputBorder}`
        }}>
          <span style={{ color: theme.textSecondary }}></span>
          <Sticker size={20} color={theme.iconColor} />
        </div>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: theme.micBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '4px' }}>
          <Send size={18} color={theme.containerBg} style={{ marginLeft: '-2px' }} />
        </div>
      </div>
    </div>
  );
};

export default WhatsApp;
