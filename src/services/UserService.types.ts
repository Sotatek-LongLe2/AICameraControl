import { InviteStatus } from "src/constants/enumBE";
import { IPagination, TResponse } from "./type";

export interface IReqVerifyInvitationCode {
  code: string;
}

export interface IResVerifyInvitationCode {
  message: string;
  statusCode: number;
  data: Record<string, never>;
}

export interface IReqCreatePassword {
  code: string;
  password: string;
  password_confirmation: string;
}

export interface IResCreatePassword {
  message: string;
  statusCode: number;
  data: {
    id: number;
    name: string;
    email: string;
    access_token: string;
    role: number;
  };
}

export interface IResGetMe {
  message: string;
  statusCode: number;
  data: {
    id: number;
    name: string;
    email: string;
    isActive: InviteStatus;
    createdAt: string;
    updatedAt: string;
  };
}

export interface IReqForgotPassword {
  email: string;
}

export interface IReqResetPassword {
  code: string;
  password: string;
  password_confirmation: string;
}

export interface IResResetPassword {
  message: string;
  statusCode: number;
  data: Record<string, never>;
}

export interface IResSignRiskDisclosure {
  message: string;
  statusCode: number;
  data: Record<string, never>;
}

export interface IReqVerifyIdentity {
  photoid: File | null;
  selfie: File | null;
  createNewStep: boolean;
  isCompany: boolean;
  firstName: string;
  lastName: string;
}

export interface IResVerifyIdentity {
  message: string;
  statusCode: number;
  data: {
    id: number;
    verified: boolean;
    name: string;
    email: string;
  };
}

export interface IResTimeResendEmail {
  message: string;
  statusCode: number;
  data: {
    waitTime: string;
  };
}

export interface IPersonalDetail {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: number;
  status: number;
  forgotPasswordCode: IForgotPasswordCode;
  scope: string;
  isChangePass: number;
  verifiedBy: number;
  riskDisclosureSigned: number;
  type: number;
  deletedBy: Date | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  userInfo: IUserInfo;
}

export interface IForgotPasswordCode {
  code: string;
  status: number;
  expires_in: number;
}

export interface IUserInfo {
  id: number;
  userId: number;
  phoneCode: string;
  phone: string;
  phoneVerified: number;
  passport: string;
  national: string;
  dateOfBirth: string;
  placeOfBirth: string;
  residential: string;
  countryOfResidence: string;
  taxResidence: string;
  step: number;
  caseCommonId: null;
  kycVerified: number;
  finance: Finance;
  eligibility: TEligibility;
  riskProfile: TRiskProfile;
  agreementSigned: number;
  documentUrl: string | null;
  capacity: null;
  createdAt: Date;
  updatedAt: Date;
}

export type TEligibility = Record<string, string> & {
  // question_1: string;
  // question_2: string;
  // question_3: string;
  // question_4: string;
  // question_5: string;
  // question_6: string;
  // question_7: string;
  // question_8: string;
  // question_9: string;
  // question_10: string;
};

export interface Finance {
  occupation: string;
  occupationIndustry: string;
  isLiabilities: number;
  productKnowledge: string;
  sourceOfWealth: string;
}

export type TRiskProfile = Record<string, number> & {
  // question_1: number;
  // question_2: number;
  // question_3: number;
  // question_4: number;
  // question_5: number;
  // question_6: number;
  // question_7: number;
  // question_8: number;
};

export enum TYPE_INDICATION {
  OPEN = "open",
  CLOSED = "closed",
}

export interface IParamsGetIndications extends IPagination {
  type: TYPE_INDICATION;
  userId?: number;
}

export type TResponseGetIndication = TResponse<IIndicationItem[]> & {
  count: number;
};

export interface IIndicationItem {
  id: number;
  side: number;
  notional: string;
  sharePrice: string;
  vsLRV: string;
  valuation: string;
  fee: string;
  minSize: string;
  buyFee: null;
  sellFee: null;
  buyCom: null;
  orderId: null;
  sellCom: null;
  logoUrl: null;
  companyName: string;
  stage: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  indicationStatus: string;
  assignedAdmin: number;
  usernameMatched: string;
  totalCommission: number;
  executedBy: string;
  firstName: string;
  lastName: string;
}
export enum TYPE_DEMAND {
  PENDING = "pending",
  EXECUTED = "executed",
}

export interface IParamsGetDemands extends IPagination {
  type: TYPE_DEMAND;
  userId?: number;
}

export type TResponseGetDemands = TResponse<IDemandItem[]> & {
  count: number;
};

export interface IDemandItem {
  id: number;
  userId: number;
  primaryId: number;
  demand: string;
  allocation: null | string;
  status: number | null;
  createdAt: Date;
  name: string;
  logoUrl: string;
  booksOpen: Date;
  booksClose: Date;
}

export interface IDealTerm {
  name: string;
  index: string;
  value: string;
}

export enum TYPE_BIDS_OFFERS {
  OPEN = "open",
  CLOSED = "closed",
}

export interface IParamsGetBidsOffers extends IPagination {
  type: TYPE_BIDS_OFFERS;
  userId?: number;
}

export type TResponseGetBidsOffers = TResponse<IBidsOffersItem[]> & {
  count: number;
};

export interface IBidsOffersItem {
  id: number;
  notional: string;
  sharePrice: string;
  premiumDiscount: string;
  secondaryId: number;
  userIdOrder: number;
  status: number;
  stage: string;
  userIdSecondary: number;
  side: number;
  createdAt: Date;
  companyName: string;
  logoUrl: null | string;
  sellFee: number | string | null;
  buyFee: number | string | null;
  companyId: number;
  notionalOrder: string;
  sharePriceOrder: string;
  firstName: string;
  lastName: string;
}
