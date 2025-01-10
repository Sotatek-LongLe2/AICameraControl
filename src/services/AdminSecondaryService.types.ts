import {
  SecondaryOwnershipStructureEnum,
  SecondaryScreen,
  SecondarySecurityTypeEnum,
  SecondarySideEnum,
  SecondaryStageEnum,
  SecondaryStatus,
  SecondaryType,
} from "src/constants/enumBE";
import { IPagination } from "./type";

export interface IReqGetAdminSecondaryList extends IPagination {
  side: number;
  screen: SecondaryScreen;
  customerFilter?: number;
  companyFilter?: number;
}

export interface IResGetAdminSecondaryList {
  message: string;
  statusCode: number;
  data: IAdminSecondaryItem[];
  count: number;
}

export interface IAdminSecondaryItem {
  id: number;
  side: number;
  notional: string;
  sharePrice: string;
  vsLRV: string;
  valuation: string;
  fee: string;
  minSize: string;
  buyFee?: string;
  sellFee?: string;
  buyCom?: string;
  orderId?: string;
  sellCom?: string;
  firstName: string;
  lastName: string;
  companyName: string;
  usernameOrdered: string;
  userIdArr: number[];
  usernameMatched?: string;
  userIdMatched?: string;
  adminName: string;
}

export interface IReqListDataDefault {
  limit: number;
  page: number;
  type?: number;
  screen?: number;
  side?: number;
}

export interface IAdminUserItem {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: number;
  status: number;
  password: string;
  scope: string;
  isChangePassword: number;
  verifiedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface IResListUser {
  message: string;
  statusCode: number;
  data: IAdminUserItem[];
}

export interface IAdminCompanyItem {
  id: number;
  logo: string;
  name: string;
  address: string;
  type: string;
  lastRound: string;
  lrv: string;
  lrvDate: string;
  password: string;
  scope: string;
  isChangePassword: number;
  verifiedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface IResListCompany {
  message: string;
  statusCode: number;
  data: IAdminCompanyItem[];
}

export interface IResDeleteSecondary {
  message: string;
  statusCode: number;
  data: object;
}

export interface IResRestoreSecondary {
  message: string;
  statusCode: number;
  data: object;
}

export interface IResGetIOIBuySellDetail {
  message: string;
  statusCode: number;
  data: IOIBuySellDetail;
}

export interface IOIBuySellDetail {
  id: number;
  userId: number;
  companyId: number;
  orderId: number;
  side: SecondarySideEnum;
  notional: string;
  sharePrice: string;
  quantity: string;
  minSize: string;
  valuation: string;
  fee: string;
  premiumDiscount: string;
  securityType: SecondarySecurityTypeEnum;
  ownershipStructure: SecondaryOwnershipStructureEnum;
  jurisdiction: string;
  docLanguage: null;
  stage: SecondaryStageEnum;
  assignedAdmin: number;
  status: SecondaryStatus;
  buyFee: string;
  sellFee: string;
  buyCom: string;
  sellCom: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  companyLogo: string;
  companyName: string;
  seller: Buyer;
  buyer: Buyer;
}

export interface Buyer {
  username: string;
  notional: string;
  net: number;
  commission: string;
  id: number;
}

export interface IReqSecondaryIndication {
  id?: number;
  userId: number;
  companyId: number;
  side: number;
  notional: string;
  sharePrice: string;
  valuation: string;
  fee: string;
  minSize: string;
  securityType: number;
  ownershipStructure: number;
  jurisdiction: string;
  docLanguage: string;
  premiumDiscount: string | null;
}

export interface IResSecondaryIndication {
  message: string;
  statusCode: number;
  data: object;
}

export interface ForgotPasswordCode {
  code: string;
  status: number;
  expires_in: number;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: number;
  status: number;
  password: string;
  forgotPasswordCode: ForgotPasswordCode;
  scope: string;
  isChangePass: number;
  verifiedBy: string | null;
  riskDisclosureSigned: number;
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: number;
  name: string;
  country: string;
  industry: string;
  lastRound: string | null;
  lrv: string | null;
  lrvDate: string | null;
  sharePrice: string | null;
  logoUrl: string | null;
  websiteUrl: string;
  description: string;
  sourceId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface IResSecondaryByIdData {
  id: number;
  userId: number;
  companyId: number;
  orderId: string | null;
  side: number;
  notional: string;
  sharePrice: string;
  quantity: string;
  minSize: string;
  valuation: string;
  fee: string;
  premiumDiscount: string;
  securityType: number;
  ownershipStructure: number;
  jurisdiction: string;
  docLanguage: string | null;
  stage: string;
  assignedAdmin: string | null;
  status: number;
  buyFee: string;
  sellFee: string;
  buyCom: string;
  sellCom: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  user: IOIDetailUser;
  company: IOIDetailCompany;
}

export interface IResGetIOIDetail {
  message: string;
  statusCode: number;
  data: IOIDetail;
}

export interface IResGetListOrder {
  message: string;
  statusCode: number;
  data: IListOrderItem[];
}

export interface IListOrderItem {
  id: number;
  userId: number;
  userName: string;
  notional: string;
  sharePrice: string;
  sharePriceGap: number;
  side: number;
  sideUser: number;
}

export interface IResGetListAdmins {
  message: string;
  statusCode: number;
  data: IListAdminsItem[];
}
export interface IListAdminsItem {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: number;
  status: number;
  password: string;
  forgotPasswordCode: string | null;
  scope: string;
  isChangePass: number;
  verifiedBy: string | null;
  riskDisclosureSigned: number;
  createdAt: string;
  updatedAt: string;
}
export interface IResPutAssignTo {
  message: string;
  statusCode: number;
  data: IPutAssignToData[];
}

export interface IPutAssignToData {
  id: number;
  userId: number;
  companyId: number;
  orderId: number;
  side: number;
  notional: string;
  sharePrice: string;
  quantity: string;
  minSize: string;
  valuation: string;
  fee: string;
  premiumDiscount: string;
  securityType: number;
  ownershipStructure: number;
  jurisdiction: string;
  docLanguage: string | null;
  stage: string;
  assignedAdmin: string;
  status: number;
  buyFee: string;
  sellFee: string;
  buyCom: string;
  sellCom: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  user: User;
  company: Company;
}

export interface IResSecondaryById {
  message: string;
  statusCode: number;
  data: IResSecondaryByIdData;
}
export interface IOIDetailUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: number;
  status: number;
  password: string;
  forgotPasswordCode: string | null;
  scope: string;
  isChangePass: number;
  verifiedBy: string | null;
  riskDisclosureSigned: number;
  createdAt: string;
  updatedAt: string;
}
export interface IOIDetailCompany {
  id: number;
  name: string;
  country: string;
  industry: string;
  lastRound: string | null;
  lrv: string | null;
  lrvDate: string | null;
  sharePrice: string | null;
  logoUrl: string | null;
  websiteUrl: string | null;
  description: string | null;
  sourceId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
export interface IOIDetail {
  id: number;
  userId: number;
  companyId: number;
  orderId: number | null;
  side: number;
  notional: string;
  sharePrice: string;
  quantity: string;
  minSize: string;
  valuation: string;
  fee: string;
  premiumDiscount: string;
  securityType: number;
  ownershipStructure: number;
  jurisdiction: string;
  docLanguage: string | null;
  stage: string;
  assignedAdmin: string | null;
  status: number;
  buyFee: string;
  sellFee: string;
  buyCom: string;
  sellCom: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  user: IOIDetailUser;
  company: IOIDetailCompany;
}

export interface ISecondaryIOIUpdateReq {
  secondaryId: number;
  type: SecondaryType;
  quantity?: string;
  sharePrice?: string;
  sellFee?: string;
  buyFee?: string;
  notional?: string;
  sellCom?: string;
  buyCom?: string;
}

export interface ISecondaryIOIUpdateRes {
  message: string;
  statusCode: number;
}
