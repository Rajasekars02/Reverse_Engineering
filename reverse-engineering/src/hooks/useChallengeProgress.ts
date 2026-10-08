import type { ChallengeProgress, ChallengeStatus } from '../types';
import { storage, STORAGE_KEYS } from '../utils/storage';
import { useState } from 'react';

const defaultProgress: ChallengeProgress[] = [
  { challengeId: 1, status: 'available' },
  { challengeId: 2, status: 'available' },
  { challengeId: 3, status: 'available' },
  { challengeId: 4, status: 'locked' },
];

export function useChallengeProgress() {
  const [progress, setProgress] = useState<ChallengeProgress[]>(() => {
    return storage.get<ChallengeProgress[]>(STORAGE_KEYS.CHALLENGE_PROGRESS) || defaultProgress;
  });

  const updateStatus = (challengeId: number, status: ChallengeStatus) => {
    const updated = progress.map((p) =>
      p.challengeId === challengeId
        ? { ...p, status, startedAt: status === 'inprogress' ? new Date().toISOString() : p.startedAt }
        : p
    );
    setProgress(updated);
    storage.set(STORAGE_KEYS.CHALLENGE_PROGRESS, updated);
  };

  const getStatus = (challengeId: number): ChallengeStatus => {
    const found = progress.find((p) => p.challengeId === challengeId);
    return found ? found.status : 'available';
  };

  return { progress, updateStatus, getStatus };
}
