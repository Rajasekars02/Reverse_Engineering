import type { AuthUser, Participant } from '../types';
import { storage, STORAGE_KEYS } from './storage';

const ADMIN_EMAIL = 'admin@kpriet.ac.in';
const ADMIN_PASSWORD = 'Admin@123';

export function loginUser(email: string, password: string): AuthUser | null {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const admin: AuthUser = {
      id: 'admin',
      email: ADMIN_EMAIL,
      name: 'Administrator',
      teamName: 'Organizers',
      isAdmin: true,
    };
    storage.set(STORAGE_KEYS.AUTH_USER, admin);
    return admin;
  }

  const registrations = storage.get<Participant[]>(STORAGE_KEYS.REGISTRATIONS) || [];
  const participant = registrations.find((p) => p.email === email);

  if (!participant) return null;

  const user: AuthUser = {
    id: participant.id,
    email: participant.email,
    name: participant.name,
    teamName: participant.teamName,
    isAdmin: false,
  };
  storage.set(STORAGE_KEYS.AUTH_USER, user);
  return user;
}

export function logoutUser(): void {
  storage.remove(STORAGE_KEYS.AUTH_USER);
}

export function getCurrentUser(): AuthUser | null {
  return storage.get<AuthUser>(STORAGE_KEYS.AUTH_USER);
}

export function isLoggedIn(): boolean {
  return getCurrentUser() !== null;
}
