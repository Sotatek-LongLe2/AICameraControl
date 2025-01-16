import { AxiosRequestConfig } from "axios";
import { api } from "./config";
import { IResponse } from "./type";

export const UserInformationService = {
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
};
