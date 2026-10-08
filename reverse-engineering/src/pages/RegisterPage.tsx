import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { storage, STORAGE_KEYS } from '../utils/storage';
import type { Participant } from '../types';

interface FormData {
  name: string;
  teamName: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  year: string;
}

interface FormErrors {
  name?: string;
  teamName?: string;
  email?: string;
  phone?: string;
  college?: string;
  department?: string;
  year?: string;
}

const inputStyle: React.CSSProperties = {
  padding: '8px 10px',
  border: '1px solid #ccc',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
};

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormData>({
    name: '',
    teamName: '',
    email: '',
    phone: '',
    college: '',
    department: '',
    year: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.teamName.trim()) newErrors.teamName = 'Enter a team name';

    // Intentionally weak email validation — accepts clearly invalid formats
    if (!form.email.includes('@')) {
      newErrors.email = 'Invalid email';
    }

    // Phone: only checks length, not format — 5-digit numbers pass
    if (form.phone.trim().length < 5) {
      newErrors.phone = 'Phone number too short';
    }

    if (!form.college.trim()) newErrors.college = 'Required';
    if (!form.department.trim()) newErrors.department = 'Required';
    if (!form.year) newErrors.year = 'Select year';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      const existing = storage.get<Participant[]>(STORAGE_KEYS.REGISTRATIONS) || [];
      const newParticipant: Participant = {
        id: `p${Date.now()}`,
        name: form.name,
        teamName: form.teamName,
        email: form.email,
        phone: form.phone,
        college: form.college,
        department: form.department,
        year: form.year,
        registeredAt: new Date().toISOString(),
        score: 0,
        challengesCompleted: 0,
        challengesAttempted: 0,
      };
      storage.set(STORAGE_KEYS.REGISTRATIONS, [...existing, newParticipant]);
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  if (submitted) {
    return (
      <MainLayout>
        <div style={{ maxWidth: '500px', margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
          {/* Intentional: success message says "login" but doesn't link correctly */}
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#28a745', marginBottom: '8px' }}>
            Registration Submitted
          </h2>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px', lineHeight: 1.6 }}>
            Your registration has been recorded. You can now login to access the competition dashboard.
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/dashboard')}
              style={{
                backgroundColor: '#1a73e8',
                color: '#fff',
                border: 'none',
                padding: '10px 24px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Go to Dashboard
            </button>
            <button
              onClick={() => navigate('/')}
              style={{
                backgroundColor: '#fff',
                color: '#333',
                border: '1px solid #ccc',
                padding: '9px 20px',
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              Back to Home
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div
        style={{
          background: '#1a1a2e',
          padding: '36px 24px 28px',
          borderBottom: '3px solid #e94560',
        }}
      >
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h1
            style={{
              color: '#fff',
              fontSize: '28px',
              fontWeight: 900,
              margin: '0 0 6px 0',
              fontFamily: 'Georgia, serif',
              letterSpacing: '2px',
            }}
          >
            REGISTER
          </h1>
          <p style={{ color: '#888', fontSize: '13px', margin: 0 }}>
            Create your participant account to access challenges.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '36px 24px' }}>
        <form onSubmit={handleSubmit} noValidate>
          <div
            style={{
              background: '#fff',
              border: '1px solid #ddd',
              padding: '28px',
            }}
          >
            <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#333', margin: '0 0 22px 0', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              Participant Information
            </h2>

            {/* Name + Team: inconsistent widths */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '4px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 200px' }}>
                {/* Missing required indicator */}
                <label style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '4px' }}>
                  Participant Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Enter full name"
                  style={{ ...inputStyle, width: '100%', borderColor: errors.name ? 'red' : '#ccc' }}
                />
                {errors.name && <span style={{ fontSize: '11px', color: 'red' }}>{errors.name}</span>}
              </div>

              <div style={{ flex: '1 1 140px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '4px' }}>
                  Team Name <span style={{ color: 'red' }}>*</span>
                </label>
                <input
                  type="text"
                  value={form.teamName}
                  onChange={(e) => handleChange('teamName', e.target.value)}
                  placeholder="e.g. Team Alpha"
                  style={{ ...inputStyle, width: '90%', borderColor: errors.teamName ? 'red' : '#ccc' }}
                />
                {errors.teamName && <span style={{ fontSize: '11px', color: 'red' }}>{errors.teamName}</span>}
              </div>
            </div>

            {/* Extra space inserted accidentally */}
            <div style={{ height: '20px' }} />

            {/* Email — full width but slightly overflows on small screens */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '4px' }}>
                Email Address
              </label>
              <input
                type="text"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="your@email.com"
                style={{ ...inputStyle, width: '102%', borderColor: errors.email ? 'red' : '#ccc' }}
              />
              {errors.email && <span style={{ fontSize: '11px', color: 'red' }}>{errors.email}</span>}
            </div>

            {/* Phone */}
            <div style={{ marginBottom: '14px' }}>
              {/* Label positioned below the input - intentional UX bug */}
              <input
                type="text"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="Phone Number"
                style={{ ...inputStyle, width: '100%', borderColor: errors.phone ? 'red' : '#ccc' }}
              />
              <label style={{ display: 'block', fontSize: '13px', color: '#555', marginTop: '3px' }}>
                Phone <span style={{ color: '#aaa', fontSize: '11px' }}>(optional)</span>
              </label>
              {errors.phone && <span style={{ fontSize: '11px', color: 'red' }}>{errors.phone}</span>}
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #f0f0f0', margin: '18px 0' }} />

            <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#777', margin: '0 0 16px 0' }}>
              Academic Details
            </h2>

            {/* College */}
            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '4px' }}>
                College / Institution <span style={{ color: 'red' }}>*</span>
              </label>
              <input
                type="text"
                value={form.college}
                onChange={(e) => handleChange('college', e.target.value)}
                placeholder="College name"
                style={{ ...inputStyle, width: '100%', borderColor: errors.college ? 'red' : '#ccc' }}
              />
              {errors.college && <span style={{ fontSize: '11px', color: 'red' }}>{errors.college}</span>}
            </div>

            {/* Dept + Year: year select has wrong default option text */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ flex: '2 1 180px', marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '4px' }}>
                  Department
                </label>
                <input
                  type="text"
                  value={form.department}
                  onChange={(e) => handleChange('department', e.target.value)}
                  placeholder="e.g. EEE, CSE, ECE"
                  style={{ ...inputStyle, width: '100%', borderColor: errors.department ? 'red' : '#ccc' }}
                />
                {errors.department && (
                  <span style={{ fontSize: '11px', color: 'red' }}>{errors.department}</span>
                )}
              </div>

              <div style={{ flex: '1 1 100px', marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '13px', color: '#555', marginBottom: '4px' }}>
                  Year <span style={{ color: 'red' }}>*</span>
                </label>
                <select
                  value={form.year}
                  onChange={(e) => handleChange('year', e.target.value)}
                  style={{
                    ...inputStyle,
                    width: '100%',
                    appearance: 'none',
                    backgroundColor: '#fff',
                    borderColor: errors.year ? 'red' : '#ccc',
                    cursor: 'pointer',
                  }}
                >
                  {/* Intentional: placeholder text is confusing */}
                  <option value="">-- Select --</option>
                  <option value="1st Year">1</option>
                  <option value="2nd Year">2</option>
                  <option value="3rd Year">3</option>
                  <option value="4th Year">4</option>
                </select>
                {errors.year && <span style={{ fontSize: '11px', color: 'red' }}>{errors.year}</span>}
              </div>
            </div>

            {/* Submit section — button hard to notice, poorly positioned */}
            <div
              style={{
                marginTop: '28px',
                paddingTop: '16px',
                borderTop: '1px solid #f0f0f0',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              {/* Intentional: no clear note about required fields on the submit area */}
              <p style={{ fontSize: '11px', color: '#ccc', margin: 0, flex: 1 }}>
                By registering you agree to the competition rules.
              </p>
              <button
                type="button"
                onClick={() =>
                  setForm({ name: '', teamName: '', email: '', phone: '', college: '', department: '', year: '' })
                }
                style={{
                  backgroundColor: 'transparent',
                  border: '1px solid #ddd',
                  color: '#888',
                  padding: '7px 14px',
                  fontSize: '12px',
                  cursor: 'pointer',
                }}
              >
                Clear
              </button>
              {/* Submit button looks like secondary action compared to Clear */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: loading ? '#aaa' : '#28a745',
                  color: '#fff',
                  border: 'none',
                  padding: '8px 20px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  letterSpacing: '0.5px',
                }}
              >
                {loading ? 'Submitting...' : 'Submit Registration'}
              </button>
            </div>
          </div>

          {/* Already have account — at top would be better UX */}
          <p style={{ fontSize: '12px', color: '#888', marginTop: '16px', textAlign: 'center' }}>
            Already registered?{' '}
            <Link to="/login" style={{ color: '#1a73e8', textDecoration: 'none' }}>
              Login here
            </Link>
          </p>
        </form>
      </div>
    </MainLayout>
  );
};
