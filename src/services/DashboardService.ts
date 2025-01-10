import { AxiosRequestConfig } from "axios";
import { api } from "./config";
import { IResponse } from "./type";
import {
  IReqGetPrimaryDemand,
  IResInteraction,
  IResLastFundingRound,
  IResLRV,
  IResPrice,
  IResPrimaryDemand,
  IResSecondaryIois,
  IResTrendingNow,
} from "./DashboardService.types";

export const ChartService = {
  getLRV: (config?: AxiosRequestConfig) => {
    return api.get<IResponse<IResLRV>>("/dashboard/chart/lrv", config);
  },
  getLastFundingRound: (config?: AxiosRequestConfig) => {
    return api.get<IResponse<IResLastFundingRound>>(
      "/dashboard/chart/last-funding-round",
      config
    );
  },
  getPrice: (config?: AxiosRequestConfig) => {
    return api.get<IResponse<IResPrice>>("/dashboard/chart/price", config);
  },
  getPrimaryDemand: (
    params: IReqGetPrimaryDemand,
    config?: AxiosRequestConfig
  ) => {
    return api.get<IResponse<IResPrimaryDemand>>("/dashboard/primary-demands", {
      ...config,
      params,
    });
  },
  getInteraction: (config?: AxiosRequestConfig) => {
    return api.get<IResponse<IResInteraction>>(
      "/dashboard/interaction",
      config
    );
  },
  getSecondaryIois: (config?: AxiosRequestConfig) => {
    return api.get<IResponse<IResSecondaryIois>>(
      "/dashboard/chart/secondary-iois",
      config
    );
  },
  getTrendingNow: (config?: AxiosRequestConfig) => {
    return api.get<IResponse<IResTrendingNow>>(
      "/dashboard/trending-now",
      config
    );
  },
};
