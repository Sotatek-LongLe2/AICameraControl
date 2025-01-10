import { AxiosRequestConfig } from "axios";
import {
  IAccessBidOfferReq,
  IAccessCompanyReq,
  IAccessDemandReq,
  IAccessPrimaryReq,
  ISaveUserActivityRes,
} from "./UserActivityService.types";
import { api } from "./config";
import { IResponse } from "./type";

export const UserActivityService = {
  accessPrimary: (data: IAccessPrimaryReq, config?: AxiosRequestConfig) => {
    return api.post<IResponse<ISaveUserActivityRes>>(
      "/user-activity/access-primary",
      data,
      config
    );
  },
  accessDemand: (data: IAccessDemandReq, config?: AxiosRequestConfig) => {
    return api.post<IResponse<ISaveUserActivityRes>>(
      "/user-activity/access-demand",
      data,
      config
    );
  },
  accessBidOffer: (data: IAccessBidOfferReq, config?: AxiosRequestConfig) => {
    return api.post<IResponse<ISaveUserActivityRes>>(
      "/user-activity/access-bid-offer",
      data,
      config
    );
  },
  accessCompany: (data: IAccessCompanyReq, config?: AxiosRequestConfig) => {
    return api.post<IResponse<ISaveUserActivityRes>>(
      "/user-activity/view-company",
      data,
      config
    );
  },
};
