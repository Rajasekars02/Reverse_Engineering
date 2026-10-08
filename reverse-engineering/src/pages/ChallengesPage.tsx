import React, { useState } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { challenges } from '../data/challenges';
import { ChallengeCard } from '../components/ChallengeCard';

const difficultyFilters = ['All', 'Easy', 'Medium', 'Hard', 'Expert'];

export const ChallengesPage: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = challenges.filter((c) => {
    const matchDifficulty = filter === 'All' || c.difficulty === filter;
    const matchSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchDifficulty && matchSearch;
  });

  const totalMarks = challenges.reduce((sum, c) => sum + c.marks, 0);

  return (
    <MainLayout>
      <div
        style={{
          background: '#1a1a2e',
          padding: '40px 24px 30px',
          borderBottom: '3px solid #e94560',
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ color: '#e94560', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>
            Competition
          </p>
          <h1
            style={{
              color: '#fff',
              fontSize: '32px',
              fontWeight: 900,
              margin: '0 0 8px 0',
              fontFamily: 'Georgia, serif',
              letterSpacing: '2px',
            }}
          >
            CHALLENGES
          </h1>
          <p style={{ color: '#888', fontSize: '13px', margin: 0 }}>
            {challenges.length} challenges &nbsp;|&nbsp; {totalMarks} total marks
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '28px 24px' }}>
        {/* Filter bar — intentionally inconsistent layout */}
        <div
          style={{
            background: '#fff',
            border: '1px solid #ddd',
            padding: '12px 16px',
            marginBottom: '24px',
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {difficultyFilters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: filter === f ? '5px 14px' : '4px 12px',
                  fontSize: filter === f ? '12px' : '11px',
                  fontWeight: filter === f ? 700 : 400,
                  backgroundColor: filter === f ? '#1a1a2e' : '#f5f5f5',
                  color: filter === f ? '#fff' : '#555',
                  border: filter === f ? '1px solid #1a1a2e' : '1px solid #ddd',
                  cursor: 'pointer',
                  borderRadius: filter === f ? '0px' : '12px',
                  letterSpacing: '0.3px',
                }}
              >
                {f}
              </button>
            ))}
          </div>

          <div style={{ marginLeft: 'auto' }}>
            <input
              type="text"
              placeholder="Search challenges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '6px 10px',
                border: '2px solid #1a73e8',
                borderRadius: '0',
                fontSize: '12px',
                outline: 'none',
                width: '180px',
              }}
            />
          </div>
        </div>

        {/* Summary row */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '20px',
            flexWrap: 'wrap',
          }}
        >
          {challenges.map((c) => (
            <div
              key={c.id}
              style={{
                fontSize: '11px',
                padding: '3px 10px',
                background: c.status === 'locked' ? '#eee' : '#e8f0fe',
                color: c.status === 'locked' ? '#999' : '#1a73e8',
                border: '1px solid ' + (c.status === 'locked' ? '#ddd' : '#c5d8fd'),
                borderRadius: '2px',
                fontWeight: 600,
              }}
            >
              {c.title} — {c.marks} pts
            </div>
          ))}
        </div>

        {/* Cards grid — intentionally bad: no consistent heights, awkward gaps */}
        {filtered.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#999',
              background: '#fff',
              border: '1px solid #eee',
            }}
          >
            <p style={{ fontSize: '32px', margin: '0 0 8px 0' }}>¯\_(ツ)_/¯</p>
            <p style={{ fontSize: '14px' }}>No results.</p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px',
            }}
          >
            {filtered.map((challenge, index) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                style={{
                  minHeight: index === 0 ? '320px' : index === 1 ? '260px' : index === 2 ? '300px' : '280px',
                }}
              />
            ))}
          </div>
        )}

        {/* Bottom note */}
        <div
          style={{
            marginTop: '32px',
            padding: '14px 16px',
            background: '#fffbe6',
            border: '1px solid #ffe58f',
            borderLeft: '4px solid #faad14',
            fontSize: '12px',
            color: '#7d5a00',
            lineHeight: 1.6,
          }}
        >
          <strong>Note:</strong> Challenge 4 (Temperature-Controlled Fan) is unlocked after completing
          Challenge 3. Ensure you submit all previous challenges before attempting higher-value ones.
          <br />
          <span style={{ fontSize: '11px', color: '#aaa' }}>
            — This behavior may not be currently enforced in all cases.
          </span>
        </div>
      </div>
    </MainLayout>
  );
};
