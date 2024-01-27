import { create } from 'zustand';

interface LoadingState {
  requestCount: number;
  setLoading: (isLoading: boolean) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  requestCount: 0,
  setLoading: (isLoading: boolean) =>
    set((state) => ({
      requestCount: isLoading
        ? state.requestCount + 1
        : Math.max(0, state.requestCount - 1),
    })),
}));
