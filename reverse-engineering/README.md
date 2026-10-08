# Reverse Engineering — Technical Competition Website

A web-based technical competition platform for the REVERSE ENGINEERING event organized by the Department of EEE, KPRIET.

---

## Installation

```bash
npm install
```

## Running the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Building for Production

```bash
npm run build
```

## Available Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/challenges` | Challenge List |
| `/challenges/1` | Challenge 1 — Smart Traffic Signal |
| `/challenges/2` | Challenge 2 — Digital Security Lock |
| `/challenges/3` | Challenge 3 — Automatic Street Light |
| `/challenges/4` | Challenge 4 — Temperature-Controlled Fan |
| `/how-it-works` | How It Works |
| `/rules` | Rules & Regulations |
| `/register` | Participant Registration |
| `/login` | Login |
| `/dashboard` | Participant Dashboard |
| `/submissions` | Submit Solutions |
| `/profile` | Participant Profile |
| `/admin` | Admin Dashboard |

## Technology Stack

- React 19
- TypeScript
- Vite
- React Router v6
- CSS (inline styles + global stylesheet)
- localStorage (no backend required)

## Demo Credentials

**Admin:**
- Email: `admin@kpriet.ac.in`
- Password: `Admin@123`

**Participant:** Register via `/register`, then log in with the email used during registration.
