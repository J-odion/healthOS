import { create } from 'zustand';

interface SessionState {
  isClinicalSessionActive: boolean;
  setClinicalSessionActive: (active: boolean) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  isClinicalSessionActive: false,
  setClinicalSessionActive: (active) => set({ isClinicalSessionActive: active }),
}));
