export interface IReqCompanyList {
  limit: number;
  page: number;
  country: string;
  industry: string;
  search: string;
}

export interface IAdminCompanyItem {
  id: any;
  name: string;
  country: string;
  industry: string;
  lastRound: string;
  lrv: string;
  lrvDate: string;
  sharePrice: string;
  logoUrl: any;
  websiteUrl: string;
  description: string;
  sourceId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface IResListCompany {
  message: string;
  statusCode: number;
  data: IAdminCompanyItem[];
}

export interface ICountryItem {
  country: string;
}

export interface IResListCountry {
  message: string;
  statusCode: number;
  data: ICountryItem[];
}

export interface IIndustryItem {
  industry: string;
}

export interface IResListIndustry {
  message: string;
  statusCode: number;
  data: IIndustryItem[];
}

export interface IReqImportPitchBook {
  file: File | null;
}

export interface IResUploadLogo {
  message: string;
  statusCode: number;
  data: {
    logoUrl: string;
  };
}
