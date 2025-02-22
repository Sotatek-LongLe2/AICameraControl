import { AxiosRequestConfig } from "axios";
import {
  IParamsGetIndications,
  IPersonalDetail,
  IReqCreatePassword,
  IReqForgotPassword,
  IReqResetPassword,
  IReqVerifyIdentity,
  IResCreatePassword,
  IResGetMe,
  IResResetPassword,
  IResTimeResendEmail,
  IResVerifyIdentity,
  TResponseGetIndication,
} from "./UserService.types";
import { api } from "./config";
import { IResponse, TResponse } from "./type";

export const UserService = {
  createPassword: (data: IReqCreatePassword, config?: AxiosRequestConfig) => {
    return api.post<IResponse<IResCreatePassword>>(
      "/user/create-password",
      data,
      config
    );
  },
  getMe: (config?: AxiosRequestConfig) => {
    return api.get<IResponse<IResGetMe>>("/user", config);
  },
  sendMailResetPassword: (
    data: IReqForgotPassword,
    config?: AxiosRequestConfig
  ) => {
    return api.post<IResponse<IResTimeResendEmail>>(
      "/user/send-mail-reset-password",
      data,
      config
    );
  },
  resetPassword: (data: IReqResetPassword, config?: AxiosRequestConfig) => {
    return api.put<IResponse<IResResetPassword>>(
      "/user/reset-password",
      data,
      config
    );
  },

  checkExpiresInMail: (email: string, config?: AxiosRequestConfig) => {
    return api.get<IResponse<void>>("/user/check-expires-in-mail", {
      ...config,
      params: { email },
    });
  },
  verifyIdentity: (data: IReqVerifyIdentity, config?: AxiosRequestConfig) => {
    const formData = new FormData();
    if (data.photoid) formData.append("photoid", data.photoid);
    if (data.selfie) formData.append("selfie", data.selfie);
    formData.append("createNewStep", data.createNewStep.toString());
    formData.append("isCompany", data.isCompany.toString());
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    return api.post<IResponse<IResVerifyIdentity>>(
      "/user-info/verify-identity",
      formData,
      {
        ...config,
        headers: {
          ...config?.headers,
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
  checkTimeResendEmail: (email: string, config?: AxiosRequestConfig) => {
    return api.get<IResponse<IResTimeResendEmail>>("/user/wait-time", {
      ...config,
      params: { email },
    });
  },

  getPersonalDetail: (config?: AxiosRequestConfig) =>
    api.get<TResponse<IPersonalDetail>>("/user/personal-detail", {
      ...config,
    }),

  getIndications: (
    params: IParamsGetIndications,
    config?: AxiosRequestConfig
  ) =>
    api.get<TResponseGetIndication>("/user/indications", {
      ...config,
      params,
    }),

  deleteDemand: (
    params: { id: string | number },
    config?: AxiosRequestConfig
  ) =>
    api.delete<TResponse<boolean>>(`/user/demands/${params.id}`, {
      ...config,
      params,
    }),

  deleteOffers: (
    params: { id: string | number },
    config?: AxiosRequestConfig
  ) =>
    api.delete<TResponse<boolean>>(`/user/bids-offers/${params.id}`, {
      ...config,
      params,
    }),
};
