import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthUser } from '@/types/auth';

type AuthState = {
  // Short-lived access token, kept in memory only (never persisted).
  accessToken: string | null;
  // Public profile info (no secrets), persisted for a stable UI across reloads.
  user: AuthUser | null;
  setSession: (access: string, user: AuthUser) => void;
  setAccessToken: (access: string) => void;
  clearSession: () => void;
};

/** Keeps the access token in memory; only the non-secret user info is persisted. */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      setSession: (access, user) => set({ accessToken: access, user }),
      setAccessToken: (access) => set({ accessToken: access }),
      clearSession: () => set({ accessToken: null, user: null }),
    }),
    {
      name: 'ong-auth-session',
      // The refresh token lives in an httpOnly cookie; never store the access
      // token on disk. Persist only the non-secret user profile.
      partialize: (state) => ({ user: state.user }),
    },
  ),
);