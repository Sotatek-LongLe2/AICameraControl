import {
  BidOfferPage,
  BidOfferType,
  DemandPage,
  PrimaryTab,
} from "src/constants/enumBE";

export interface IAccessPrimaryReq {
  tabName: PrimaryTab;
  primaryId: number;
}

export interface IAccessDemandReq {
  pageName: DemandPage;
  primaryId: number;
  demand?: string;
}

export interface IAccessBidOfferReq {
  pageName: BidOfferPage;
  type: BidOfferType;
  secondaryId: number;
  notional?: string;
  sharePrice?: string;
}

export interface IAccessCompanyReq {
  companyId: number;
}

export interface ISaveUserActivityRes {
  message: string;
  statusCode: number;
  data: null;
}
