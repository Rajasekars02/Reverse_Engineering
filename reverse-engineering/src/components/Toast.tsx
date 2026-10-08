import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  visible: boolean;
  onClose: () => void;
  duration?: number;
}

const typeColors: Record<string, { bg: string; color: string; border: string }> = {
  success: { bg: '#d4edda', color: '#155724', border: '#c3e6cb' },
  error: { bg: '#f8d7da', color: '#721c24', border: '#f5c6cb' },
  info: { bg: '#d1ecf1', color: '#0c5460', border: '#bee5eb' },
  warning: { bg: '#fff3cd', color: '#856404', border: '#ffeeba' },
};

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  visible,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose]);

  if (!visible) return null;

  const colors = typeColors[type] || typeColors.info;

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        backgroundColor: colors.bg,
        color: colors.color,
        border: `1px solid ${colors.border}`,
        borderRadius: '4px',
        padding: '12px 16px',
        fontSize: '14px',
        maxWidth: '320px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
      }}
      role="alert"
    >
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: colors.color,
          fontSize: '16px',
          lineHeight: 1,
          padding: 0,
        }}
      >
        ×
      </button>
    </div>
  );
};
