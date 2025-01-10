import { AxiosRequestConfig } from "axios";
import { api } from "./config";
import { IResponse } from "./type";
import {
  IReqGetWatchlist,
  IResGetWatchlist,
  IResGetWatchlistCountry,
  IResGetWatchlistIndustry,
  IResPostWatchlist,
} from "./WatchlistService.types";
import { IReqListDataDefault } from "./AdminSecondaryService.types";

export const WatchlistService = {
  getWatchlist: (params: IReqGetWatchlist, config?: AxiosRequestConfig) => {
    return api.get<IResponse<IResGetWatchlist>>("/watch-list", {
      ...config,
      params,
    });
  },

  getWatchlistWatching: (
    params: IReqGetWatchlist,
    config?: AxiosRequestConfig
  ) => {
    return api.get<IResponse<IResGetWatchlist>>("/watch-list/watching", {
      ...config,
      params,
    });
  },

  postWatchlist: (
    companyId: number,
    isWatching?: boolean,
    config?: AxiosRequestConfig
  ) => {
    return api.post<IResponse<IResPostWatchlist>>(
      `/watch-list/${companyId}`,
      { isWatching },
      config
    );
  },

  getWatchlistCountry: (
    params: IReqListDataDefault,
    config?: AxiosRequestConfig
  ) => {
    return api.get<IResponse<IResGetWatchlistCountry>>("/watch-list/country", {
      ...config,
      params,
    });
  },

  getWatchlistIndustry: (
    params: IReqListDataDefault,
    config?: AxiosRequestConfig
  ) => {
    return api.get<IResponse<IResGetWatchlistIndustry>>(
      "/watch-list/industry",
      {
        ...config,
        params,
      }
    );
  },
};
