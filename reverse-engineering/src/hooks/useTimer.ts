import { useState, useEffect, useRef } from 'react';
import { storage, STORAGE_KEYS } from '../utils/storage';

const COMPETITION_DURATION_MS = 3 * 60 * 60 * 1000;

export function useTimer() {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isExpired, setIsExpired] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let endTime = storage.get<number>(STORAGE_KEYS.TIMER_END);

    if (!endTime) {
      endTime = Date.now() + COMPETITION_DURATION_MS;
      storage.set(STORAGE_KEYS.TIMER_END, endTime);
    }

    const tick = () => {
      const remaining = endTime! - Date.now();
      if (remaining <= 0) {
        setTimeLeft(0);
        setIsExpired(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
      } else {
        setTimeLeft(remaining);
      }
    };

    tick();
    intervalRef.current = setInterval(tick, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const formatTime = (ms: number): string => {
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return { timeLeft, isExpired, formatted: formatTime(timeLeft) };
}
