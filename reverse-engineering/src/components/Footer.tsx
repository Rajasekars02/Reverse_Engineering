import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: '#111',
        color: '#aaa',
        padding: '40px 24px 20px',
        marginTop: '60px',
        borderTop: '4px solid #e94560',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '32px',
        }}
      >
        <div>
          <div
            style={{
              color: '#e94560',
              fontWeight: 900,
              fontSize: '22px',
              letterSpacing: '2px',
              fontFamily: 'Georgia, serif',
              marginBottom: '4px',
            }}
          >
            REVERSE ENGINEERING
          </div>
          <p style={{ fontSize: '12px', lineHeight: 1.7, color: '#777', maxWidth: '280px' }}>
            A technical competition organized by the Department of Electrical and Electronics
            Engineering at KPRIET. Observe. Analyze. Reconstruct. Solve.
          </p>
          <p style={{ fontSize: '11px', color: '#555', marginTop: '12px' }}>
            Organized by: EEE Department<br />
            Venue: KPRIET Campus<br />
            Date: October 8, 2026<br />
            Time: 09:00 AM – 12:00 PM<br />
            Contact: eee.events@kpriet.ac.in<br />
            Phone: +91 98765 43210<br />
            Alternate Phone: +91 98765 43211<br />
            Fax: 0422-2345678 (Nobody uses this)<br />
          </p>
        </div>

        <div>
          <h4
            style={{
              color: '#fff',
              fontSize: '13px',
              fontWeight: 700,
              marginBottom: '12px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              borderBottom: '1px solid #333',
              paddingBottom: '6px',
            }}
          >
            Quick Links
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              { label: 'Home', to: '/' },
              { label: 'Challenges', to: '/challenges' },
              { label: 'How It Works', to: '/how-it-works' },
              { label: 'Rules', to: '/rules' },
              { label: 'Register', to: '/register' },
            ].map((link) => (
              <li key={link.to} style={{ marginBottom: '6px' }}>
                <Link
                  to={link.to}
                  style={{ color: '#888', textDecoration: 'none', fontSize: '12px' }}
                >
                  › {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4
            style={{
              color: '#fff',
              fontSize: '13px',
              fontWeight: 700,
              marginBottom: '12px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              borderBottom: '1px solid #333',
              paddingBottom: '6px',
            }}
          >
            Challenges
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              { label: 'Smart Traffic Signal', to: '/challenges/1' },
              { label: 'Digital Security Lock', to: '/challenges/2' },
              { label: 'Automatic Street Light', to: '/challenges/3' },
              { label: 'Temperature Fan', to: '/challenges/4' },
            ].map((link) => (
              <li key={link.to} style={{ marginBottom: '6px' }}>
                <Link
                  to={link.to}
                  style={{ color: '#888', textDecoration: 'none', fontSize: '12px' }}
                >
                  › {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4
            style={{
              color: '#fff',
              fontSize: '13px',
              fontWeight: 700,
              marginBottom: '12px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              borderBottom: '1px solid #333',
              paddingBottom: '6px',
            }}
          >
            Account
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              { label: 'Login', to: '/login' },
              { label: 'Register', to: '/register' },
              { label: 'Dashboard', to: '/dashboard' },
              { label: 'Profile', to: '/profile' },
              { label: 'Submissions', to: '/submissions' },
            ].map((link) => (
              <li key={link.to} style={{ marginBottom: '6px' }}>
                <Link
                  to={link.to}
                  style={{ color: '#888', textDecoration: 'none', fontSize: '12px' }}
                >
                  › {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        style={{
          maxWidth: '1100px',
          margin: '30px auto 0',
          paddingTop: '16px',
          borderTop: '1px solid #222',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <span style={{ fontSize: '11px', color: '#555' }}>
          © 2026 KPRIET – Department of EEE. All rights reserved. | Built for educational purposes.
        </span>
        <span style={{ fontSize: '11px', color: '#444' }}>
          Version 1.0.0 | Last Updated: October 2026 | Server: Offline Mode
        </span>
      </div>
    </footer>
  );
};
