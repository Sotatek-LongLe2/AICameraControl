import { AxiosRequestConfig } from "axios";
import {
  IReqCreateOrUpdateUserCustomer,
  IResCreateOrUpdateUserCustomer,
  IResCustomerList,
  IResUserCusTomer,
  IResGetAdminUserDetail,
  IResGetUserOverview,
  IParamRequestTimeline,
  IResGetTimeline,
  IParamRequestDownloadDocs,
} from "./AdminUsersCustomersService.type";
import { api } from "./config";
import { IResponse } from "./type";
import { InviteStatus } from "src/constants/enumBE";

export const AdminUsersCustomersService = {
  createUserCustomer: (
    data: IReqCreateOrUpdateUserCustomer,
    config?: AxiosRequestConfig
  ) => {
    return api.post<IResponse<IResCreateOrUpdateUserCustomer>>(
      "/admin/user",
      data,
      config
    );
  },

  updateUserCustomer: (
    data: IReqCreateOrUpdateUserCustomer,
    config?: AxiosRequestConfig
  ) => {
    return api.put<IResponse<IResCreateOrUpdateUserCustomer>>(
      "/admin/user",
      data,
      config
    );
  },

  listInvited: <T extends InviteStatus>(
    params: {
      limit?: number;
      page?: number;
      status?: T;
      customerFilter?: string | undefined;
      companyFilter?: string | undefined;
    },
    config?: AxiosRequestConfig
  ) => {
    return api.get<IResponse<IResCustomerList<T>>>("/admin/list-user", {
      ...config,
      params,
    });
  },

  getAdminUserDetail: (
    params: { userId: number },
    config?: AxiosRequestConfig
  ) => {
    return api.get<IResponse<IResGetAdminUserDetail>>(
      `/admin/user/${params.userId}`,
      {
        ...config,
        params,
      }
    );
  },

  deleteUser: function (params: { id: number }, config?: AxiosRequestConfig) {
    return api.delete<IResponse<IResUserCusTomer>>(
      `/admin/deleted/${params.id}`,
      {
        ...config,
        params,
      }
    );
  },

  restoreUser: function (params: { id: number }, config?: AxiosRequestConfig) {
    return api.put<IResponse<IResUserCusTomer>>(`/admin/restore/${params.id}`, {
      ...config,
      params,
    });
  },

  withdrawInvitationUser: function (
    params: { invitedId: number },
    config?: AxiosRequestConfig
  ) {
    return api.put<IResponse<IResUserCusTomer>>(
      `/admin/withdraw-invitation/${params.invitedId}`,
      {
        ...config,
        params,
      }
    );
  },

  verifyUser: function (
    params: { userId: number; status: number },
    config?: AxiosRequestConfig
  ) {
    return api.put<IResponse<IResUserCusTomer>>(`/admin/verify-user`, params, {
      ...config,
    });
  },

  getUserOverview: (
    params: { userId: number },
    config?: AxiosRequestConfig
  ) => {
    return api.get<IResponse<IResGetUserOverview>>(
      `/user-activity/user-overview/${params.userId}`,
      {
        ...config,
        params,
      }
    );
  },

  getTimeline: (params: IParamRequestTimeline, config?: AxiosRequestConfig) => {
    return api.get<IResponse<IResGetTimeline>>("/user-activity/timeline", {
      ...config,
      params,
    });
  },

  getDownloadDocs: (
    params: IParamRequestDownloadDocs,
    config?: AxiosRequestConfig
  ) => {
    return api.get<IResponse<any>>("/user-info/download-docs", {
      ...config,
      params,
      responseType: "blob",
    });
  },
};
