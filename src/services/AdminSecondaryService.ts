import { AxiosRequestConfig } from "axios";
import {
  IReqGetAdminSecondaryList,
  IReqListDataDefault,
  IResGetAdminSecondaryList,
  IResListCompany,
  IResListUser,
  IResDeleteSecondary,
  IResRestoreSecondary,
  IReqSecondaryIndication,
  IResSecondaryIndication,
  IResGetListOrder,
  IResGetListAdmins,
  IResPutAssignTo,
  IResSecondaryById,
  IResGetIOIBuySellDetail,
  IResGetIOIDetail,
  ISecondaryIOIUpdateReq,
  ISecondaryIOIUpdateRes,
} from "./AdminSecondaryService.types";
import { api } from "./config";
import { IResponse } from "./type";

export const AdminSecondaryService = {
  getSecondaryList: (
    params: IReqGetAdminSecondaryList,
    config?: AxiosRequestConfig
  ) => {
    return api.get<IResponse<IResGetAdminSecondaryList>>("/secondary", {
      ...config,
      params,
    });
  },

  getListUser: (params: IReqListDataDefault, config?: AxiosRequestConfig) => {
    return api.get<IResponse<IResListUser>>("/secondary/list/user", {
      ...config,
      params,
    });
  },

  getListCompany: (
    params: IReqListDataDefault,
    config?: AxiosRequestConfig
  ) => {
    return api.get<IResponse<IResListCompany>>("/company", {
      ...config,
      params,
    });
  },

  getListAdminCompany: (
    params: IReqListDataDefault,
    config?: AxiosRequestConfig
  ) => {
    return api.get<IResponse<IResListCompany>>("/admin/company", {
      ...config,
      params,
    });
  },

  deleteSecondary: (
    params: { secondaryId: number },
    config?: AxiosRequestConfig
  ) => {
    return api.delete<IResponse<IResDeleteSecondary>>(
      `/secondary/${params.secondaryId}`,
      {
        ...config,
        params,
      }
    );
  },

  restoreSecondary: (
    params: { secondaryId: number },
    config?: AxiosRequestConfig
  ) => {
    return api.put<IResponse<IResRestoreSecondary>>(
      `/secondary/restore/${params.secondaryId}`,
      config
    );
  },

  getIOIDetail: (params: { id: number }, config?: AxiosRequestConfig) => {
    return api.get<IResponse<IResGetIOIDetail>>(`/secondary/${params.id}`, {
      ...config,
      params,
    });
  },

  getListOrder: (
    params: { secondaryId: number },
    config?: AxiosRequestConfig
  ) => {
    return api.get<IResponse<IResGetListOrder>>(`/secondary/list/order`, {
      ...config,
      params,
    });
  },

  getListAdmins: (
    params: { page: number; limit: number },
    config?: AxiosRequestConfig
  ) => {
    return api.get<IResponse<IResGetListAdmins>>(`secondary/list/admin`, {
      ...config,
      params,
    });
  },

  createOrUpdateSecondIndication: (
    data: IReqSecondaryIndication,
    config?: AxiosRequestConfig
  ) => {
    return api.post<IResponse<IResSecondaryIndication>>(
      "/secondary",
      data,
      config
    );
  },

  putAssignTo: (
    data: {
      secondaryId: number;
      orderId: number;
      adminId: number;
    },
    config?: AxiosRequestConfig
  ) => {
    return api.put<IResponse<IResPutAssignTo>>(
      "/secondary/match",
      data,
      config
    );
  },

  getSecondaryById: (
    params: { secondaryId: number },
    config?: AxiosRequestConfig
  ) => {
    return api.get<IResponse<IResSecondaryById>>(
      `/secondary/${params.secondaryId}`,
      {
        ...config,
        params,
      }
    );
  },

  getIOIBuySellDetail: (
    params: { ioiId: number },
    config?: AxiosRequestConfig
  ) => {
    return api.get<IResponse<IResGetIOIBuySellDetail>>(
      `/secondary/detail/${params.ioiId}`,
      {
        ...config,
      }
    );
  },

  updateIOI: (data: ISecondaryIOIUpdateReq, config?: AxiosRequestConfig) => {
    return api.put<IResponse<ISecondaryIOIUpdateRes>>(
      "/secondary/update",
      data,
      config
    );
  },
};
