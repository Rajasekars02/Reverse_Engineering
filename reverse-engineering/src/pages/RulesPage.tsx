import React from 'react';
import { MainLayout } from '../layouts/MainLayout';

export const RulesPage: React.FC = () => {
  return (
    <MainLayout>
      <div
        style={{
          background: '#1a1a2e',
          padding: '40px 24px 30px',
          borderBottom: '3px solid #e94560',
        }}
      >
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <p style={{ color: '#e94560', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '6px' }}>
            Competition
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
            RULES & REGULATIONS
          </h1>
          <p style={{ color: '#888', fontSize: '13px', margin: 0 }}>
            Please read all rules carefully before participating.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '40px 24px' }}>

        {/* Section 1 — Eligibility: oversized heading */}
        <section style={{ marginBottom: '32px' }}>
          <h2
            style={{
              fontSize: '28px',
              fontWeight: 900,
              color: '#1a1a2e',
              margin: '0 0 14px 0',
              fontFamily: 'Georgia, serif',
              borderBottom: '3px solid #e94560',
              paddingBottom: '8px',
            }}
          >
            1. Eligibility
          </h2>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            {[
              'Open to all undergraduate students enrolled in any recognized college or university.',
              'Participants must carry a valid college ID card at the time of the event.',
              'Teams of 1 or 2 members are allowed. No team can have more than 2 members.',
              'Each participant may register for only one team.',
              'Students from all departments and years are eligible.',
              'Faculty members and organizing committee members are not eligible to participate.',
            ].map((rule, i) => (
              <li key={i} style={{ fontSize: '13px', color: '#555', marginBottom: '7px', lineHeight: 1.6 }}>
                {rule}
              </li>
            ))}
          </ul>
        </section>

        {/* Section 2 — Competition Format: tiny heading */}
        <section style={{ marginBottom: '32px', background: '#f9f9f9', padding: '20px', border: '1px solid #eee' }}>
          <h2
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#888',
              margin: '0 0 14px 0',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            2. Competition Format
          </h2>
          <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.7, marginBottom: '12px' }}>
            The competition consists of four challenges of increasing difficulty and marks value. Participants
            work to reconstruct and complete each system within the allotted time.
          </p>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            {[
              'Total duration: 3 hours.',
              'All four challenges are available from the start.',
              'Participants may attempt challenges in any order.',
              'Each challenge can only be submitted once.',
              'The competition is conducted in a single round. There are no elimination stages.',
            ].map((rule, i) => (
              <li key={i} style={{ fontSize: '13px', color: '#555', marginBottom: '6px', lineHeight: 1.6 }}>
                {rule}
              </li>
            ))}
          </ul>
        </section>

        {/* Section 3 — Challenge Rules */}
        <section style={{ marginBottom: '32px' }}>
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#1a1a2e',
              margin: '0 0 14px 0',
            }}
          >
            Challenge Rules
          </h2>

          {/* Important rule buried in a paragraph */}
          <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.7, marginBottom: '12px' }}>
            Participants are provided with problem statements, component lists, and expected system behavior.
            They are not provided with the complete solution or GPIO pin mappings. All implementation must be
            done by the participant during the competition window. Note: submitting solutions created before
            the competition begins will result in immediate disqualification.
          </p>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            {[
              'All code must be written during the competition.',
              'Use of pre-written code or libraries from outside the provided materials is not allowed.',
              'Participants must not share solutions with other teams.',
              'Hardware must not be damaged. Damaged components must be reported immediately.',
              'Each team is responsible for their own workspace.',
            ].map((rule, i) => (
              <li key={i} style={{ fontSize: '13px', color: '#555', marginBottom: '6px', lineHeight: 1.6 }}>
                {rule}
              </li>
            ))}
          </ul>
        </section>

        {/* Section 4 — Submission Rules: inconsistent spacing */}
        <section style={{ marginBottom: '8px' }}>
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#1a1a2e',
              margin: '0 0 14px 0',
            }}
          >
            Submission Rules
          </h2>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            {[
              'Solutions must be submitted via the online submission portal only.',
              'A valid solution link must be provided. Empty or broken links will not be accepted.',
              'Late submissions (after timer expires) will not be considered.',
              'Participants may save a draft at any time but must formally submit before time is up.',
              'Each challenge submission is final. Resubmissions are not allowed.',
            ].map((rule, i) => (
              <li key={i} style={{ fontSize: '13px', color: '#555', marginBottom: '6px', lineHeight: 1.6 }}>
                {rule}
              </li>
            ))}
          </ul>
        </section>

        {/* Section 5 — Time Limit: excessive top margin */}
        <section style={{ marginBottom: '32px', marginTop: '60px' }}>
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#1a1a2e',
              margin: '0 0 14px 0',
            }}
          >
            Time Limit
          </h2>
          <div
            style={{
              background: '#fff8e1',
              border: '1px solid #ffe082',
              borderLeft: '4px solid #ffc107',
              padding: '14px 16px',
              marginBottom: '12px',
            }}
          >
            <p style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#7d5a00' }}>
              Total Competition Duration: 3 Hours
            </p>
          </div>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            {[
              'The competition timer starts at 09:00 AM and ends at 12:00 PM.',
              'The countdown timer is displayed on the participant dashboard.',
              'All activity must stop once the timer reaches zero.',
              'The organizing committee may extend time at their discretion in case of technical issues.',
            ].map((rule, i) => (
              <li key={i} style={{ fontSize: '13px', color: '#555', marginBottom: '6px', lineHeight: 1.6 }}>
                {rule}
              </li>
            ))}
          </ul>
        </section>

        {/* Section 6 — Fair Play */}
        <section style={{ marginBottom: '32px' }}>
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#1a1a2e',
              margin: '0 0 14px 0',
            }}
          >
            Fair Play
          </h2>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            {[
              'Any form of plagiarism, copying, or unfair assistance will lead to disqualification.',
              'Participants must not tamper with other teams\' setups or equipment.',
              'Decisions by the judges and organizing committee are final.',
              'Participants must behave respectfully towards organizers, volunteers, and fellow participants.',
              'Use of AI-assisted code generation tools is not permitted.',
            ].map((rule, i) => (
              <li key={i} style={{ fontSize: '13px', color: '#555', marginBottom: '6px', lineHeight: 1.6 }}>
                {rule}
              </li>
            ))}
          </ul>
        </section>

        {/* Section 7 — Technical Requirements: no heading hierarchy, runs into section 8 */}
        <section style={{ marginBottom: '4px' }}>
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#1a1a2e',
              margin: '0 0 14px 0',
            }}
          >
            Technical Requirements
          </h2>
          <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.7, margin: '0 0 10px 0' }}>
            All required hardware, development tools, and software environments will be provided
            by the organizing committee. Participants are not required to bring their own equipment.
            However, participants may bring their own USB drives for backup purposes only.
          </p>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            {[
              'Arduino IDE (latest version) will be pre-installed on competition machines.',
              'All required libraries will be available.',
              'Internet access will not be available during the competition.',
            ].map((rule, i) => (
              <li key={i} style={{ fontSize: '13px', color: '#555', marginBottom: '6px', lineHeight: 1.6 }}>
                {rule}
              </li>
            ))}
          </ul>
        </section>

        {/* Section 8 — Disqualification: no gap from section 7 */}
        <section style={{ marginBottom: '32px' }}>
          <h2
            style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#dc3545',
              margin: '0 0 14px 0',
            }}
          >
            Disqualification
          </h2>
          <p style={{ fontSize: '13px', color: '#666', lineHeight: 1.7, marginBottom: '10px' }}>
            The following actions will result in immediate disqualification without appeal:
          </p>
          <ul style={{ paddingLeft: '20px', margin: 0 }}>
            {[
              'Submitting pre-written or plagiarized code.',
              'Attempting to access another team\'s submission or workspace.',
              'Damaging competition equipment intentionally.',
              'Using unauthorized internet access.',
              'Any form of misconduct or disrespectful behavior.',
              'Failure to comply with instructions from the organizing committee.',
            ].map((rule, i) => (
              <li
                key={i}
                style={{
                  fontSize: '13px',
                  color: i === 0 ? '#dc3545' : '#555',
                  marginBottom: '6px',
                  lineHeight: 1.6,
                  fontWeight: i === 0 ? 600 : 400,
                }}
              >
                {rule}
              </li>
            ))}
          </ul>
        </section>

        {/* Footer note — poorly styled */}
        <div
          style={{
            borderTop: '1px solid #eee',
            paddingTop: '20px',
            fontSize: '11px',
            color: '#bbb',
            textAlign: 'right',
          }}
        >
          Last updated: October 2026 &nbsp;|&nbsp; Version 1.0 &nbsp;|&nbsp; Subject to change without notice.
          <br />
          For queries contact: eee.events@kpriet.ac.in
        </div>
      </div>
    </MainLayout>
  );
};
