export type IResponse<Data> = Data;

export type TPagination<T> = T & IPagination;

export interface IPagination {
  limit: number;
  page: number;
}

export type TResponse<Data> = {
  message: string;
  statusCode: number;
  data: Data;
  count?: number;
};
