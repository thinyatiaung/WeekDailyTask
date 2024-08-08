import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { encryptStorage } from '@utils/encryptStore';
import { Role, User } from '@config/type';

interface AuthState {
  logout: () => void;
  expired: () => void;
  setAuth: (user: User) => void;
  isAuthorized: (user: Role, roles: Role[]) => boolean;
  accessToken: string | undefined;
  staffID: string | undefined;
  username: string | undefined;
  role: Role;
}

export const useAuth = create<AuthState, [['zustand/persist', unknown]]>(
  persist(
    (set) => ({
      accessToken: undefined,
      staffID: undefined,
      username: undefined,
      role: 'undefined',
      expired: () => set((state) => ({ ...state, sessionExpired: true })),
      isAuthorized: (role: Role, roles: Role[]) => {
        return  role? roles.includes(role) : false;
      },
      setAuth: (user: User) =>
        set(() => ({
          accessToken: user?.access_token,
          staffID: user?.staffID,
          username: user?.username,
          role: user?.role
        })),
      logout: () =>
        set(() => ({
          accessToken: undefined,
          staffID: undefined,
          username: undefined,
          role: undefined
        })),
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => encryptStorage),
    }
  )
);
