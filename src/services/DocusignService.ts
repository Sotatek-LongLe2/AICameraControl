import { AxiosRequestConfig } from "axios";
import { IResGetDocusignLink } from "./DocusignService.types";
import { api } from "./config";
import { IResponse } from "./type";

export const DocusignService = {
  getDocusignLink: (config?: AxiosRequestConfig) => {
    return api.get<IResponse<IResGetDocusignLink>>("/docusign", config);
  },
};
