const PREFIX = 're_comp_';

export const storage = {
  get<T>(key: string): T | null {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      if (!raw) return null;
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch {
      console.error('Storage write failed');
    }
  },

  remove(key: string): void {
    localStorage.removeItem(PREFIX + key);
  },

  clear(): void {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(PREFIX))
      .forEach((k) => localStorage.removeItem(k));
  },
};

export const STORAGE_KEYS = {
  AUTH_USER: 'auth_user',
  REGISTRATIONS: 'registrations',
  SUBMISSIONS: 'submissions',
  CHALLENGE_PROGRESS: 'challenge_progress',
  TIMER_END: 'timer_end',
  PROFILE: 'profile',
};
