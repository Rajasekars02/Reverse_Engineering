import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { ChallengeCard } from '../components/ChallengeCard';
import { challenges } from '../data/challenges';

const stats = [
  { label: 'Total Challenges', value: '4' },
  { label: 'Total Marks', value: '100' },
  { label: 'Registered Teams', value: '48' },
  { label: 'Duration', value: '3 Hours' },
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      {/* HERO */}
      <div
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)',
          padding: '80px 24px 60px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-40px',
            left: '-40px',
            width: '200px',
            height: '200px',
            background: 'rgba(233,69,96,0.08)',
            borderRadius: '50%',
          }}
        />

        <img
          src="/logo.png"
          alt=""
          style={{ width: '180px', marginBottom: '10px', display: 'block', margin: '0 auto 16px' }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />

        <div
          style={{
            display: 'inline-block',
            background: '#e94560',
            color: '#fff',
            fontSize: '10px',
            letterSpacing: '3px',
            padding: '4px 12px',
            marginBottom: '20px',
            textTransform: 'uppercase',
          }}
        >
          KPRIET – Department of EEE Presents
        </div>

        <h1
          style={{
            color: '#fff',
            fontFamily: 'Georgia, serif',
            fontSize: '64px',
            fontWeight: 900,
            letterSpacing: '4px',
            margin: '0 0 4px 0',
            lineHeight: 1,
            textShadow: '2px 2px 0px rgba(233,69,96,0.4)',
          }}
        >
          REVERSE
        </h1>
        <h1
          style={{
            color: '#e94560',
            fontFamily: 'Georgia, serif',
            fontSize: '64px',
            fontWeight: 900,
            letterSpacing: '4px',
            margin: '0 0 20px 0',
            lineHeight: 1,
          }}
        >
          ENGINEERING
        </h1>

        <p
          style={{
            color: '#aaa',
            fontSize: '13px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: '40px',
          }}
        >
          Observe &nbsp;·&nbsp; Analyze &nbsp;·&nbsp; Reconstruct &nbsp;·&nbsp; Solve
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/challenges')}
            style={{
              backgroundColor: '#e94560',
              color: '#fff',
              border: 'none',
              padding: '14px 32px',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '1px',
              cursor: 'pointer',
              textTransform: 'uppercase',
            }}
          >
            VIEW CHALLENGES
          </button>

          <button
            onClick={() => navigate('/rules')}
            style={{
              backgroundColor: 'transparent',
              color: '#fff',
              border: '2px solid #fff',
              padding: '12px 28px',
              fontSize: '13px',
              cursor: 'pointer',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            Learn More
          </button>

          <Link
            to="/register"
            style={{
              backgroundColor: '#ffd700',
              color: '#111',
              textDecoration: 'none',
              padding: '10px 20px',
              fontSize: '12px',
              fontWeight: 900,
              letterSpacing: '0.5px',
              display: 'inline-block',
              border: '3px double #aaa',
            }}
          >
            REGISTER NOW →
          </Link>
        </div>

        <p style={{ color: '#555', fontSize: '10px', marginTop: '30px' }}>
          * Registration closes 30 minutes before competition start
        </p>
      </div>

      {/* STATS */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #eee' }}>
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                padding: i === 0 ? '24px 16px 24px 0' : '24px 16px',
                borderRight: i < stats.length - 1 ? '1px solid #eee' : 'none',
                textAlign: i % 2 === 0 ? 'center' : 'left',
              }}
            >
              <div
                style={{
                  fontSize: i === 1 ? '36px' : '28px',
                  fontWeight: 900,
                  color: i === 0 ? '#1a73e8' : i === 1 ? '#e94560' : i === 2 ? '#28a745' : '#ff9800',
                  lineHeight: 1,
                  marginBottom: '4px',
                  fontFamily: 'Georgia, serif',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: '#888',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT SECTION */}
      <div style={{ padding: '60px 24px 40px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
          <div>
            <p
              style={{
                fontSize: '10px',
                color: '#e94560',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginBottom: '8px',
                fontWeight: 700,
              }}
            >
              About the Competition
            </p>
            <h2
              style={{
                fontSize: '28px',
                fontWeight: 800,
                color: '#1a1a2e',
                margin: '0 0 16px 0',
                lineHeight: 1.3,
                fontFamily: 'Georgia, serif',
              }}
            >
              Can You Reverse-Engineer
              <br />a Working System?
            </h2>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.8, marginBottom: '14px' }}>
              REVERSE ENGINEERING is a technical competition where participants are given
              incomplete systems and must analyze, understand, and reconstruct them to working condition.
            </p>
            <p style={{ color: '#555', fontSize: '13px', lineHeight: 1.7 }}>
              The competition tests your ability to observe system behavior, identify missing
              components, understand logic, and rebuild functionality from scratch — a critical
              skill in any engineering discipline.
            </p>
            <div style={{ marginTop: '24px' }}>
              <Link
                to="/how-it-works"
                style={{
                  color: '#1a73e8',
                  textDecoration: 'none',
                  fontSize: '13px',
                  fontWeight: 600,
                  borderBottom: '1px solid #1a73e8',
                  paddingBottom: '2px',
                }}
              >
                How does it work? →
              </Link>
            </div>
          </div>

          <div
            style={{
              background: '#f9f9f9',
              border: '1px solid #eee',
              borderLeft: '4px solid #e94560',
              padding: '24px',
            }}
          >
            <h3 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 700, color: '#333' }}>
              Competition Details
            </h3>
            {[
              { label: 'Date', value: 'October 8, 2026' },
              { label: 'Time', value: '09:00 AM – 12:00 PM' },
              { label: 'Venue', value: 'KPRIET, Seminar Hall - Block C' },
              { label: 'Organized by', value: 'Dept. of EEE, KPRIET' },
              { label: 'Mode', value: 'Individual / Team (Max 2)' },
              { label: 'Total Marks', value: '100 Marks' },
              { label: 'Registration Fee', value: 'Free' },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  padding: '7px 0',
                  borderBottom: '1px solid #eee',
                  fontSize: '13px',
                  gap: '8px',
                }}
              >
                <span style={{ color: '#888', minWidth: '110px', flexShrink: 0 }}>{item.label}</span>
                <span style={{ color: '#222', fontWeight: 500 }}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CHALLENGES PREVIEW */}
      <div style={{ background: '#f0f0f0', padding: '50px 24px', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ marginBottom: '30px' }}>
            <p
              style={{
                fontSize: '10px',
                color: '#e94560',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontWeight: 700,
                marginBottom: '6px',
              }}
            >
              Competition Challenges
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px' }}>
              <h2
                style={{
                  margin: 0,
                  fontSize: '24px',
                  fontWeight: 800,
                  color: '#1a1a2e',
                  fontFamily: 'Georgia, serif',
                }}
              >
                Four Challenges. 100 Marks.
              </h2>
              <Link
                to="/challenge"
                style={{
                  fontSize: '12px',
                  color: '#1a73e8',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                View All →
              </Link>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '16px',
              alignItems: 'stretch',
            }}
          >
            {challenges.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </div>
      </div>

      {/* WHY PARTICIPATE */}
      <div style={{ padding: '60px 24px', maxWidth: '1100px', margin: '0 auto' }}>
        <p
          style={{
            fontSize: '10px',
            color: '#e94560',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            fontWeight: 700,
            marginBottom: '8px',
            textAlign: 'center',
          }}
        >
          Why Participate
        </p>
        <h2
          style={{
            textAlign: 'center',
            fontSize: '24px',
            fontWeight: 800,
            color: '#1a1a2e',
            margin: '0 0 36px 0',
            fontFamily: 'Georgia, serif',
          }}
        >
          What You Will Gain
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {[
            {
              icon: '🔍',
              title: 'Analytical Thinking',
              desc: 'Train your mind to analyze systems, identify gaps, and reconstruct logic from incomplete information.',
              color: '#e8f0fe',
            },
            {
              icon: '⚡',
              title: 'Hands-on Experience',
              desc: 'Work with real embedded systems and hardware to solve practical engineering problems under time pressure.',
              color: '#fce8e6',
            },
            {
              icon: '🏆',
              title: 'Recognition',
              desc: 'Top performers receive certificates and recognition from the Department of EEE at KPRIET.',
              color: '#e6f4ea',
            },
            {
              icon: '🤝',
              title: 'Teamwork',
              desc: 'Collaborate with your partner, divide tasks efficiently, and solve challenges together.',
              color: '#fff8e1',
            },
            {
              icon: '📐',
              title: 'Problem Solving',
              desc: 'Develop systematic troubleshooting skills applicable across all areas of engineering.',
              color: '#f3e8fd',
            },
            {
              icon: '💡',
              title: 'Innovation',
              desc: 'Think creatively to reconstruct systems in ways that may differ from the original design.',
              color: '#e8f5e9',
            },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                backgroundColor: item.color,
                padding: i % 2 === 0 ? '20px' : '16px 20px',
                borderRadius: '4px',
                border: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>{item.icon}</div>
              <h3
                style={{
                  margin: '0 0 8px 0',
                  fontSize: i % 3 === 0 ? '16px' : '14px',
                  fontWeight: 700,
                  color: '#1a1a2e',
                }}
              >
                {item.title}
              </h3>
              <p style={{ margin: 0, fontSize: '12px', color: '#555', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          background: '#1a1a2e',
          padding: '50px 24px',
          textAlign: 'center',
        }}
      >
        <h2
          style={{
            color: '#fff',
            fontSize: '26px',
            fontWeight: 800,
            margin: '0 0 12px 0',
            fontFamily: 'Georgia, serif',
          }}
        >
          Ready to Compete?
        </h2>
        <p style={{ color: '#aaa', fontSize: '13px', marginBottom: '28px' }}>
          Registrations are open. Secure your spot before it fills up.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/register')}
            style={{
              backgroundColor: '#e94560',
              color: '#fff',
              border: 'none',
              padding: '14px 36px',
              fontSize: '14px',
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: '1px',
              textTransform: 'uppercase',
            }}
          >
            Register Now
          </button>
          <button
            onClick={() => {}}
            style={{
              backgroundColor: 'transparent',
              color: '#aaa',
              border: '1px solid #444',
              padding: '13px 24px',
              fontSize: '13px',
              cursor: 'pointer',
              letterSpacing: '0.5px',
            }}
          >
            Download Brochure
          </button>
        </div>
        <p style={{ color: '#444', fontSize: '11px', marginTop: '20px' }}>
          Questions? Email us at eee.events@kpriet.ac.in
        </p>
      </div>
    </MainLayout>
  );
};
