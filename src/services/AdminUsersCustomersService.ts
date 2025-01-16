import { AxiosRequestConfig } from "axios";
import {
  IResGetAdminUserDetail,
  IResUserCusTomer,
} from "./AdminUsersCustomersService.type";
import { api } from "./config";
import { IResponse } from "./type";

export const AdminUsersCustomersService = {
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
};
