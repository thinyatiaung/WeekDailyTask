import { StateStorage } from 'zustand/middleware';
import { ENCRYPT_KEY } from '@config/const';
import { decrypt, encrypt } from './auth';

export const encryptStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const raw = localStorage.getItem(name);
    if (!raw) return null;
    return decrypt(raw, ENCRYPT_KEY);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    const raw = encrypt(value, ENCRYPT_KEY);
    return localStorage.setItem(name, raw);
  },
  removeItem: async (name: string): Promise<void> => {
    localStorage.removeItem(name);
  },
};
