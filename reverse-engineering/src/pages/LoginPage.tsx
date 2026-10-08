import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { useAuth } from '../hooks/useAuth';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() && !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    // Intentional: only checks email, not password — empty password passes through
    if (!email.trim()) {
      setError('Email is required.');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      const success = login(email, password);
      setLoading(false);

      if (success) {
        navigate('/dashboard');
      } else {
        setAttemptCount((c) => c + 1);
        // Intentional: misleading error message — says "email" problem when password could also be wrong
        setError('No account found with this email address. Please check and try again.');
      }
    }, 600);
  };

  return (
    <MainLayout>
      <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 24px' }}>
        <div
          style={{
            maxWidth: '400px',
            width: '100%',
            margin: '0 auto',
          }}
        >
          {/* Title — no visual hierarchy, same weight as body */}
          <p
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: '#222',
              marginBottom: '4px',
              textAlign: 'center',
            }}
          >
            Login
          </p>
          <p style={{ fontSize: '12px', color: '#aaa', textAlign: 'center', marginBottom: '24px' }}>
            Access your competition account
          </p>

          <div
            style={{
              background: '#fff',
              border: '1px solid #ddd',
              padding: '28px 24px',
            }}
          >
            {error && (
              <div
                style={{
                  background: '#fff3cd',
                  border: '1px solid #ffc107',
                  color: '#856404',
                  padding: '10px 12px',
                  fontSize: '13px',
                  marginBottom: '16px',
                  borderRadius: '2px',
                }}
              >
                {/* Intentional: wrong toast color — warning yellow for an error */}
                {error}
              </div>
            )}

            {attemptCount >= 3 && (
              <div style={{ fontSize: '11px', color: '#aaa', marginBottom: '12px', textAlign: 'center' }}>
                Multiple failed attempts detected.
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Email field */}
              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    color: '#555',
                    marginBottom: '5px',
                    fontWeight: 500,
                  }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="Enter your email"
                  autoComplete="email"
                  style={{
                    width: '100%',
                    padding: '9px 11px',
                    border: '1px solid #ccc',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    borderRadius: '0',
                  }}
                />
              </div>

              {/* Password field — toggle broken */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                  <label
                    style={{
                      fontSize: '13px',
                      color: '#555',
                      fontWeight: 500,
                    }}
                  >
                    Password
                  </label>
                  <Link
                    to="/login"
                    style={{ fontSize: '11px', color: '#1a73e8', textDecoration: 'none' }}
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    style={{
                      width: '100%',
                      padding: '9px 40px 9px 11px',
                      border: '1px solid #ccc',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                  {/* Intentional: toggle uses wrong state logic — shows "Hide" when password is hidden */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '8px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '11px',
                      color: '#aaa',
                      padding: '2px 4px',
                    }}
                    tabIndex={-1}
                  >
                    {showPassword ? 'Show' : 'Hide'}
                  </button>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  backgroundColor: loading ? '#aaa' : '#1a73e8',
                  color: '#fff',
                  border: 'none',
                  padding: '10px',
                  fontSize: '14px',
                  fontWeight: 700,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                }}
              >
                {loading ? 'Logging in...' : 'LOGIN'}
              </button>
            </form>

            {/* Separator + other options — poor spacing */}
            <div
              style={{
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid #f0f0f0',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {/* Register link */}
                <div style={{ textAlign: 'center', fontSize: '12px', color: '#888' }}>
                  Don&apos;t have an account?{' '}
                  <Link to="/register" style={{ color: '#1a73e8', textDecoration: 'none', fontWeight: 600 }}>
                    Register
                  </Link>
                </div>

                {/* Admin hint — poorly placed */}
                <div
                  style={{
                    textAlign: 'center',
                    fontSize: '11px',
                    color: '#bbb',
                    marginTop: '4px',
                  }}
                >
                  Organizer?{' '}
                  <span style={{ color: '#ccc' }}>Use your admin credentials.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Keyboard nav note — below the form, barely visible */}
          <p
            style={{
              fontSize: '10px',
              color: '#ddd',
              textAlign: 'center',
              marginTop: '12px',
            }}
          >
            Press Tab to navigate between fields.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};
