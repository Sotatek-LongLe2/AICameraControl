import { AxiosRequestConfig } from "axios";
import { api } from "./config";
import { IResponse } from "./type";
import {
  IReqListAdmin,
  IReqPostAdmin,
  IResDeleteAdmin,
  IResDetailAdmin,
  IResListAdmin,
  IResPostAdmin,
} from "./AdminManagementService.types";

export const AdminManagementService = {
  postAdmin: (data: IReqPostAdmin, config?: AxiosRequestConfig) => {
    return api.post<IResponse<IResPostAdmin>>("/admin", data, config);
  },

  getListAdmin: (params: IReqListAdmin, config?: AxiosRequestConfig) => {
    return api.get<IResponse<IResListAdmin>>("/admin/list-admin", {
      ...config,
      params,
    });
  },

  deleteAdmin: (params: { adminId: number }, config?: AxiosRequestConfig) => {
    return api.delete<IResponse<IResDeleteAdmin>>(`/admin/${params.adminId}`, {
      ...config,
      params,
    });
  },

  getDetailAdmin: (
    params: { adminId: number },
    config?: AxiosRequestConfig
  ) => {
    return api.get<IResponse<IResDetailAdmin>>(
      `/admin/detail/${params.adminId}`,
      {
        ...config,
        params,
      }
    );
  },
};
