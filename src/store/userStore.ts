import { Role, Step, UserStatus } from "src/constants/enumBE";
import { IUserInfo } from "src/shared/types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export interface IProgress {
  phoneVerified: number;
  riskDisclosureSigned: number;
  step: Step;
}

interface UserStore {
  userInfo: IUserInfo;
  progress: IProgress;
  setUserInfo: (data: IUserInfo) => void;
  /**
   * Update the progress state and cause a re-render of components that depend on `progress`
   */
  setProgress: (data: Partial<IProgress>) => void;
  /**
   * Update the progress state without causing a re-render of components that depend on `progress`
   */
  updateProgress: (data: Partial<IProgress>) => void;
  clearProgress: () => void;
  clear: () => void;
}

const initialProgress: IProgress = {
  phoneVerified: 0,
  riskDisclosureSigned: 0,
  step: 0,
};

const initialUserInfo: IUserInfo = {
  id: 0,
  name: "",
  email: "",
  access_token: "",
  role: Role.USER,
  scope: "",
  status: UserStatus.PENDING,
  isChangePass: 0,
};

export const useUserStore = create<UserStore>()(
  persist(
    immer((set) => ({
      userInfo: initialUserInfo,
      progress: initialProgress,
      setUserInfo: (data: IUserInfo) => {
        set({ userInfo: data });
      },
      setProgress: (data: Partial<IProgress>) => {
        set((state) => {
          state.progress = { ...state.progress, ...data };
        });
      },
      updateProgress: (data: Partial<IProgress>) => {
        set((state) => {
          Object.entries(data).forEach(([key, value]) => {
            if (key in state.progress && value !== undefined) {
              state.progress[key as keyof IProgress] = value;
            }
          });
        });
      },
      clearProgress: () => {
        set({
          progress: initialProgress,
        });
      },
      clear: () => {
        set({
          userInfo: initialUserInfo,
          progress: initialProgress,
        });
      },
    })),
    {
      name: "user",
    }
  )
);
