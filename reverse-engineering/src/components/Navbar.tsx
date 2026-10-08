import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const navLinks = [
  { label: 'HOME', to: '/' },
  { label: 'CHALLENGES', to: '/challenges' },
  { label: 'rules', to: '/howitworks' },
  { label: 'HOW IT WORKS', to: '/how-it-works' },
  { label: 'REGISTER', to: '/register' },
  { label: 'Login', to: '/login' },
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (to: string) => location.pathname === to;

  return (
    <nav
      style={{
        backgroundColor: '#1a1a2e',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderBottom: '3px solid #e94560',
        minHeight: '60px',
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: 'none',
          display: 'flex',
          flexDirection: 'column',
          lineHeight: 1.1,
        }}
      >
        <span
          style={{
            color: '#e94560',
            fontWeight: 900,
            fontSize: '20px',
            letterSpacing: '2px',
            fontFamily: 'Georgia, serif',
          }}
        >
          REVERSE
        </span>
        <span
          style={{
            color: '#fff',
            fontWeight: 400,
            fontSize: '10px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
          }}
        >
          ENGINEERING
        </span>
      </Link>

      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
        className="nav-links-desktop"
      >
        {navLinks.map((link) => {
          if (link.label === 'REGISTER' && user) return null;
          if (link.label === 'Login' && user) return null;
          return (
            <Link
              key={link.to}
              to={link.to}
              style={{
                color: isActive(link.to) ? '#e94560' : '#ccc',
                textDecoration: 'none',
                fontSize: '12px',
                fontWeight: isActive(link.to) ? 700 : 400,
                padding: '8px 10px',
                borderBottom: isActive(link.to) ? '2px solid #e94560' : '2px solid transparent',
                letterSpacing: '0.8px',
                whiteSpace: 'nowrap',
              }}
            >
              {link.label}
            </Link>
          );
        })}

        {user && (
          <>
            <Link
              to="/dashboard"
              style={{
                color: isActive('/dashboard') ? '#e94560' : '#ccc',
                textDecoration: 'none',
                fontSize: '12px',
                fontWeight: 400,
                padding: '8px 10px',
                borderBottom: isActive('/dashboard') ? '2px solid #e94560' : '2px solid transparent',
                letterSpacing: '0.8px',
              }}
            >
              DASHBOARD
            </Link>
            <Link
              to="/submissions"
              style={{
                color: isActive('/submissions') ? '#e94560' : '#ccc',
                textDecoration: 'none',
                fontSize: '12px',
                fontWeight: 400,
                padding: '8px 10px',
                letterSpacing: '0.8px',
                borderBottom: '2px solid transparent',
              }}
            >
              SUBMIT
            </Link>
            {user.isAdmin && (
              <Link
                to="/admin"
                style={{
                  color: '#ffd700',
                  textDecoration: 'none',
                  fontSize: '12px',
                  fontWeight: 700,
                  padding: '8px 10px',
                  letterSpacing: '0.8px',
                }}
              >
                ADMIN
              </Link>
            )}
            <span
              style={{
                color: '#aaa',
                fontSize: '11px',
                padding: '4px 8px',
                border: '1px solid #444',
                borderRadius: '2px',
                marginLeft: '4px',
              }}
            >
              {user.name.split(' ')[0]}
            </span>
            <button
              onClick={logout}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #e94560',
                color: '#e94560',
                fontSize: '11px',
                padding: '5px 10px',
                cursor: 'pointer',
                borderRadius: '2px',
                letterSpacing: '0.5px',
                marginLeft: '4px',
              }}
            >
              LOGOUT
            </button>
          </>
        )}
      </div>

      <button
        className="nav-hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none',
          backgroundColor: 'transparent',
          border: '1px solid #555',
          color: '#fff',
          fontSize: '18px',
          padding: '4px 8px',
          cursor: 'pointer',
          borderRadius: '2px',
        }}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '60px',
            left: 0,
            width: '100vw',
            backgroundColor: '#1a1a2e',
            borderTop: '1px solid #333',
            padding: '8px 0',
            zIndex: 200,
          }}
          className="nav-mobile-menu"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                padding: '10px 24px',
                color: '#ccc',
                textDecoration: 'none',
                fontSize: '13px',
                borderBottom: '1px solid #2a2a3e',
              }}
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <>
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'block',
                  padding: '10px 24px',
                  color: '#ccc',
                  textDecoration: 'none',
                  fontSize: '13px',
                  borderBottom: '1px solid #2a2a3e',
                }}
              >
                DASHBOARD
              </Link>
              <button
                onClick={() => { logout(); setMenuOpen(false); }}
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '10px 24px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#e94560',
                  fontSize: '13px',
                  cursor: 'pointer',
                }}
              >
                LOGOUT
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};
