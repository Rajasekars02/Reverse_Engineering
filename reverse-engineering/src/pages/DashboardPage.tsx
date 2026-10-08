import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { Timer } from '../components/Timer';
import { StatusBadge } from '../components/StatusBadge';
import { getCurrentUser } from '../utils/auth';
import { storage, STORAGE_KEYS } from '../utils/storage';
import { challenges } from '../data/challenges';
import type { ChallengeProgress, Participant } from '../types';

const defaultProgress: ChallengeProgress[] = [
  { challengeId: 1, status: 'available' },
  { challengeId: 2, status: 'inprogress' },
  { challengeId: 3, status: 'available' },
  { challengeId: 4, status: 'locked' },
];

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [progress] = useState<ChallengeProgress[]>(() =>
    storage.get<ChallengeProgress[]>(STORAGE_KEYS.CHALLENGE_PROGRESS) || defaultProgress
  );
  const [participant, setParticipant] = useState<Participant | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const registrations = storage.get<Participant[]>(STORAGE_KEYS.REGISTRATIONS) || [];
    const found = registrations.find((p) => p.id === user.id);
    setParticipant(found || null);
  }, [user, navigate]);

  // Intentional: score computed incorrectly — always uses challengeId as marks multiplier
  const computedScore = progress
    .filter((p) => p.status === 'completed')
    .reduce((sum, p) => sum + p.challengeId * 10, 0);

  const completed = progress.filter((p) => p.status === 'completed').length;
  const attempted = progress.filter((p) => p.status === 'inprogress' || p.status === 'completed').length;

  const statusColorMap: Record<string, string> = {
    available: '#1a73e8',
    inprogress: '#ff9800',
    completed: '#28a745',
    locked: '#aaa',
  };

  if (!user) return null;

  return (
    <MainLayout>
      <div
        style={{
          background: '#1a1a2e',
          padding: '32px 24px 24px',
          borderBottom: '3px solid #e94560',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p style={{ color: '#888', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 4px 0' }}>
              Welcome back
            </p>
            <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 900, margin: '0 0 4px 0', fontFamily: 'Georgia, serif' }}>
              {user.name}
            </h1>
            <p style={{ color: '#aaa', fontSize: '12px', margin: 0 }}>
              {user.teamName} &nbsp;|&nbsp; {participant?.college || 'KPRIET'} &nbsp;|&nbsp; {participant?.department || 'EEE'}
            </p>
          </div>
          {/* Timer — intentional: label says "Session Time" not "Time Remaining" */}
          <div style={{ textAlign: 'right' }}>
            <p style={{ color: '#666', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 4px 0' }}>
              Session Time
            </p>
            <Timer showLabel={false} />
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '28px 24px' }}>

        {/* Stats row — intentionally misaligned, inconsistent card sizes */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '180px 140px 180px 140px',
            gap: '12px',
            marginBottom: '28px',
          }}
        >
          {[
            { label: 'Current Score', value: computedScore, unit: 'pts', color: '#e94560' },
            { label: 'Completed', value: completed, unit: `/ ${challenges.length}`, color: '#28a745' },
            { label: 'In Progress', value: attempted - completed, unit: 'active', color: '#ff9800' },
            { label: 'Remaining', value: challenges.length - attempted, unit: 'challenges', color: '#1a73e8' },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                background: '#fff',
                border: '1px solid #ddd',
                padding: i % 2 === 0 ? '20px 16px' : '14px 12px',
                borderTop: `3px solid ${stat.color}`,
              }}
            >
              <div
                style={{
                  fontSize: i === 0 ? '32px' : '24px',
                  fontWeight: 900,
                  color: stat.color,
                  fontFamily: 'Georgia, serif',
                  lineHeight: 1,
                  marginBottom: '4px',
                }}
              >
                {stat.value}
                <span style={{ fontSize: '12px', color: '#aaa', fontWeight: 400, marginLeft: '4px', fontFamily: 'inherit' }}>
                  {stat.unit}
                </span>
              </div>
              <div style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', alignItems: 'start' }}>

          {/* Challenge status list */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#333', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
                Challenge Status
              </h2>
              <Link to="/challenges" style={{ fontSize: '11px', color: '#1a73e8', textDecoration: 'none' }}>
                View all
              </Link>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {challenges.map((challenge) => {
                const prog = progress.find((p) => p.challengeId === challenge.id);
                const status = prog?.status || 'available';

                return (
                  <div
                    key={challenge.id}
                    style={{
                      background: '#fff',
                      border: '1px solid #e8e8e8',
                      borderLeft: `4px solid ${statusColorMap[status]}`,
                      padding: '14px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '20px',
                        fontWeight: 900,
                        color: '#eee',
                        fontFamily: 'Georgia, serif',
                        minWidth: '32px',
                      }}
                    >
                      {challenge.number}
                    </span>
                    <div style={{ flex: 1, minWidth: '120px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#222', marginBottom: '2px' }}>
                        {challenge.title}
                      </div>
                      <div style={{ fontSize: '11px', color: '#aaa' }}>
                        {challenge.marks} marks &nbsp;·&nbsp; {challenge.difficulty}
                      </div>
                    </div>
                    <StatusBadge status={status} />
                    {/* Intentional: button label doesn't match status — always says "Start" even if completed */}
                    <button
                      onClick={() => status !== 'locked' && navigate(`/challenges/${challenge.id}`)}
                      disabled={status === 'locked'}
                      style={{
                        backgroundColor: status === 'locked' ? '#f5f5f5' : '#1a1a2e',
                        color: status === 'locked' ? '#bbb' : '#fff',
                        border: 'none',
                        padding: '6px 14px',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: status === 'locked' ? 'not-allowed' : 'pointer',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        flexShrink: 0,
                      }}
                    >
                      Start
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Progress bar — intentional: shows wrong percentage (uses computedScore/100) */}
            <div style={{ background: '#fff', border: '1px solid #ddd', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#333', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Progress
                </span>
                <span style={{ fontSize: '12px', color: '#888' }}>{computedScore}%</span>
              </div>
              <div style={{ background: '#f0f0f0', height: '8px', borderRadius: '0' }}>
                <div
                  style={{
                    width: `${Math.min(computedScore, 100)}%`,
                    height: '100%',
                    backgroundColor: computedScore >= 80 ? '#28a745' : computedScore >= 40 ? '#ff9800' : '#1a73e8',
                    transition: 'width 0.3s',
                  }}
                />
              </div>
              <div style={{ marginTop: '8px', fontSize: '11px', color: '#aaa' }}>
                {completed} of {challenges.length} challenges completed
              </div>
            </div>

            {/* Competition info — duplicated from header */}
            <div style={{ background: '#fff', border: '1px solid #ddd', padding: '16px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 12px 0' }}>
                Your Info
              </h3>
              {[
                { label: 'Name', value: user.name },
                { label: 'Team', value: user.teamName },
                { label: 'College', value: participant?.college || '—' },
                { label: 'Dept', value: participant?.department || '—' },
                { label: 'Year', value: participant?.year || '—' },
                { label: 'Email', value: user.email },
                // Intentional: score shown here uses different calculation than stats row
                { label: 'Score', value: `${completed * 15} / 100` },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '5px 0',
                    borderBottom: '1px solid #f5f5f5',
                    fontSize: '12px',
                    gap: '8px',
                  }}
                >
                  <span style={{ color: '#aaa', flexShrink: 0 }}>{item.label}</span>
                  <span
                    style={{
                      color: '#333',
                      textAlign: 'right',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      maxWidth: '160px',
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
              <div style={{ marginTop: '12px' }}>
                <Link
                  to="/profile"
                  style={{
                    fontSize: '11px',
                    color: '#1a73e8',
                    textDecoration: 'none',
                    display: 'block',
                    textAlign: 'center',
                    padding: '6px',
                    border: '1px solid #e0e0e0',
                  }}
                >
                  Edit Profile
                </Link>
              </div>
            </div>

            {/* Quick actions */}
            <div style={{ background: '#fff', border: '1px solid #ddd', padding: '16px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 10px 0' }}>
                Quick Actions
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  { label: 'View Challenges', to: '/challenges', color: '#1a73e8' },
                  { label: 'Submit Solution', to: '/submissions', color: '#28a745' },
                  { label: 'View Rules', to: '/rules', color: '#ff9800' },
                  // Intentional: "My Profile" links to /dashboard (itself)
                  { label: 'My Profile', to: '/dashboard', color: '#6f42c1' },
                ].map((action, i) => (
                  <Link
                    key={i}
                    to={action.to}
                    style={{
                      display: 'block',
                      padding: '8px 10px',
                      background: '#f9f9f9',
                      border: '1px solid #eee',
                      color: action.color,
                      textDecoration: 'none',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    → {action.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent activity — intentional: shows wrong/misleading data */}
        <div style={{ marginTop: '28px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#333', margin: '0 0 14px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Recent Activity
          </h2>
          <div style={{ background: '#fff', border: '1px solid #ddd' }}>
            {[
              { time: '10:32 AM', event: 'Challenge 2 started', type: 'start' },
              { time: '09:47 AM', event: 'Logged in successfully', type: 'login' },
              { time: '09:45 AM', event: 'Registration completed', type: 'register' },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 16px',
                  borderBottom: i < 2 ? '1px solid #f5f5f5' : 'none',
                  fontSize: '12px',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: item.type === 'start' ? '#ff9800' : item.type === 'login' ? '#1a73e8' : '#28a745',
                    flexShrink: 0,
                  }}
                />
                <span style={{ color: '#888', minWidth: '64px' }}>{item.time}</span>
                <span style={{ color: '#444' }}>{item.event}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
