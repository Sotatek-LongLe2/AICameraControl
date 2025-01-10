import { AxiosRequestConfig } from "axios";
import {
  IReqChangePassword,
  IReqLogin,
  IResChangePassword,
  IResLogin,
} from "./AuthService.types";
import { api } from "./config";
import { IResponse } from "./type";

export const AuthService = {
  login: (data: IReqLogin, config?: AxiosRequestConfig) => {
    return api.post<IResponse<IResLogin>>("/auth/login", data, config);
  },
  refresh: (config?: AxiosRequestConfig) => {
    return api.get<IResponse<IResLogin>>("/auth/token/refresh", config);
  },
  changePassword: (data: IReqChangePassword, config?: AxiosRequestConfig) => {
    return api.post<IResponse<IResChangePassword>>(
      "/auth/change-password",
      data,
      config
    );
  },
};
