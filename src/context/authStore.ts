import { create } from 'zustand';

type AuthState = {
  token: string | null;
  userRole: 'candidat' | 'organisation' | 'mecene' | null;
  setToken: (token: string | null) => void;
  setUserRole: (role: AuthState['userRole']) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  userRole: null,
  setToken: (token) => set({ token }),
  setUserRole: (userRole) => set({ userRole }),
  logout: () => set({ token: null, userRole: null }),
}));