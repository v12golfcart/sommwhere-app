import { create } from 'zustand';

interface CaptureSessionStore {
  // Photo data
  photoUri: string | null;
  setPhotoUri: (uri: string | null) => void;
  
  // AI context (moved from appStore)
  sommPrompt: string;
  setSommPrompt: (prompt: string) => void;
  
  // Clear session
  clearSession: () => void;
}

export const useCaptureSessionStore = create<CaptureSessionStore>((set) => ({
  // Initial state
  photoUri: null,
  sommPrompt: '',
  
  // Actions
  setPhotoUri: (uri) => set({ photoUri: uri }),
  setSommPrompt: (prompt) => set({ sommPrompt: prompt }),
  
  // Clear entire session
  clearSession: () => set({
    photoUri: null,
    sommPrompt: '',
  }),
}));