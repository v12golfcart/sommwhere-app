import { create } from 'zustand';

interface User {
  userId: string;
  username: string;
  tasteProfile: string | null;
}

interface AuthStore {
  // core states
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // auth actions
  login: (user: User) => void;
  logout: () => void;

  // user actions
  setUsername: (username: string) => void;
  setTasteProfile: (tasteProfile: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  isLoading: false,

  // auth actions
  login: (user: User) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false, isLoading: false }),

  // user actions
  setUsername: (username: string) =>
    set((state) => ({
      user: state.user ? { ...state.user, username } : null,
    })),
  setTasteProfile: (tasteProfile: string) =>
    set((state) => ({
      user: state.user ? { ...state.user, tasteProfile } : null,
    })),
}));
