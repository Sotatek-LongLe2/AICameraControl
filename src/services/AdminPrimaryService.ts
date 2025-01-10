import { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  IBodyPostPrimary,
  IBodyPutPrimaryAllocation,
  IParamsGetAdminPrimaryList,
  IParamsPostDocument,
  IParamsPutDocumentIndex,
  IResAdminPrimaryDetail,
  IResDeletePrimary,
  IResGetAdminPrimaryList,
  IResGetAdminPrimaryOrder,
  IResGetPrimaryByID,
  IResPutAllocationItem,
} from "./AdminPrimaryService.types";
import { api } from "./config";
import { IResponse, TPagination, TResponse } from "./type";

export const AdminPrimaryService = {
  getPrimaryList: (
    params: IParamsGetAdminPrimaryList,
    config?: AxiosRequestConfig
  ) => {
    return api.get<IResponse<IResGetAdminPrimaryList>>("/primary", {
      ...config,
      params,
    });
  },

  getPrimaryDetail: (
    params: { primaryId: number },
    config?: AxiosRequestConfig
  ) => {
    return api.get<IResponse<IResAdminPrimaryDetail>>(
      `/primary/primary-detail/${params.primaryId}`,
      {
        ...config,
        params,
      }
    );
  },

  getPrimaryOrder: (
    params: TPagination<{ primaryId: number }>,
    config?: AxiosRequestConfig
  ) => {
    return api.get<IResponse<IResGetAdminPrimaryOrder>>(
      `/primary/primary-order`,
      {
        ...config,
        params,
      }
    );
  },

  editPrimaryOrder: (
    params: IBodyPutPrimaryAllocation,
    config?: AxiosRequestConfig
  ) => {
    return api.put<IResponse<IResPutAllocationItem>>(
      `/primary/allocation`,
      params,
      config
    );
  },

  createPrimary: async function (
    params: IBodyPostPrimary,
    config?: AxiosRequestConfig
  ) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined) continue;

      if (!Array.isArray(value)) {
        formData.append(key, value);
        continue;
      }
    }

    params.dealTerms.forEach((dealTerm, index) => {
      for (const [key, value] of Object.entries(dealTerm)) {
        formData.append(`dealTerms[${index}][${key}]`, value);
      }
    });

    const result = await api.post<IResponse<IResPutAllocationItem>>(
      `/primary`,
      formData,
      {
        ...config,
        headers: {
          ...config?.headers,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const reOrderParams: IParamsPutDocumentIndex["data"] = [];
    const docsPromises: Promise<AxiosResponse<any>>[] = [];

    params.docs.forEach((doc, index) => {
      if ("id" in doc) {
        reOrderParams.push({ id: doc.id, index });
        return;
      }

      docsPromises.push(
        this.postDocument({ file: doc, index, primaryId: result.data.data.id })
      );
    });

    if (reOrderParams.length)
      docsPromises.push(this.putDocumentIndex({ data: reOrderParams }));

    if (params.deleteDocsIdList) {
      docsPromises.push(
        this.deleteDocument({ deleteIdList: params.deleteDocsIdList })
      );
    }

    await Promise.all(docsPromises);

    return result;
  },

  getPrimaryById: (
    params: { primaryId: number },
    config?: AxiosRequestConfig
  ) => {
    return api.get<IResponse<IResGetPrimaryByID>>(
      `/primary/${params.primaryId}`,
      {
        ...config,
        params,
      }
    );
  },

  deletePrimary: (
    params: { primaryId: number },
    config?: AxiosRequestConfig
  ) => {
    return api.delete<IResponse<IResDeletePrimary>>(
      `/primary/${params.primaryId}`,
      {
        ...config,
        params,
      }
    );
  },

  postDocument: function (
    params: IParamsPostDocument,
    config?: AxiosRequestConfig
  ) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(params)) {
      formData.append(key, value);
    }

    return api.post<TResponse<object>>(`/primary/document`, formData, {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "multipart/form-data",
      },
    });
  },

  putDocumentIndex: function (
    params: IParamsPutDocumentIndex,
    config?: AxiosRequestConfig
  ) {
    return api.put<IResponse<object>>(
      "/primary/document/index",
      params,
      config
    );
  },

  deleteDocument: function (
    params: { deleteIdList: (string | number)[] },
    config?: AxiosRequestConfig
  ) {
    return api.delete<IResponse<object>>(`/primary/document`, {
      ...config,
      data: params,
    });
  },
};
