import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthTokens, AuthUser } from '@/types/auth';

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  setSession: (tokens: AuthTokens, user: AuthUser) => void;
  setAccessToken: (accessToken: string) => void;
  setTokens: (access: string, refresh: string) => void;
  clearSession: () => void;
  clearTokens: () => void;
};

/** Persists only the JWT session information; profile data is refreshed after login. */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      setSession: (tokens, user) =>
        set({ accessToken: tokens.access, refreshToken: tokens.refresh, user }),
      setAccessToken: (accessToken) => set({ accessToken }),
      setTokens: (access, refresh) =>
        set({ accessToken: access, refreshToken: refresh }),
      clearSession: () => set({ accessToken: null, refreshToken: null, user: null }),
      clearTokens: () => set({ accessToken: null, refreshToken: null }),
    }),
    { name: 'ong-auth-session' },
  ),
);
