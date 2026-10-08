import React from 'react';
import { useTimer } from '../hooks/useTimer';

interface TimerProps {
  style?: React.CSSProperties;
  showLabel?: boolean;
}

export const Timer: React.FC<TimerProps> = ({ style, showLabel = true }) => {
  const { formatted, isExpired, timeLeft } = useTimer();

  const urgentColor =
    timeLeft < 30 * 60 * 1000
      ? '#dc3545'
      : timeLeft < 60 * 60 * 1000
      ? '#ff9800'
      : '#222';

  return (
    <div
      style={{
        display: 'inline-block',
        textAlign: 'center',
        ...style,
      }}
    >
      {showLabel && (
        <div style={{ fontSize: '10px', color: '#888', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '2px' }}>
          Time Remaining
        </div>
      )}
      <div
        style={{
          fontSize: '28px',
          fontFamily: 'monospace',
          fontWeight: 700,
          color: isExpired ? '#dc3545' : urgentColor,
          letterSpacing: '2px',
          border: '1px solid #ddd',
          padding: '4px 12px',
          background: '#f9f9f9',
          borderRadius: '2px',
          minWidth: '120px',
        }}
      >
        {isExpired ? 'TIME UP' : formatted}
      </div>
    </div>
  );
};
