const StatusBar = ({ carrier, time, battery, color = '#fff' }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '14px 20px 8px 20px',
      fontSize: '12px',
      fontWeight: '500',
      color,
      zIndex: 20
    }}>
      <div style={{ display: 'flex', gap: '4px' }}>
        <span>{carrier ?? 'TIM 4G'}</span>
      </div>
      <span>{time || '12:00'}</span>
      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        <span>{battery || '43'}%</span>
        <div style={{ width: '22px', height: '11px', border: `1px solid ${color}`, borderRadius: '3px', position: 'relative' }}>
          <div style={{ width: `${battery || 43}%`, height: '100%', backgroundColor: color, borderRadius: '1px' }}></div>
          <div style={{ position: 'absolute', right: '-3px', top: '3px', width: '2px', height: '3px', backgroundColor: color, borderRadius: '1px' }}></div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
