import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { challenges } from '../data/challenges';
import { StatusBadge } from '../components/StatusBadge';
import { Toast } from '../components/Toast';
import { useChallengeProgress } from '../hooks/useChallengeProgress';

const difficultyColors: Record<string, string> = {
  Easy: '#28a745',
  Medium: '#fd7e14',
  Hard: '#dc3545',
  Expert: '#6f42c1',
};

export const ChallengePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getStatus, updateStatus } = useChallengeProgress();
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' as 'info' | 'success' | 'error' });

  const challengeId = parseInt(id || '0', 10);
  const challenge = challenges.find((c) => c.id === challengeId);

  if (!challenge) {
    return (
      <MainLayout>
        <div style={{ maxWidth: '800px', margin: '60px auto', padding: '0 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '24px', color: '#333' }}>Challenge not found</h2>
          <p style={{ color: '#888' }}>The challenge you are looking for does not exist.</p>
          <Link to="/challenges" style={{ color: '#1a73e8', fontSize: '14px' }}>
            ← Back to Challenges
          </Link>
        </div>
      </MainLayout>
    );
  }

  const currentStatus = getStatus(challenge.id);

  const handleStart = () => {
    if (currentStatus === 'locked') {
      setToast({ visible: true, message: 'This challenge is currently locked.', type: 'error' });
      return;
    }
    if (currentStatus === 'completed') {
      setToast({ visible: true, message: 'You have already completed this challenge.', type: 'info' });
      return;
    }
    updateStatus(challenge.id, 'inprogress');
    setToast({ visible: true, message: 'Challenge started! Good luck.', type: 'success' });
    setTimeout(() => navigate('/submissions'), 1500);
  };

  return (
    <MainLayout>
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))}
      />

      {/* Header */}
      <div
        style={{
          background: '#1a1a2e',
          padding: '36px 24px',
          borderBottom: `4px solid ${difficultyColors[challenge.difficulty] || '#e94560'}`,
        }}
      >
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <Link
              to="/challenges"
              style={{ color: '#888', fontSize: '12px', textDecoration: 'none' }}
            >
              ← Challenges
            </Link>
            <span style={{ color: '#444', fontSize: '12px' }}>/</span>
            <span style={{ color: '#aaa', fontSize: '12px' }}>Challenge {challenge.number}</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
            <div>
              <div
                style={{
                  fontSize: '48px',
                  fontWeight: 900,
                  color: 'rgba(255,255,255,0.08)',
                  lineHeight: 1,
                  fontFamily: 'Georgia, serif',
                  marginBottom: '-8px',
                }}
              >
                {challenge.number}
              </div>
              <h1
                style={{
                  color: '#fff',
                  fontSize: '26px',
                  fontWeight: 900,
                  margin: '0 0 10px 0',
                  fontFamily: 'Georgia, serif',
                  letterSpacing: '1px',
                }}
              >
                {challenge.title}
              </h1>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                <span
                  style={{
                    background: '#e94560',
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 700,
                    padding: '3px 10px',
                    letterSpacing: '0.5px',
                  }}
                >
                  {challenge.marks} MARKS
                </span>
                <span
                  style={{
                    color: difficultyColors[challenge.difficulty],
                    fontSize: '12px',
                    fontWeight: 700,
                    border: `1px solid ${difficultyColors[challenge.difficulty]}`,
                    padding: '2px 8px',
                    borderRadius: '10px',
                  }}
                >
                  {challenge.difficulty}
                </span>
                <StatusBadge status={currentStatus} />
              </div>
            </div>

            <button
              onClick={handleStart}
              disabled={currentStatus === 'locked'}
              style={{
                backgroundColor: currentStatus === 'locked' ? '#555' : currentStatus === 'completed' ? '#28a745' : '#e94560',
                color: '#fff',
                border: 'none',
                padding: '12px 28px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: currentStatus === 'locked' ? 'not-allowed' : 'pointer',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                alignSelf: 'flex-end',
              }}
            >
              {currentStatus === 'completed'
                ? 'COMPLETED ✓'
                : currentStatus === 'inprogress'
                ? 'CONTINUE →'
                : currentStatus === 'locked'
                ? 'LOCKED'
                : 'START CHALLENGE'}
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '28px', alignItems: 'start' }}>
          {/* Main content */}
          <div>
            {/* Problem statement */}
            <section style={{ marginBottom: '28px' }}>
              <h2
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#e94560',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  margin: '0 0 10px 0',
                  paddingBottom: '6px',
                  borderBottom: '1px solid #eee',
                }}
              >
                Problem Statement
              </h2>
              <p style={{ fontSize: '14px', color: '#444', lineHeight: 1.8, margin: 0 }}>
                {challenge.problemStatement}
              </p>
            </section>

            {/* Requirements */}
            <section style={{ marginBottom: '28px' }}>
              <h2
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#1a1a2e',
                  margin: '0 0 12px 0',
                }}
              >
                Requirements
              </h2>
              <ol style={{ paddingLeft: '20px', margin: 0 }}>
                {challenge.requirements.map((req, i) => (
                  <li key={i} style={{ fontSize: '13px', color: '#555', marginBottom: '8px', lineHeight: 1.6 }}>
                    {req}
                  </li>
                ))}
              </ol>
            </section>

            {/* Expected behavior */}
            <section style={{ marginBottom: '28px' }}>
              <h2
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#e94560',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  margin: '0 0 10px 0',
                  paddingBottom: '6px',
                  borderBottom: '1px solid #eee',
                }}
              >
                Expected Behavior
              </h2>
              <ul style={{ paddingLeft: '18px', margin: 0 }}>
                {challenge.expectedBehavior.map((b, i) => (
                  <li key={i} style={{ fontSize: '13px', color: '#555', marginBottom: '6px', lineHeight: 1.6 }}>
                    {b}
                  </li>
                ))}
              </ul>
            </section>

            {/* Submission instructions */}
            <section
              style={{
                background: '#f9f9f9',
                border: '1px solid #e0e0e0',
                borderLeft: '4px solid #1a73e8',
                padding: '16px',
                marginBottom: '28px',
              }}
            >
              <h2
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: '#1a73e8',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  margin: '0 0 8px 0',
                }}
              >
                Submission Instructions
              </h2>
              <p style={{ fontSize: '13px', color: '#555', margin: 0, lineHeight: 1.7 }}>
                {challenge.submissionInstructions}
              </p>
            </section>
          </div>

          {/* Sidebar */}
          <div>
            <div
              style={{
                background: '#fff',
                border: '1px solid #e0e0e0',
                padding: '16px',
                marginBottom: '16px',
              }}
            >
              <h3
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: '#888',
                  margin: '0 0 12px 0',
                  paddingBottom: '6px',
                  borderBottom: '1px solid #f0f0f0',
                }}
              >
                Components / Resources
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {challenge.components.map((comp, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: '12px',
                      color: '#444',
                      padding: '5px 0',
                      borderBottom: '1px dashed #f0f0f0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span style={{ color: '#1a73e8', fontWeight: 700, fontSize: '14px' }}>·</span>
                    {comp}
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{
                background: '#1a1a2e',
                color: '#aaa',
                padding: '16px',
                fontSize: '12px',
                lineHeight: 1.7,
              }}
            >
              <div style={{ color: '#e94560', fontWeight: 700, fontSize: '11px', letterSpacing: '1px', marginBottom: '8px' }}>
                SCORING
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span>Challenge Marks</span>
                <span style={{ color: '#fff', fontWeight: 700 }}>{challenge.marks} pts</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span>Difficulty Bonus</span>
                <span style={{ color: '#ffd700' }}>+0 pts</span>
              </div>
              <div
                style={{
                  borderTop: '1px solid #333',
                  paddingTop: '6px',
                  marginTop: '6px',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span>Total Available</span>
                <span style={{ color: '#fff', fontWeight: 700 }}>{challenge.marks} pts</span>
              </div>
            </div>

            <div style={{ marginTop: '12px' }}>
              <button
                onClick={() => navigate('/submissions')}
                style={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  border: '1px solid #ddd',
                  color: '#555',
                  padding: '9px',
                  fontSize: '12px',
                  cursor: 'pointer',
                  textAlign: 'center',
                  letterSpacing: '0.5px',
                }}
              >
                Go to Submissions →
              </button>
            </div>
          </div>
        </div>

        {/* Navigation between challenges */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '1px solid #eee',
            paddingTop: '20px',
            marginTop: '12px',
            gap: '12px',
          }}
        >
          {challenge.id > 1 ? (
            <Link
              to={`/challenges/${challenge.id - 1}`}
              style={{
                fontSize: '12px',
                color: '#1a73e8',
                textDecoration: 'none',
                padding: '8px 14px',
                border: '1px solid #ddd',
              }}
            >
              ← Previous Challenge
            </Link>
          ) : (
            <span />
          )}
          {challenge.id < 4 ? (
            <Link
              to={`/challenges/${challenge.id + 1}`}
              style={{
                fontSize: '12px',
                color: '#1a73e8',
                textDecoration: 'none',
                padding: '8px 14px',
                border: '1px solid #ddd',
              }}
            >
              Next Challenge →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </MainLayout>
  );
};
