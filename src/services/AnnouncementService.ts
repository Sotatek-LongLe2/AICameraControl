import { AxiosRequestConfig } from "axios";
import { AnnouncementType } from "src/constants/enumBE";
import {
  IReqCreateOrUpdateAnnouncement,
  IResAnnouncement,
  IResCreateOrUpdateAnnouncement,
  IResGetAnnouncementDashboard,
  IResGetLinkTo,
} from "./AnnouncementService.types";
import { api } from "./config";
import { IResponse, TResponse } from "./type";

export const AnnouncementService = {
  createOrUpdate: (
    data: IReqCreateOrUpdateAnnouncement,
    config?: AxiosRequestConfig
  ) => {
    return api.post<TResponse<IResCreateOrUpdateAnnouncement>>(
      "/announcement",
      data,
      config
    );
  },

  getList: (
    params: {
      limit?: number;
      page?: number;
    },
    config?: AxiosRequestConfig
  ) => {
    return api.get<TResponse<IResAnnouncement[]>>("/announcement", {
      ...config,
      params,
    });
  },
  getLinkTo: (
    params: {
      limit?: number;
      page?: number;
      type: AnnouncementType;
    },
    config?: AxiosRequestConfig
  ) => {
    return api.get<TResponse<IResGetLinkTo[]>>("/announcement/link-to", {
      ...config,
      params,
    });
  },

  getDetail: (id: number, config?: AxiosRequestConfig) => {
    return api.get<TResponse<IResCreateOrUpdateAnnouncement>>(
      `/announcement/${id}`,
      {
        ...config,
      }
    );
  },

  delete: function (params: { id: number }, config?: AxiosRequestConfig) {
    return api.delete<TResponse<boolean>>(`/announcement/${params.id}`, {
      ...config,
      params,
    });
  },

  getListDashboard: (
    params: {
      limit?: number;
      page?: number;
    },
    config?: AxiosRequestConfig
  ) => {
    return api.get<IResponse<IResGetAnnouncementDashboard>>(
      "/dashboard/announcements",
      {
        ...config,
        params,
      }
    );
  },
};
