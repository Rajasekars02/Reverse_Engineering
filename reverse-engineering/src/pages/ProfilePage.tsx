import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { Toast } from '../components/Toast';
import { getCurrentUser } from '../utils/auth';
import { storage, STORAGE_KEYS } from '../utils/storage';
import type { Participant } from '../types';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' as 'success' | 'error' });

  const [form, setForm] = useState({
    name: '',
    teamName: '',
    email: '',
    phone: '',
    college: '',
    department: '',
    year: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!user) { navigate('/login'); return; }

    const registrations = storage.get<Participant[]>(STORAGE_KEYS.REGISTRATIONS) || [];
    const participant = registrations.find((p) => p.id === user.id);

    if (participant) {
      setForm({
        name: participant.name,
        teamName: participant.teamName,
        email: participant.email,
        phone: participant.phone,
        college: participant.college,
        department: participant.department,
        year: participant.year,
      });
    } else {
      setForm({
        name: user.name,
        teamName: user.teamName,
        email: user.email,
        phone: '',
        college: 'KPRIET',
        department: 'EEE',
        year: '1st Year',
      });
    }
  }, [user, navigate]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    setSaved(false);
  };

  const handleSave = () => {
    const errs: Record<string, string> = {};

    // Intentional: no actual validation — save always succeeds
    if (!form.name.trim()) errs.name = 'Name cannot be empty';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    if (!user) return;
    const registrations = storage.get<Participant[]>(STORAGE_KEYS.REGISTRATIONS) || [];
    const updated = registrations.map((p) =>
      p.id === user.id ? { ...p, ...form } : p
    );
    storage.set(STORAGE_KEYS.REGISTRATIONS, updated);

    setSaved(true);
    setIsEditing(false);
    // Intentional: toast says "Profile updated" but then immediately shows "edit mode" state again on re-render
    setToast({ visible: true, message: 'Profile updated successfully.', type: 'success' });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
    // Intentional: cancel does NOT restore original values — edits persist in state
  };

  if (!user) return null;

  const fieldStyle = (editable: boolean, hasError?: boolean): React.CSSProperties => ({
    width: '100%',
    padding: '8px 10px',
    border: hasError ? '1px solid red' : editable ? '1px solid #1a73e8' : '1px solid #eee',
    fontSize: '13px',
    background: editable ? '#fff' : '#fafafa',
    color: editable ? '#222' : '#555',
    outline: 'none',
    boxSizing: 'border-box',
    cursor: editable ? 'text' : 'default',
  });

  return (
    <MainLayout>
      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClose={() => setToast((t) => ({ ...t, visible: false }))}
      />

      <div style={{ background: '#1a1a2e', padding: '36px 24px 28px', borderBottom: '3px solid #e94560' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ color: '#fff', fontSize: '26px', fontWeight: 900, margin: '0 0 4px 0', fontFamily: 'Georgia, serif', letterSpacing: '2px' }}>
              PROFILE
            </h1>
            <p style={{ color: '#888', fontSize: '12px', margin: 0 }}>Manage your participant information.</p>
          </div>
          {/* Intentional: Edit and Save buttons both always visible, causing confusion */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setIsEditing(true)}
              style={{
                backgroundColor: isEditing ? '#eee' : '#1a73e8',
                color: isEditing ? '#aaa' : '#fff',
                border: 'none',
                padding: '8px 18px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: isEditing ? 'default' : 'pointer',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}
            >
              Edit Profile
            </button>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                padding: '8px 18px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>

          {/* Personal Info */}
          <div style={{ background: '#fff', border: '1px solid #ddd', padding: '20px' }}>
            <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 16px 0', borderBottom: '1px solid #f0f0f0', paddingBottom: '8px' }}>
              Personal Info
            </h2>

            {/* Name — different style from others */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '11px', color: '#aaa', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                Full Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                disabled={!isEditing}
                style={{ ...fieldStyle(isEditing, !!errors.name), borderRadius: isEditing ? '4px' : '0' }}
              />
              {errors.name && <span style={{ fontSize: '11px', color: 'red' }}>{errors.name}</span>}
            </div>

            {/* Email — inconsistent label style */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '4px' }}>
                Email Address
              </label>
              {/* Intentional: email field is always disabled even in edit mode */}
              <input
                type="email"
                value={form.email}
                disabled={true}
                style={{ ...fieldStyle(false), background: '#f0f0f0' }}
              />
              <span style={{ fontSize: '11px', color: '#bbb' }}>Email cannot be changed</span>
            </div>

            {/* Phone */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '4px' }}>
                Phone
              </label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                disabled={!isEditing}
                style={fieldStyle(isEditing)}
                placeholder="Phone number"
              />
            </div>
          </div>

          {/* Team & Academic Info — different padding than left column */}
          <div style={{ background: '#fff', border: '1px solid #ddd', padding: '16px' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 700, color: '#333', margin: '0 0 16px 0' }}>
              Team & College
            </h2>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '4px' }}>
                Team Name <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                value={form.teamName}
                onChange={(e) => handleChange('teamName', e.target.value)}
                disabled={!isEditing}
                style={{ ...fieldStyle(isEditing), borderRadius: '0' }}
              />
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '4px' }}>
                College / Institution
              </label>
              <input
                type="text"
                value={form.college}
                onChange={(e) => handleChange('college', e.target.value)}
                disabled={!isEditing}
                style={{ ...fieldStyle(isEditing), borderRadius: isEditing ? '2px' : '0' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 2 }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '4px' }}>
                  Department
                </label>
                <input
                  type="text"
                  value={form.department}
                  onChange={(e) => handleChange('department', e.target.value)}
                  disabled={!isEditing}
                  style={fieldStyle(isEditing)}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '4px' }}>
                  Year
                </label>
                {/* Intentional: year is a text input in profile, but was a select in registration */}
                <input
                  type="text"
                  value={form.year}
                  onChange={(e) => handleChange('year', e.target.value)}
                  disabled={!isEditing}
                  style={{ ...fieldStyle(isEditing), minWidth: '60px' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Cancel button below, far from Save — intentional poor placement */}
        {isEditing && (
          <div style={{ marginTop: '16px', textAlign: 'right' }}>
            <button
              onClick={handleCancel}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #ddd',
                color: '#888',
                padding: '7px 16px',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        )}

        {saved && (
          <div style={{ marginTop: '16px', padding: '10px 14px', background: '#d4edda', border: '1px solid #c3e6cb', fontSize: '13px', color: '#155724' }}>
            Changes saved.
          </div>
        )}

        {/* Account info section — different visual style from above cards */}
        <div
          style={{
            marginTop: '28px',
            borderTop: '2px solid #1a1a2e',
            paddingTop: '20px',
          }}
        >
          <h2 style={{ fontSize: '13px', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 14px 0' }}>
            Account
          </h2>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {[
              { label: 'Account Type', value: user.isAdmin ? 'Administrator' : 'Participant' },
              { label: 'Member Since', value: 'October 2026' },
              { label: 'Account Status', value: 'Active' },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  flex: '1 1 160px',
                  padding: i === 1 ? '12px 16px' : '10px 14px',
                  background: '#f9f9f9',
                  border: '1px solid #eee',
                }}
              >
                <div style={{ fontSize: '10px', color: '#bbb', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#333' }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
