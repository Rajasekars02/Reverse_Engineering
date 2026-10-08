import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { StatusBadge } from '../components/StatusBadge';
import { Toast } from '../components/Toast';
import { getCurrentUser } from '../utils/auth';
import { storage, STORAGE_KEYS } from '../utils/storage';
import { challenges } from '../data/challenges';
import type { Submission } from '../types';

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 10px',
  border: '1px solid #ccc',
  fontSize: '13px',
  outline: 'none',
  boxSizing: 'border-box',
};

export const SubmissionsPage: React.FC = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState('');
  const [solutionLink, setSolutionLink] = useState('');
  const [notes, setNotes] = useState('');
  const [fileName, setFileName] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' as 'info' | 'success' | 'error' | 'warning' });
  const [activeTab, setActiveTab] = useState<'submit' | 'history'>('submit');

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    const saved = storage.get<Submission[]>(STORAGE_KEYS.SUBMISSIONS) || [];
    setSubmissions(saved.filter((s) => s.participantId === user.id));
  }, [user, navigate]);

  const validate = (isDraft: boolean): boolean => {
    const errs: Record<string, string> = {};
    if (!selectedChallenge) errs.challenge = 'Select a challenge';
    if (!isDraft) {
      // Intentional: URL validation is absent — any non-empty string passes
      if (!solutionLink.trim()) errs.solutionLink = 'Solution link is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSaveDraft = () => {
    if (!validate(true)) return;
    if (!user) return;

    const draft: Submission = {
      id: `s${Date.now()}`,
      participantId: user.id,
      participantName: user.name,
      challengeId: parseInt(selectedChallenge),
      challengeTitle: challenges.find((c) => c.id === parseInt(selectedChallenge))?.title || '',
      solutionLink,
      notes,
      status: 'draft',
      submittedAt: new Date().toISOString(),
    };

    const existing = storage.get<Submission[]>(STORAGE_KEYS.SUBMISSIONS) || [];
    storage.set(STORAGE_KEYS.SUBMISSIONS, [...existing, draft]);
    setSubmissions((prev) => [...prev, draft]);

    // Intentional: wrong toast type — draft save shows "error" style
    setToast({ visible: true, message: 'Draft saved successfully.', type: 'error' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(false)) return;
    if (!user) return;

    const existing = storage.get<Submission[]>(STORAGE_KEYS.SUBMISSIONS) || [];
    const alreadySubmitted = existing.find(
      (s) => s.participantId === user.id &&
             s.challengeId === parseInt(selectedChallenge) &&
             s.status === 'submitted'
    );

    if (alreadySubmitted) {
      // Intentional: message says "draft" when it should say "submission"
      setToast({ visible: true, message: 'You already have a draft for this challenge.', type: 'warning' });
      return;
    }

    const submission: Submission = {
      id: `s${Date.now()}`,
      participantId: user.id,
      participantName: user.name,
      challengeId: parseInt(selectedChallenge),
      challengeTitle: challenges.find((c) => c.id === parseInt(selectedChallenge))?.title || '',
      solutionLink,
      notes,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
    };

    storage.set(STORAGE_KEYS.SUBMISSIONS, [...existing, submission]);
    setSubmissions((prev) => [...prev, submission]);

    setSelectedChallenge('');
    setSolutionLink('');
    setNotes('');
    setFileName('');
    setToast({ visible: true, message: 'Solution submitted successfully!', type: 'success' });
  };

  if (!user) return null;

  return (
    <MainLayout>
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))}
      />

      <div style={{ background: '#1a1a2e', padding: '36px 24px 28px', borderBottom: '3px solid #e94560' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: 900, margin: '0 0 6px 0', fontFamily: 'Georgia, serif', letterSpacing: '2px' }}>
            SUBMISSIONS
          </h1>
          <p style={{ color: '#888', fontSize: '13px', margin: 0 }}>Submit your solutions for evaluation.</p>
        </div>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '28px 24px' }}>
        {/* Tabs — intentional: no visual active state difference beyond font-weight */}
        <div style={{ display: 'flex', borderBottom: '2px solid #eee', marginBottom: '24px' }}>
          {(['submit', 'history'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderBottom: activeTab === tab ? '2px solid #1a73e8' : 'none',
                background: 'transparent',
                fontSize: '13px',
                fontWeight: activeTab === tab ? 700 : 400,
                color: activeTab === tab ? '#1a73e8' : '#888',
                cursor: 'pointer',
                marginBottom: '-2px',
                letterSpacing: '0.3px',
              }}
            >
              {tab === 'submit' ? 'Submit Solution' : 'My Submissions'}
            </button>
          ))}
        </div>

        {activeTab === 'submit' && (
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ background: '#fff', border: '1px solid #ddd', padding: '24px' }}>
              <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#333', margin: '0 0 20px 0' }}>
                New Submission
              </h2>

              {/* Challenge selector */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '5px', fontWeight: 500 }}>
                  Challenge <span style={{ color: 'red' }}>*</span>
                </label>
                <select
                  value={selectedChallenge}
                  onChange={(e) => { setSelectedChallenge(e.target.value); setErrors((er) => ({ ...er, challenge: '' })); }}
                  style={{ ...inputStyle, cursor: 'pointer', backgroundColor: '#fff' }}
                >
                  <option value="">Select challenge...</option>
                  {challenges.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.number} — {c.title} ({c.marks} marks)
                    </option>
                  ))}
                </select>
                {errors.challenge && <span style={{ fontSize: '11px', color: 'red' }}>{errors.challenge}</span>}
              </div>

              {/* Solution link */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '5px', fontWeight: 500 }}>
                  Solution Link
                  {/* Intentional: no required indicator even though it is required on submit */}
                </label>
                <input
                  type="text"
                  value={solutionLink}
                  onChange={(e) => { setSolutionLink(e.target.value); setErrors((er) => ({ ...er, solutionLink: '' })); }}
                  placeholder="https://github.com/your-repo"
                  style={{ ...inputStyle, borderColor: errors.solutionLink ? 'red' : '#ccc' }}
                />
                {errors.solutionLink && <span style={{ fontSize: '11px', color: 'red' }}>{errors.solutionLink}</span>}
              </div>

              {/* File upload — non-functional, no actual upload */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '5px', fontWeight: 500 }}>
                  Attach File <span style={{ fontSize: '11px', color: '#aaa' }}>(optional)</span>
                </label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="file"
                    id="fileUpload"
                    style={{ display: 'none' }}
                    onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
                  />
                  <label
                    htmlFor="fileUpload"
                    style={{
                      padding: '7px 14px',
                      border: '1px solid #ccc',
                      fontSize: '12px',
                      cursor: 'pointer',
                      backgroundColor: '#f5f5f5',
                      color: '#555',
                      display: 'inline-block',
                    }}
                  >
                    Choose File
                  </label>
                  <span style={{ fontSize: '12px', color: '#aaa' }}>
                    {fileName || 'No file selected'}
                  </span>
                </div>
                <span style={{ fontSize: '11px', color: '#bbb', marginTop: '3px', display: 'block' }}>
                  Accepted: .ino, .zip, .pdf (max 5MB)
                </span>
              </div>

              {/* Notes */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '5px', fontWeight: 500 }}>
                  Notes / Description
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe your approach, assumptions, or any important notes..."
                  rows={4}
                  style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.5 }}
                />
              </div>

              {/* Action buttons — intentional: SAVE DRAFT is more prominent than SUBMIT */}
              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  paddingTop: '16px',
                  borderTop: '1px solid #f0f0f0',
                  flexWrap: 'wrap',
                }}
              >
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  style={{
                    backgroundColor: '#1a73e8',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 24px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    letterSpacing: '0.5px',
                    flex: 1,
                    textTransform: 'uppercase',
                  }}
                >
                  SAVE DRAFT
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: 'transparent',
                    color: '#28a745',
                    border: '1px solid #28a745',
                    padding: '9px 20px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    letterSpacing: '0.3px',
                  }}
                >
                  Submit Solution
                </button>
              </div>
            </div>
          </form>
        )}

        {activeTab === 'history' && (
          <div>
            {submissions.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 20px', background: '#fff', border: '1px solid #ddd' }}>
                {/* Intentional: wrong empty state message */}
                <p style={{ color: '#888', fontSize: '14px', margin: 0 }}>No challenges available yet.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {submissions.map((sub) => (
                  <div
                    key={sub.id}
                    style={{
                      background: '#fff',
                      border: '1px solid #ddd',
                      padding: '14px 16px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '12px',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#222', marginBottom: '2px' }}>
                        {sub.challengeTitle}
                      </div>
                      <div style={{ fontSize: '11px', color: '#aaa' }}>
                        {new Date(sub.submittedAt).toLocaleString()}
                      </div>
                      {sub.solutionLink && (
                        <a
                          href={sub.solutionLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontSize: '11px', color: '#1a73e8', textDecoration: 'none' }}
                        >
                          {sub.solutionLink}
                        </a>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {sub.score !== undefined && (
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#28a745' }}>
                          {sub.score} pts
                        </span>
                      )}
                      <StatusBadge status={sub.status} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
};
