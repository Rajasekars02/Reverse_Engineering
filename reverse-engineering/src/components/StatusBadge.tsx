import React from 'react';
import type { ChallengeStatus } from '../types';

interface StatusBadgeProps {
  status: ChallengeStatus | string;
  style?: React.CSSProperties;
}

const statusConfig: Record<string, { label: string; bg: string; color: string }> = {
  available: { label: 'AVAILABLE', bg: '#d4edda', color: '#155724' },
  inprogress: { label: 'IN PROGRESS', bg: '#fff3cd', color: '#856404' },
  'in progress': { label: 'IN PROGRESS', bg: '#cce5ff', color: '#004085' },
  completed: { label: 'COMPLETED', bg: '#28a745', color: '#fff' },
  locked: { label: 'LOCKED', bg: '#e2e3e5', color: '#383d41' },
  submitted: { label: 'SUBMITTED', bg: '#cce5ff', color: '#004085' },
  accepted: { label: 'ACCEPTED', bg: '#28a745', color: '#fff' },
  rejected: { label: 'REJECTED', bg: '#f8d7da', color: '#721c24' },
  draft: { label: 'DRAFT', bg: '#f0f0f0', color: '#666' },
  reviewed: { label: 'REVIEWED', bg: '#e8d5f5', color: '#5a0080' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, style }) => {
  const cfg = statusConfig[status.toLowerCase()] || {
    label: status.toUpperCase(),
    bg: '#eee',
    color: '#333',
  };

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 8px',
        borderRadius: '2px',
        fontSize: '11px',
        fontWeight: 700,
        backgroundColor: cfg.bg,
        color: cfg.color,
        letterSpacing: '0.5px',
        ...style,
      }}
    >
      {cfg.label}
    </span>
  );
};
