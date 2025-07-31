import { create } from 'zustand';

interface AppStore {
  // Sommelier chat state
  sommPrompt: string;
  setSommPrompt: (prompt: string) => void;
  
  // Add more app state here as needed
}

export const useAppStore = create<AppStore>((set) => ({
  sommPrompt: '',
  setSommPrompt: (prompt: string) => set({ sommPrompt: prompt }),
}));