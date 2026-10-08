import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';

const steps = [
  {
    number: 'STEP 01',
    title: 'Read',
    desc: 'Carefully read the challenge problem statement, requirements, and expected behavior. Understand what the system is supposed to do before touching any tools or components.',
    icon: '📖',
    color: '#1a73e8',
  },
  {
    number: 'STEP 02',
    title: 'Analyze',
    desc: 'Study the provided system. Identify what is missing, broken, or incorrect. Map out the logic and figure out the gaps between the current state and the expected output.',
    icon: '🔍',
    color: '#e94560',
  },
  {
    number: 'STEP 03',
    title: 'Build',
    desc: 'Reconstruct the missing parts. Write the required code, connect components, and implement the logic to make the system functional.',
    icon: '🔧',
    color: '#28a745',
  },
  {
    number: 'STEP 04',
    title: 'Test',
    desc: 'Verify your solution against all requirements. Test edge cases, check the expected behavior described in the challenge, and ensure stability.',
    icon: '✅',
    color: '#fd7e14',
  },
  {
    number: 'STEP 05',
    title: 'Submit',
    desc: 'Upload your solution via the submission portal. Include a working link and notes describing your approach. Submit before the competition timer expires.',
    icon: '🚀',
    color: '#6f42c1',
  },
];

export const HowItWorksPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      {/* Page header */}
      <div
        style={{
          background: '#1a1a2e',
          padding: '40px 24px 30px',
          borderBottom: '3px solid #e94560',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ color: '#e94560', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>
            Guide
          </p>
          <h1
            style={{
              color: '#fff',
              fontSize: '30px',
              fontWeight: 900,
              margin: '0 0 8px 0',
              fontFamily: 'Georgia, serif',
              letterSpacing: '2px',
            }}
          >
            HOW IT WORKS
          </h1>
          <p style={{ color: '#888', fontSize: '13px', margin: 0 }}>
            Follow these five steps to compete successfully.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px' }}>

        {/* Intro */}
        <div style={{ marginBottom: '48px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#1a1a2e', margin: '0 0 12px 0', fontFamily: 'Georgia, serif' }}>
            The Competition Process
          </h2>
          <p style={{ fontSize: '14px', color: '#666', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto' }}>
            Each challenge requires you to analyze a partially implemented system and reconstruct it
            to full working condition. The process follows these five stages.
          </p>
        </div>

        {/* Steps — intentionally inconsistent layout */}
        <div style={{ position: 'relative' }}>

          {steps.map((step, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                gap: index % 2 === 0 ? '32px' : '20px',
                marginBottom: index === 2 ? '48px' : index === 4 ? '16px' : '28px',
                alignItems: index % 2 === 0 ? 'flex-start' : 'center',
                flexDirection: index % 2 !== 0 ? 'row-reverse' : 'row',
                padding: index === 2 ? '20px' : '0',
                background: index === 2 ? '#f9f9f9' : 'transparent',
                border: index === 2 ? '1px solid #eee' : 'none',
              }}
            >
              {/* Step icon/number box */}
              <div
                style={{
                  flexShrink: 0,
                  width: index % 2 === 0 ? '80px' : '64px',
                  height: index % 2 === 0 ? '80px' : '64px',
                  backgroundColor: step.color,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: index === 0 ? '50%' : index === 1 ? '0' : index === 2 ? '8px' : index === 3 ? '4px' : '50%',
                  color: '#fff',
                }}
              >
                <span style={{ fontSize: index % 2 === 0 ? '24px' : '18px' }}>{step.icon}</span>
              </div>

              {/* Step content */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '2px',
                    color: step.color,
                    marginBottom: '4px',
                    textTransform: 'uppercase',
                  }}
                >
                  {step.number}
                </div>
                <h3
                  style={{
                    margin: '0 0 8px 0',
                    fontSize: index === 0 ? '22px' : index === 2 ? '16px' : '18px',
                    fontWeight: index === 1 ? 900 : 700,
                    color: '#1a1a2e',
                    fontFamily: index % 2 === 0 ? 'Georgia, serif' : 'inherit',
                  }}
                >
                  {step.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: index === 4 ? '12px' : '13px',
                    color: index === 1 ? '#333' : '#666',
                    lineHeight: index === 3 ? 1.4 : 1.7,
                  }}
                >
                  {step.desc}
                </p>
              </div>

              {/* Step connector — only between some steps */}
              {index < 4 && index !== 1 && (
                <div
                  style={{
                    position: 'absolute',
                    left: '39px',
                    top: `${index * 120 + 90}px`,
                    width: '2px',
                    height: '20px',
                    background: '#eee',
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Scoring overview */}
        <div
          style={{
            marginTop: '56px',
            borderTop: '2px solid #eee',
            paddingTop: '40px',
          }}
        >
          <h2
            style={{
              fontSize: '14px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: '#333',
              margin: '0 0 20px 0',
            }}
          >
            Scoring Breakdown
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px',
            }}
          >
            {[
              { num: '01', title: 'Smart Traffic Signal', marks: 15, color: '#28a745' },
              { num: '02', title: 'Digital Security Lock', marks: 20, color: '#fd7e14' },
              { num: '03', title: 'Automatic Street Light', marks: 25, color: '#1a73e8' },
              { num: '04', title: 'Temperature-Controlled Fan', marks: 40, color: '#dc3545' },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  border: `2px solid ${item.color}`,
                  padding: i === 3 ? '20px 12px' : '14px 12px',
                  textAlign: 'center',
                  background: '#fff',
                }}
              >
                <div
                  style={{
                    fontSize: '11px',
                    color: '#aaa',
                    marginBottom: '4px',
                    letterSpacing: '1px',
                  }}
                >
                  {item.num}
                </div>
                <div
                  style={{
                    fontSize: '28px',
                    fontWeight: 900,
                    color: item.color,
                    lineHeight: 1,
                    marginBottom: '6px',
                    fontFamily: 'Georgia, serif',
                  }}
                >
                  {item.marks}
                </div>
                <div style={{ fontSize: '10px', color: '#888', lineHeight: 1.4 }}>{item.title}</div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: '16px',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ fontSize: '12px', color: '#888' }}>Total:</span>
            <span
              style={{
                fontSize: '22px',
                fontWeight: 900,
                color: '#1a1a2e',
                fontFamily: 'Georgia, serif',
              }}
            >
              100
            </span>
            <span style={{ fontSize: '12px', color: '#888' }}>marks</span>
          </div>
        </div>

        {/* FAQ — poor formatting */}
        <div style={{ marginTop: '48px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#1a1a2e', margin: '0 0 20px 0', fontFamily: 'Georgia, serif' }}>
            Frequently Asked Questions
          </h2>

          {[
            {
              q: 'Do I need prior knowledge of embedded systems?',
              a: 'Basic understanding of electronics and programming logic is helpful. The challenges are designed to be solvable with foundational knowledge.',
            },
            {
              q: 'Can I participate individually?',
              a: 'Yes. Teams can have 1 or 2 members. Individual participants are welcome.',
            },
            {
              q: 'What if I cannot complete all challenges?',
              a: 'Partial completion is accepted. Each completed challenge earns its respective marks. You are not penalized for incomplete challenges.',
            },
            {
              q: 'Is internet access allowed during the competition?',
              a: 'No. All required reference materials will be provided. Internet access is not permitted during the competition.',
            },
            {
              q: 'What should I bring?',
              a: 'Your college ID and registration confirmation. All hardware, tools, and software will be provided at the venue.',
            },
          ].map((faq, i) => (
            <div
              key={i}
              style={{
                marginBottom: i === 2 ? '20px' : '10px',
                padding: i % 2 === 0 ? '14px 16px' : '10px 12px',
                background: i % 2 === 0 ? '#f9f9f9' : '#fff',
                border: '1px solid #eee',
                borderLeft: i % 2 === 0 ? '3px solid #1a73e8' : '1px solid #eee',
              }}
            >
              <p
                style={{
                  margin: '0 0 6px 0',
                  fontSize: i === 0 ? '15px' : '13px',
                  fontWeight: 700,
                  color: '#222',
                }}
              >
                {faq.q}
              </p>
              <p style={{ margin: 0, fontSize: '13px', color: '#666', lineHeight: 1.6 }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: '48px',
            textAlign: 'center',
            padding: '32px',
            background: '#f0f0f0',
            border: '1px solid #ddd',
          }}
        >
          <p style={{ fontSize: '14px', color: '#555', marginBottom: '16px' }}>
            Ready to get started?
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/register')}
              style={{
                backgroundColor: '#e94560',
                color: '#fff',
                border: 'none',
                padding: '12px 28px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              Register
            </button>
            <button
              onClick={() => navigate('/challenges')}
              style={{
                backgroundColor: '#fff',
                color: '#333',
                border: '1px solid #ccc',
                padding: '11px 22px',
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              Browse Challenges
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
