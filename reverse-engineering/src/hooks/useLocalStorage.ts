import { useState } from 'react';
import { storage } from '../utils/storage';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = storage.get<T>(key);
    return item !== null ? item : initialValue;
  });

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    storage.set(key, valueToStore);
  };

  return [storedValue, setValue] as const;
}
