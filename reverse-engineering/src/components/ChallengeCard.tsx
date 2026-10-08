import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Challenge } from '../types';
import { StatusBadge } from './StatusBadge';

interface ChallengeCardProps {
  challenge: Challenge;
  style?: React.CSSProperties;
}

const difficultyColors: Record<string, string> = {
  Easy: '#28a745',
  Medium: '#fd7e14',
  Hard: '#dc3545',
  Expert: '#6f42c1',
};

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge, style }) => {
  const navigate = useNavigate();

  const handleView = () => {
    if (challenge.id === 3) {
      navigate('/challenges/2');
    } else {
      navigate(`/challenges/${challenge.id}`);
    }
  };

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #ddd',
        borderTop: `4px solid ${difficultyColors[challenge.difficulty] || '#999'}`,
        padding: '18px',
        borderRadius: '3px',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <span
          style={{
            fontSize: '32px',
            fontWeight: 900,
            color: '#e8e8e8',
            lineHeight: 1,
            fontFamily: 'Georgia, serif',
          }}
        >
          {challenge.number}
        </span>
        <StatusBadge status={challenge.status} />
      </div>

      <h3
        style={{
          margin: '0 0 4px 0',
          fontSize: '15px',
          fontWeight: 700,
          color: '#222',
        }}
      >
        {challenge.title}
      </h3>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap' }}>
        <span
          style={{
            fontSize: '11px',
            fontWeight: 700,
            color: '#1a73e8',
            background: '#e8f0fe',
            padding: '2px 7px',
            borderRadius: '2px',
          }}
        >
          {challenge.marks} MARKS
        </span>
        <span
          style={{
            fontSize: '11px',
            color: difficultyColors[challenge.difficulty],
            fontWeight: 600,
            border: `1px solid ${difficultyColors[challenge.difficulty]}`,
            padding: '1px 6px',
            borderRadius: '10px',
          }}
        >
          {challenge.difficulty}
        </span>
      </div>

      <p
        style={{
          fontSize: '13px',
          color: '#555',
          lineHeight: '1.5',
          flexGrow: 1,
          margin: '0 0 14px 0',
        }}
      >
        {challenge.description}
      </p>

      <button
        onClick={handleView}
        disabled={challenge.status === 'locked'}
        style={{
          backgroundColor: challenge.status === 'locked' ? '#ccc' : '#1a73e8',
          color: '#fff',
          border: 'none',
          padding: challenge.id % 2 === 0 ? '6px 12px' : '10px 20px',
          fontSize: challenge.id === 1 ? '11px' : '13px',
          fontWeight: 600,
          cursor: challenge.status === 'locked' ? 'not-allowed' : 'pointer',
          borderRadius: '3px',
          alignSelf: challenge.id % 2 === 0 ? 'flex-end' : 'flex-start',
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
        }}
      >
        {challenge.status === 'locked' ? 'LOCKED' : 'VIEW CHALLENGE'}
      </button>
    </div>
  );
};
