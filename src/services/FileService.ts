import { AxiosRequestConfig } from "axios";
import { api } from "./config";
import { TResponse } from "./type";

export const FileService = {
  Upload: (data: { file: File }, config?: AxiosRequestConfig) => {
    const formData = new FormData();
    formData.append("file", data.file);

    return api.post<TResponse<{ url: string }>>("/file/upload", formData, {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
