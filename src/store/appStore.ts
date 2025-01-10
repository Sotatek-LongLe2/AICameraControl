import { create } from "zustand";

interface AppStore {
  loading: boolean;
  setLoading: (data: boolean) => void;
}

export const useAppStore = create<AppStore>()((set) => ({
  loading: false,
  setLoading: (data: boolean) => {
    set({
      loading: data,
    });
  },
}));
