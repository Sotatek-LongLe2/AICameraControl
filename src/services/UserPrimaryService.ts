import { AxiosRequestConfig } from "axios";
import {
  ICreateOrderRes,
  IPrimaryDetailRes,
  IPrimaryListReq,
  IPrimaryListRes,
  IPrimaryOrderDTO,
  IPrimaryOrderRes,
  IPrimaryWatchRes,
  IUpdateOrderRes,
  IUpdatePrimaryOrderDTO,
} from "./UserPrimaryService.types";
import { api } from "./config";
import { IResponse } from "./type";

export const UserPrimaryService = {
  createOrder: (data: IPrimaryOrderDTO, config?: AxiosRequestConfig) => {
    return api.post<IResponse<ICreateOrderRes>>(
      "/primary/user/order",
      data,
      config
    );
  },
  getOrderDetail: (id: number, config?: AxiosRequestConfig) => {
    return api.get<IResponse<IPrimaryDetailRes>>(
      `/primary/user/detail/${id}`,
      config
    );
  },
  listUserPrimaryOrders: (
    params: IPrimaryListReq,
    config?: AxiosRequestConfig
  ) => {
    return api.get<IResponse<IPrimaryListRes>>("/primary/user/primary-list", {
      ...config,
      params,
    });
  },
  getOrderByPrimaryId: (id: number, config?: AxiosRequestConfig) => {
    return api.get<IResponse<IPrimaryOrderRes>>(
      `/primary/user/order/${id}`,
      config
    );
  },
  updateOrder: (data: IUpdatePrimaryOrderDTO, config?: AxiosRequestConfig) => {
    return api.put<IResponse<IUpdateOrderRes>>(
      "/primary/user/order",
      data,
      config
    );
  },

  getDocument: (params: { id: number }, config?: AxiosRequestConfig) => {
    return api.get<IResponse<any>>(`/primary/document/${params.id}`, {
      ...config,
      params,
    });
  },

  trackPrimary: (
    primaryId: number,
    isWatching?: boolean,
    config?: AxiosRequestConfig
  ) => {
    return api.post<IResponse<any>>(
      `/primary/user/watch/${primaryId}`,
      { isWatching },
      config
    );
  },

  getWatchPrimaryByPrimaryId: (id: number, config?: AxiosRequestConfig) => {
    return api.get<IResponse<IPrimaryWatchRes>>(
      `/primary/user/watch/${id}`,
      config
    );
  },
};
