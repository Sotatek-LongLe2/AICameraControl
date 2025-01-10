import { AxiosRequestConfig } from "axios";
import {
  IAdminActiveUserDto,
  IReqForcePassword,
  IReqSaveInviteCode,
  IReqSendInvitationCode,
  IResForcePassword,
  IResInvited,
} from "./AdminService.types";
import { api } from "./config";
import { IResponse } from "./type";

export const AdminService = {
  changePassword: (data: IReqForcePassword, config?: AxiosRequestConfig) => {
    return api.put<IResponse<IResForcePassword>>(
      "/admin/change-password",
      data,
      config
    );
  },

  saveInviteCode: (data: IReqSaveInviteCode, config?: AxiosRequestConfig) => {
    return api.post<IResponse<IResInvited>>(
      "/admin/save-invite-code",
      data,
      config
    );
  },

  sendInvitationCode: (
    data: IReqSendInvitationCode,
    config?: AxiosRequestConfig
  ) => {
    return api.post<IResponse<void>>("/admin/send-invite-code", data, config);
  },

  verifyUser: (data: IAdminActiveUserDto, config?: AxiosRequestConfig) => {
    return api.put<IResponse<void>>("/admin/verify-user", data, config);
  },
};
