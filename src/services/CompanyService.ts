import { AxiosRequestConfig } from "axios";
import { api } from "./config";
import { IResponse } from "./type";
import {
  IReqCompanyList,
  IReqImportPitchBook,
  IResListCompany,
  IResListCountry,
  IResListIndustry,
  IResUploadLogo,
} from "./CompanyService.types";
import { IReqListDataDefault } from "./AdminSecondaryService.types";

export const CompanyService = {
  getListCompany: (params: IReqCompanyList, config?: AxiosRequestConfig) => {
    return api.get<IResponse<IResListCompany>>("/company", {
      ...config,
      params,
    });
  },

  getListCountry: (
    params: IReqListDataDefault,
    config?: AxiosRequestConfig
  ) => {
    return api.get<IResponse<IResListCountry>>("/company/country", {
      ...config,
      params,
    });
  },

  getListIndustry: (
    params: IReqListDataDefault,
    config?: AxiosRequestConfig
  ) => {
    return api.get<IResponse<IResListIndustry>>("/company/industry", {
      ...config,
      params,
    });
  },

  uploadLogo: (companyId: string, file: File, config?: AxiosRequestConfig) => {
    const formData = new FormData();
    formData.append("file", file);

    return api.put<IResponse<IResUploadLogo>>(
      `/company/upload-logo/${companyId}`,
      formData,
      {
        ...config,
        headers: {
          ...config?.headers,
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },

  postImportPitchBook: (
    data: IReqImportPitchBook,
    config?: AxiosRequestConfig
  ) => {
    const formData = new FormData();
    if (data.file) formData.append("file", data.file);
    return api.post<IResponse<void>>("/company/import", formData, {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
