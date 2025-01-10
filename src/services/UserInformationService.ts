import { AxiosRequestConfig } from "axios";
import {
  IReqUpdatePhoneNumber,
  IResUpdatePhoneNumber,
  IReqVerifyPhoneNumber,
  IResVerifyPhoneNumber,
  IResCurrentStep,
  IReqSaveIdentity,
  IReqSaveFinance,
  IReqSaveEligibility,
  IReqSaveRiskProfile,
  IResStepResponse,
} from "./UserInformationService.types";
import { api } from "./config";
import { IResponse } from "./type";

export const UserInformationService = {
  updatePhoneNumber: (
    data: IReqUpdatePhoneNumber,
    config?: AxiosRequestConfig
  ) => {
    return api.put<IResponse<IResUpdatePhoneNumber>>(
      "/user-info/phone-number",
      data,
      config
    );
  },
  verifyPhoneNumber: (
    data: IReqVerifyPhoneNumber,
    config?: AxiosRequestConfig
  ) => {
    return api.put<IResponse<IResVerifyPhoneNumber>>(
      "/user-info/phone-number/verify",
      data,
      config
    );
  },
  getCurrentStep: (config?: AxiosRequestConfig) => {
    return api.get<IResponse<IResCurrentStep>>(
      "/user-info/current-step",
      config
    );
  },
  saveIdentity: (data: IReqSaveIdentity, config?: AxiosRequestConfig) => {
    return api.put<IResponse<IResStepResponse>>(
      "/user-info/save-identity",
      data,
      config
    );
  },
  saveFinance: (data: IReqSaveFinance, config?: AxiosRequestConfig) => {
    return api.put<IResponse<IResStepResponse>>(
      "/user-info/save-finance",
      data,
      config
    );
  },
  saveEligibility: (data: IReqSaveEligibility, config?: AxiosRequestConfig) => {
    return api.put<IResponse<IResStepResponse>>(
      "/user-info/save-eligibility",
      data,
      config
    );
  },
  saveRiskProfile: (data: IReqSaveRiskProfile, config?: AxiosRequestConfig) => {
    return api.put<IResponse<IResStepResponse>>(
      "/user-info/save-risk-profile",
      data,
      config
    );
  },
  uploadDocument: (
    files: File[],
    deleteIdList: number[],
    photoId: File | undefined,
    addressProof: File | undefined,
    config?: AxiosRequestConfig
  ) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    if (deleteIdList.length > 0) {
      formData.append("deleteIdList", deleteIdList.join(", "));
    }
    if (photoId) {
      formData.append("photoId", photoId);
    }
    if (addressProof) {
      formData.append("addressProof", addressProof);
    }
    return api.put<IResponse<void>>("/user-info/upload-docs", formData, {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getStepDetail: (step: number, config?: AxiosRequestConfig) => {
    return api.get<IResponse<IResStepResponse>>(
      `/user-info/step-detail/${step}`,
      config
    );
  },
};
