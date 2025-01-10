import { AxiosResponse } from "axios";
import { LOCAL_STORAGE_KEY } from "src/constants/localStorage";
import { IResLogin } from "src/services/AuthService.types";
import { UserService } from "src/services/UserService";
import { IResCreatePassword } from "src/services/UserService.types";
import { IResponse } from "src/services/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthService } from "../services/AuthService";
import { api } from "../services/config";
import { useUserStore } from "./userStore";

export interface AuthState {
  token: string | null;
  isLogined: boolean;
  typeAccess: "undefined" | "partial" | "full";
  createPassword: (
    password: string,
    password_confirmation: string
  ) => Promise<AxiosResponse<IResponse<IResCreatePassword>>>;
  setIsLogined: (value: boolean) => void;
  setPartialAccess: (value: "undefined" | "partial" | "full") => void;
  login: (
    email: string,
    password: string
  ) => Promise<AxiosResponse<IResponse<IResLogin>>>;
  refreshToken: () => Promise<AxiosResponse<IResponse<IResLogin>>>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isLogined: false,
      typeAccess: "undefined",
      createPassword: async (
        password: string,
        password_confirmation: string
      ) => {
        try {
          const res = await UserService.createPassword({
            code: localStorage.getItem(LOCAL_STORAGE_KEY.INVITATION_CODE) || "",
            password: password,
            password_confirmation: password_confirmation,
          });

          if (res.data.statusCode === 201) {
            set({ isLogined: true, token: res.data.data.access_token });
          }

          return res;
        } catch (error) {
          console.error("Create password failed:", error);
          throw error;
        }
      },
      setIsLogined: (value: boolean) => {
        set({ isLogined: value });
      },
      setPartialAccess: (value: "undefined" | "partial" | "full") => {
        set({ typeAccess: value });
      },
      login: async (email: string, password: string) => {
        try {
          const response = await AuthService.login({ email, password });

          const token = response.data.data.access_token;
          set({ token });
          useUserStore.getState().setUserInfo(response.data.data);

          // Set token to axios header
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          return response;
        } catch (error) {
          console.error("Login failed:", error);
          throw error;
        }
      },
      refreshToken: async () => {
        try {
          const response = await AuthService.refresh();
          const token = response.data.data.access_token;
          set({ token });

          useUserStore.getState().setUserInfo(response.data.data);

          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          return response;
        } catch (error) {
          console.error("Refresh failed:", error);
          throw error;
        }
      },
      logout: async () => {
        try {
          // await AuthService.logout();
          set({
            token: null,
            isLogined: false,
            typeAccess: "undefined",
          });
          delete api.defaults.headers.common["Authorization"];
          localStorage.removeItem(LOCAL_STORAGE_KEY.INVITATION_CODE);
        } catch (error) {
          console.error("Logout failed:", error);
          throw error;
        }
      },
    }),
    {
      name: "auth",
    }
  )
);
