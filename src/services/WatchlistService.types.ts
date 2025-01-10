export interface IReqGetWatchlist {
  limit: number;
  page: number;
  country: string;
  industry: string;
  search: string;
}

export interface IWatchlistItem {
  id: number;
  name: string;
  country: string;
  industry: string;
  lastRound: string;
  lrv: string;
  lrvDate: string;
  sharePrice: string;
  logoUrl: string;
  description: string;
  sourceId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IResGetWatchlist {
  data: IWatchlistItem[];
  count: number;
  statusCode: number;
  message: string;
}

export interface IReqPostWatchlist {
  companyId: number | string;
}
export interface ICountryItem {
  country: string;
}

export interface IResGetWatchlistCountry {
  data: ICountryItem[];
  statusCode: number;
  message: string;
}

export interface IIndustryItem {
  industry: string;
}

export interface IResGetWatchlistIndustry {
  data: IIndustryItem[];
  statusCode: number;
  message: string;
}

export interface IResPostWatchlist {
  statusCode: number;
  message: string;
  data: boolean;
}
