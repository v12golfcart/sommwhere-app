import { create } from 'zustand';

interface AppStore {
  // Add app state here as needed
}

export const useAppStore = create<AppStore>((set) => ({
  // Empty for now - add app-wide state as needed
}));