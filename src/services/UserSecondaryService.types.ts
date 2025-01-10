import {
  SecondarySideEnum,
  SecondaryStageEnum,
  SecondaryStatus,
} from "src/constants/enumBE";

export interface ICountryReq {
  page?: number;
  limit?: number;
}

export interface ICompanyReq {
  page?: number;
  limit?: number;
  side?: SecondarySideEnum;
}

export interface IndustryReq {
  page?: number;
  limit?: number;
}

export interface ISecondaryDetailReq {
  side?: SecondarySideEnum;
  secondaryId?: number;
  companyId?: number;
}

export interface IUserSecondaryOrderReq {
  secondaryId: number;
}

export interface ISecondaryOrderReq {
  id?: number;
  secondaryId: number;
  notional: string;
  sharePrice: string;
  premiumDiscount: string;
}

export interface ISecondaryListReq {
  page?: number;
  limit?: number;
  side: SecondarySideEnum;
  search?: string;
  countryFilter?: string;
  industryFilter?: string;
}

export interface ISecondaryListRes {
  message: string;
  statusCode: number;
  data: ISecondaryItem[];
  count: number;
}

export interface ISecondaryItem {
  id: number;
  side: SecondarySideEnum;
  notional: string;
  sharePrice: string;
  vsLRV: string;
  valuation: string;
  fee: string;
  minSize: string;
  stage: SecondaryStageEnum;
  status: SecondaryStatus;
  companyId: number;
  companyName: string;
  logoUrl: string;
  industry: string;
  jurisdiction: string;
  companyLogo: string;
  country: string;
}

export interface ICountryListRes {
  message: string;
  statusCode: number;
  data: string[];
  count: number;
}

export interface ICompanyListRes {
  message: string;
  statusCode: number;
  data: ICompany[];
  count: number;
}

export interface ICompany {
  companyId: number;
  companyName: string;
  industry: string;
}

export interface IndustryRes {
  message: string;
  statusCode: number;
  data: {
    industry: string;
  }[];
  count: number;
}

export interface ISecondaryDetailRes {
  message: string;
  statusCode: number;
  data: ISecondaryDetail;
}

export interface ISecondaryDetail {
  id: number;
  side: SecondarySideEnum;
  notional: string;
  sharePrice: string;
  vsLRV: string;
  valuation: string;
  fee: string;
  minSize: string;
  stage: SecondaryStageEnum;
  status: SecondaryStatus;
  companyId: number;
  companyName: string;
  logoUrl: string;
  industry: string;
  websiteUrl: string;
  description: string;
  jurisdiction: string;
  companyWebsite: string;
  companyLogo: string;
  securityType: number;
  ownershipStructure: number;
  docLanguage: string;
  country: string;
}

export interface ISecondaryOrderRes {
  message: string;
  statusCode: number;
}

export interface IUserSecondaryOrderRes {
  message: string;
  statusCode: number;
  data: SecondaryOrder;
}

export interface SecondaryOrder {
  id: number;
  userId: number;
  secondaryId: number;
  notional: string;
  sharePrice: string;
  quantity: string;
  premiumDiscount: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: string;
}
