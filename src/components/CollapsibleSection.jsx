import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const CollapsibleSection = ({ title, defaultOpen = false, children }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div style={{ marginBottom: '4px' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          background: 'none',
          border: 'none',
          padding: '8px 0',
          cursor: 'pointer',
          color: 'var(--accent-primary)',
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          fontWeight: 600,
          fontFamily: 'inherit',
          marginTop: '16px',
          marginBottom: '8px',
          borderBottom: '1px solid var(--border-color)',
          transition: 'color 0.15s ease',
        }}
      >
        {title}
        <ChevronDown
          size={14}
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.25s var(--ease-out-quart)',
          }}
        />
      </button>
      <div
        style={{
          overflow: 'hidden',
          maxHeight: isOpen ? '2000px' : '0',
          opacity: isOpen ? 1 : 0,
          transition: 'max-height 0.35s var(--ease-out-quart), opacity 0.25s var(--ease-out-quart)',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default CollapsibleSection;
