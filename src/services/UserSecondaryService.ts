import { AxiosRequestConfig } from "axios";
import {
  ICompanyListRes,
  ICompanyReq,
  ICountryListRes,
  ICountryReq,
  IndustryReq,
  IndustryRes,
  ISecondaryDetailReq,
  ISecondaryDetailRes,
  ISecondaryListReq,
  ISecondaryListRes,
  ISecondaryOrderReq,
  ISecondaryOrderRes,
  IUserSecondaryOrderReq,
  IUserSecondaryOrderRes,
} from "./UserSecondaryService.types";
import { api } from "./config";
import { IResponse } from "./type";

export const UserSecondaryService = {
  listCountries: (params: ICountryReq, config?: AxiosRequestConfig) => {
    return api.get<IResponse<ICountryListRes>>("/secondary/user/country", {
      ...config,
      params,
    });
  },
  listCompanies: (params: ICompanyReq, config?: AxiosRequestConfig) => {
    return api.get<IResponse<ICompanyListRes>>("/secondary/user/company", {
      ...config,
      params,
    });
  },
  listIndustries: (params: IndustryReq, config?: AxiosRequestConfig) => {
    return api.get<IResponse<IndustryRes>>("/secondary/user/industry", {
      ...config,
      params,
    });
  },
  listSecondary: (params: ISecondaryListReq, config?: AxiosRequestConfig) => {
    return api.get<IResponse<ISecondaryListRes>>("/secondary/user/secondary", {
      ...config,
      params,
    });
  },
  getDetail: (params: ISecondaryDetailReq, config?: AxiosRequestConfig) => {
    return api.get<IResponse<ISecondaryDetailRes>>(
      "/secondary/user/secondary/detail",
      {
        ...config,
        params,
      }
    );
  },
  placeOrder: (data: ISecondaryOrderReq, config?: AxiosRequestConfig) => {
    return api.put<IResponse<ISecondaryOrderRes>>(
      "/secondary/user/place-order",
      data,
      config
    );
  },
  getOrder: (params: IUserSecondaryOrderReq, config?: AxiosRequestConfig) => {
    return api.get<IResponse<IUserSecondaryOrderRes>>(
      `/secondary/user/order/${params.secondaryId}`,
      {
        ...config,
      }
    );
  },
};
