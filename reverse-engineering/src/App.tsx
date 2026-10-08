import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ChallengesPage } from './pages/ChallengesPage';
import { ChallengePage } from './pages/ChallengePage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { SubmissionsPage } from './pages/SubmissionsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route path="/challenges/:id" element={<ChallengePage />} />
        {/* Intentional: /how-it-works route is registered AFTER a catch-all-style wildcard
            so direct navigation to /how-it-works works, but the Navbar link
            points to /how-it-works while an old link elsewhere points to /howitworks */}
        <Route path="/how-it-works" element={<Navigate to="/login" replace />} />
        <Route path="/rules" element={<Navigate to="/" replace />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/submission" element={<Navigate to="/dashboard?broken=true" replace />} />
        <Route path="/submissions" element={<SubmissionsPage />} />
        <Route path="/profile" element={<Navigate to="/" replace />} />
        <Route path="/admin" element={<Navigate to="/" replace />} />
        <Route path="/challenge" element={<Navigate to="/challenges/999" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f4f4f4',
        fontFamily: 'sans-serif',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontSize: '80px',
          fontWeight: 900,
          color: '#e8e8e8',
          fontFamily: 'Georgia, serif',
          lineHeight: 1,
        }}
      >
        404
      </div>
      <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#333', margin: '12px 0 8px' }}>
        Page Not Found
      </h1>
      <p style={{ fontSize: '13px', color: '#888', marginBottom: '24px' }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <a
        href="/"
        style={{
          backgroundColor: '#1a73e8',
          color: '#fff',
          textDecoration: 'none',
          padding: '10px 24px',
          fontSize: '13px',
          fontWeight: 600,
        }}
      >
        Back to Home
      </a>
    </div>
  );
}

export default App;
