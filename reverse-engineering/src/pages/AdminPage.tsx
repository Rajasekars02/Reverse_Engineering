import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { StatusBadge } from '../components/StatusBadge';
import { getCurrentUser } from '../utils/auth';
import { storage, STORAGE_KEYS } from '../utils/storage';
import { mockParticipants } from '../data/participants';
import { mockSubmissions } from '../data/submissions';
import { challenges } from '../data/challenges';
import type { Participant, Submission } from '../types';

type AdminTab = 'overview' | 'participants' | 'challenges' | 'submissions' | 'scores';

export const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<string>('name');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/login');
      return;
    }
    const registered = storage.get<Participant[]>(STORAGE_KEYS.REGISTRATIONS) || [];
    setParticipants([...mockParticipants, ...registered]);
    const saved = storage.get<Submission[]>(STORAGE_KEYS.SUBMISSIONS) || [];
    setSubmissions([...mockSubmissions, ...saved]);
  }, [user, navigate]);

  if (!user || !user.isAdmin) return null;

  // Intentional: search filters only by name, not email or team
  const filteredParticipants = participants.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Intentional: sort is applied but direction is always 'asc' regardless of sortDir state
  const sortedParticipants = [...filteredParticipants].sort((a, b) => {
    if (sortField === 'score') return b.score - a.score;
    if (sortField === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const totalScore = participants.reduce((s, p) => s + p.score, 0);
  const avgScore = participants.length ? Math.round(totalScore / participants.length) : 0;

  const tabs: { key: AdminTab; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'participants', label: 'Participants' },
    { key: 'challenges', label: 'Challenges' },
    { key: 'submissions', label: 'Submissions' },
    { key: 'scores', label: 'Scores' },
  ];

  return (
    <MainLayout>
      <div style={{ background: '#1a1a2e', padding: '32px 24px 0', borderBottom: '3px solid #e94560' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px', paddingBottom: '0' }}>
            <div>
              <span style={{ display: 'inline-block', background: '#e94560', color: '#fff', fontSize: '9px', letterSpacing: '2px', padding: '2px 8px', marginBottom: '8px' }}>
                ADMIN
              </span>
              <h1 style={{ color: '#fff', fontSize: '24px', fontWeight: 900, margin: 0, fontFamily: 'Georgia, serif', letterSpacing: '2px' }}>
                ADMIN DASHBOARD
              </h1>
            </div>
            <span style={{ color: '#666', fontSize: '11px', paddingBottom: '4px' }}>
              Logged in as: {user.name}
            </span>
          </div>

          {/* Tab bar */}
          <div style={{ display: 'flex', marginTop: '20px', gap: '2px' }}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  padding: '10px 18px',
                  border: 'none',
                  background: activeTab === tab.key ? '#fff' : 'transparent',
                  color: activeTab === tab.key ? '#1a1a2e' : '#888',
                  fontSize: activeTab === tab.key ? '13px' : '12px',
                  fontWeight: activeTab === tab.key ? 700 : 400,
                  cursor: 'pointer',
                  letterSpacing: '0.3px',
                  borderTop: activeTab === tab.key ? '2px solid #e94560' : '2px solid transparent',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '28px 24px' }}>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats — intentional: inconsistent card sizes, mixed alignment */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '28px' }}>
              {[
                { label: 'Total Participants', value: participants.length, color: '#1a73e8' },
                { label: 'Total Submissions', value: submissions.length, color: '#e94560' },
                { label: 'Accepted', value: submissions.filter(s => s.status === 'accepted').length, color: '#28a745' },
                { label: 'Avg Score', value: avgScore, color: '#ff9800' },
                { label: 'Challenges', value: challenges.length, color: '#6f42c1' },
              ].map((stat, i) => (
                <div
                  key={i}
                  style={{
                    background: '#fff',
                    border: '1px solid #ddd',
                    padding: i % 2 === 0 ? '18px 14px' : '12px 14px',
                    borderTop: `3px solid ${stat.color}`,
                    textAlign: i === 2 ? 'right' : 'left',
                  }}
                >
                  <div style={{ fontSize: i === 0 ? '28px' : '22px', fontWeight: 900, color: stat.color, fontFamily: 'Georgia, serif', lineHeight: 1, marginBottom: '4px' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '10px', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Two-column overview */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ background: '#fff', border: '1px solid #ddd', padding: '16px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#333', margin: '0 0 14px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Challenge Summary
                </h3>
                {challenges.map((c) => {
                  const subCount = submissions.filter(s => s.challengeId === c.id && s.status === 'accepted').length;
                  return (
                    <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '7px 0', borderBottom: '1px solid #f5f5f5', fontSize: '12px' }}>
                      <span style={{ color: '#ddd', fontWeight: 900, fontFamily: 'Georgia, serif', width: '28px' }}>{c.number}</span>
                      <span style={{ flex: 1, color: '#444' }}>{c.title}</span>
                      <span style={{ color: '#1a73e8', fontWeight: 700, minWidth: '24px', textAlign: 'right' }}>{subCount}</span>
                      <span style={{ color: '#aaa', fontSize: '11px' }}>accepted</span>
                    </div>
                  );
                })}
              </div>

              <div style={{ background: '#fff', border: '1px solid #ddd', padding: '16px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#333', margin: '0 0 14px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Recent Submissions
                </h3>
                {submissions.slice(0, 5).map((sub) => (
                  <div key={sub.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px solid #f5f5f5', gap: '8px' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '12px', color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {sub.participantName}
                      </div>
                      <div style={{ fontSize: '11px', color: '#aaa' }}>{sub.challengeTitle}</div>
                    </div>
                    <StatusBadge status={sub.status} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PARTICIPANTS TAB */}
        {activeTab === 'participants' && (
          <div>
            {/* Search + sort bar — intentional: sort direction toggle does nothing */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '7px 10px', border: '1px solid #ccc', fontSize: '13px', outline: 'none', width: '220px' }}
              />
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                style={{ padding: '7px 10px', border: '1px solid #ccc', fontSize: '13px', outline: 'none', cursor: 'pointer' }}
              >
                <option value="name">Sort by Name</option>
                <option value="score">Sort by Score</option>
              </select>
              <button
                onClick={() => setSortDir(sortDir === 'asc' ? 'desc' : 'asc')}
                style={{ padding: '7px 12px', border: '1px solid #ccc', background: '#f5f5f5', fontSize: '12px', cursor: 'pointer' }}
              >
                {/* Intentional: always shows ↑ regardless of sortDir */}
                ↑ {sortDir.toUpperCase()}
              </button>
              <span style={{ fontSize: '12px', color: '#aaa', marginLeft: 'auto' }}>
                {filteredParticipants.length} result{filteredParticipants.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Table — intentional: overflows on mobile, long email breaks layout */}
            <div style={{ background: '#fff', border: '1px solid #ddd', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', minWidth: '900px' }}>
                <thead>
                  <tr style={{ background: '#f5f5f5', borderBottom: '2px solid #e0e0e0' }}>
                    {['#', 'Name', 'Team', 'Email', 'College', 'Dept', 'Year', 'Score', 'Status'].map((h, i) => (
                      <th
                        key={i}
                        style={{
                          padding: i === 0 ? '10px 8px' : '10px 12px',
                          textAlign: 'left',
                          fontWeight: 700,
                          color: '#555',
                          fontSize: i === 0 ? '11px' : '12px',
                          whiteSpace: 'nowrap',
                          letterSpacing: '0.3px',
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedParticipants.length === 0 ? (
                    <tr>
                      <td colSpan={9} style={{ textAlign: 'center', padding: '32px', color: '#aaa', fontSize: '13px' }}>
                        No participants found.
                      </td>
                    </tr>
                  ) : (
                    sortedParticipants.map((p, i) => (
                      <tr key={p.id} style={{ borderBottom: '1px solid #f0f0f0', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                        <td style={{ padding: '9px 8px', color: '#bbb', fontSize: '11px' }}>{i + 1}</td>
                        <td style={{ padding: '9px 12px', fontWeight: 600, color: '#222', whiteSpace: 'nowrap' }}>{p.name}</td>
                        <td style={{ padding: '9px 12px', color: '#555', whiteSpace: 'nowrap' }}>{p.teamName}</td>
                        {/* Intentional: email column has no max-width, long emails break table width */}
                        <td style={{ padding: '9px 12px', color: '#1a73e8', fontSize: '11px' }}>{p.email}</td>
                        <td style={{ padding: '9px 12px', color: '#555', whiteSpace: 'nowrap' }}>{p.college}</td>
                        <td style={{ padding: '9px 12px', color: '#555' }}>{p.department}</td>
                        <td style={{ padding: '9px 12px', color: '#555', textAlign: 'center' }}>{p.year}</td>
                        <td style={{ padding: '9px 12px', fontWeight: 700, color: p.score > 50 ? '#28a745' : p.score > 0 ? '#ff9800' : '#aaa', textAlign: 'right' }}>
                          {p.score}
                        </td>
                        <td style={{ padding: '9px 12px' }}>
                          <span style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            padding: '2px 6px',
                            background: p.challengesCompleted > 0 ? '#d4edda' : '#f0f0f0',
                            color: p.challengesCompleted > 0 ? '#155724' : '#888',
                          }}>
                            {p.challengesCompleted > 0 ? 'ACTIVE' : 'REGISTERED'}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CHALLENGES TAB */}
        {activeTab === 'challenges' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {challenges.map((c) => {
                const cSubs = submissions.filter(s => s.challengeId === c.id);
                const accepted = cSubs.filter(s => s.status === 'accepted').length;
                const pending = cSubs.filter(s => s.status === 'submitted').length;
                return (
                  <div key={c.id} style={{ background: '#fff', border: '1px solid #ddd', padding: '18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                      <div>
                        <span style={{ fontSize: '11px', color: '#aaa', letterSpacing: '1px' }}>{c.number}</span>
                        <h3 style={{ margin: '2px 0 0 0', fontSize: '14px', fontWeight: 700, color: '#222' }}>{c.title}</h3>
                      </div>
                      <StatusBadge status={c.status} />
                    </div>
                    <div style={{ display: 'flex', gap: '16px', fontSize: '12px', marginBottom: '12px' }}>
                      <span style={{ color: '#aaa' }}>Marks: <strong style={{ color: '#333' }}>{c.marks}</strong></span>
                      <span style={{ color: '#aaa' }}>Difficulty: <strong style={{ color: '#333' }}>{c.difficulty}</strong></span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <div style={{ flex: 1, background: '#f9f9f9', border: '1px solid #eee', padding: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '18px', fontWeight: 900, color: '#1a73e8' }}>{cSubs.length}</div>
                        <div style={{ fontSize: '10px', color: '#aaa', textTransform: 'uppercase' }}>Total</div>
                      </div>
                      <div style={{ flex: 1, background: '#f9f9f9', border: '1px solid #eee', padding: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '18px', fontWeight: 900, color: '#28a745' }}>{accepted}</div>
                        <div style={{ fontSize: '10px', color: '#aaa', textTransform: 'uppercase' }}>Accepted</div>
                      </div>
                      <div style={{ flex: 1, background: '#f9f9f9', border: '1px solid #eee', padding: '8px', textAlign: 'center' }}>
                        <div style={{ fontSize: '18px', fontWeight: 900, color: '#ff9800' }}>{pending}</div>
                        {/* Intentional: label says "Pending" but status is "submitted" */}
                        <div style={{ fontSize: '10px', color: '#aaa', textTransform: 'uppercase' }}>Pending</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SUBMISSIONS TAB */}
        {activeTab === 'submissions' && (
          <div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Filter submissions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '7px 10px', border: '1px solid #ccc', fontSize: '13px', outline: 'none', width: '220px' }}
              />
              {/* Intentional: filter buttons look like the search applies globally but searchTerm only filters participants above */}
              {['All', 'Submitted', 'Accepted', 'Rejected', 'Draft'].map((f) => (
                <button
                  key={f}
                  style={{
                    padding: '6px 12px',
                    border: '1px solid #ddd',
                    background: '#fff',
                    fontSize: '11px',
                    cursor: 'pointer',
                    color: '#666',
                    borderRadius: '0',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>

            <div style={{ background: '#fff', border: '1px solid #ddd', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', minWidth: '800px' }}>
                <thead>
                  <tr style={{ background: '#f5f5f5', borderBottom: '2px solid #e0e0e0' }}>
                    {['Participant', 'Challenge', 'Link', 'Submitted', 'Status', 'Score', 'Action'].map((h) => (
                      <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700, color: '#555', whiteSpace: 'nowrap' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {submissions.length === 0 ? (
                    <tr>
                      <td colSpan={7} style={{ textAlign: 'center', padding: '32px', color: '#aaa' }}>
                        No submissions yet.
                      </td>
                    </tr>
                  ) : (
                    submissions.map((sub, i) => (
                      <tr key={sub.id} style={{ borderBottom: '1px solid #f0f0f0', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                        <td style={{ padding: '9px 12px', fontWeight: 600, color: '#333', whiteSpace: 'nowrap' }}>{sub.participantName}</td>
                        <td style={{ padding: '9px 12px', color: '#555', whiteSpace: 'nowrap', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sub.challengeTitle}</td>
                        <td style={{ padding: '9px 12px', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {sub.solutionLink ? (
                            <a href={sub.solutionLink} style={{ color: '#1a73e8', fontSize: '11px', textDecoration: 'none' }} target="_blank" rel="noreferrer">
                              {sub.solutionLink}
                            </a>
                          ) : (
                            <span style={{ color: '#ccc', fontSize: '11px' }}>—</span>
                          )}
                        </td>
                        <td style={{ padding: '9px 12px', color: '#aaa', fontSize: '11px', whiteSpace: 'nowrap' }}>
                          {new Date(sub.submittedAt).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '9px 12px' }}><StatusBadge status={sub.status} /></td>
                        <td style={{ padding: '9px 12px', textAlign: 'right', fontWeight: 700, color: sub.score !== undefined ? '#28a745' : '#ddd' }}>
                          {sub.score !== undefined ? sub.score : '—'}
                        </td>
                        <td style={{ padding: '9px 12px' }}>
                          {/* Intentional: Review button does nothing */}
                          <button
                            onClick={() => {}}
                            style={{ padding: '4px 10px', border: '1px solid #ddd', background: '#f9f9f9', fontSize: '11px', cursor: 'pointer', color: '#555' }}
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SCORES TAB */}
        {activeTab === 'scores' && (
          <div>
            <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <h2 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#333' }}>Score Summary</h2>
              {/* Intentional: Export button does nothing */}
              <button
                onClick={() => {}}
                style={{ padding: '7px 16px', background: '#1a73e8', color: '#fff', border: 'none', fontSize: '12px', fontWeight: 600, cursor: 'pointer', letterSpacing: '0.5px' }}
              >
                Export CSV
              </button>
            </div>

            <div style={{ background: '#fff', border: '1px solid #ddd', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', minWidth: '600px' }}>
                <thead>
                  <tr style={{ background: '#f5f5f5', borderBottom: '2px solid #e0e0e0' }}>
                    {['Rank', 'Name', 'Team', 'Completed', 'Score', 'Max Possible'].map((h, i) => (
                      <th key={h} style={{ padding: '10px 12px', textAlign: i >= 3 ? 'right' : 'left', fontWeight: 700, color: '#555' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Intentional: sorted by score descending but rank numbers are wrong (just index+1, not accounting for ties) */}
                  {[...participants]
                    .sort((a, b) => b.score - a.score)
                    .map((p, i) => (
                      <tr key={p.id} style={{ borderBottom: '1px solid #f0f0f0', background: i === 0 ? '#fffbe6' : i % 2 === 0 ? '#fff' : '#fafafa' }}>
                        <td style={{ padding: '9px 12px', fontWeight: 700, color: i === 0 ? '#ffc107' : i === 1 ? '#aaa' : '#ddd', fontSize: i < 3 ? '14px' : '12px' }}>
                          #{i + 1}
                        </td>
                        <td style={{ padding: '9px 12px', fontWeight: 600, color: '#222' }}>{p.name}</td>
                        <td style={{ padding: '9px 12px', color: '#666' }}>{p.teamName}</td>
                        <td style={{ padding: '9px 12px', textAlign: 'right', color: '#333' }}>
                          {p.challengesCompleted}/{challenges.length}
                        </td>
                        <td style={{ padding: '9px 12px', textAlign: 'right', fontWeight: 700, color: p.score >= 80 ? '#28a745' : p.score >= 40 ? '#ff9800' : '#aaa', fontSize: '14px' }}>
                          {p.score}
                        </td>
                        <td style={{ padding: '9px 12px', textAlign: 'right', color: '#aaa', fontSize: '12px' }}>
                          100
                        </td>
                      </tr>
                    ))}
                </tbody>
                <tfoot>
                  <tr style={{ borderTop: '2px solid #e0e0e0', background: '#f9f9f9' }}>
                    <td colSpan={4} style={{ padding: '9px 12px', fontWeight: 700, color: '#555', fontSize: '12px' }}>
                      Average Score
                    </td>
                    <td style={{ padding: '9px 12px', textAlign: 'right', fontWeight: 700, color: '#333' }}>
                      {avgScore}
                    </td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
