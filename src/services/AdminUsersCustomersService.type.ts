import { InviteStatus } from "src/constants/enumBE";

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
  premiumDiscount: string;
}

export interface IndividualInfo {
  passport: string;
  national: string;
  dateOfBirth: string; // Format: "DD/MM/YYYY"
  placeOfBirth: string;
  residential: string;
  countryOfResidence: string;
  taxResidence: string;
  firstName: string;
  lastName: string;
  phoneNumber: string; // Supports leading zeros
  phoneCode?: string | null;
}

export interface CorporateInfo {
  firstName: string;
  lastName: string;
  capacity: string;
  taxResidence: string;
  phoneNumber: string;
  phoneCode?: string | null;
  company: {
    name: string;
    country: string;
    registrationNumber: string;
    registeredAddress: string;
    businessAddress: string;
    isSfcLicensed: number; // Binary: 0 or 1
    isListedSub: number; // Binary: 0 or 1
  };
}

export interface IReqCreateOrUpdateUserCustomer {
  email: string;
  password?: string;
  type: number; // Consider an enum for predefined types
  individualInfo?: IndividualInfo; // Optional, depending on type
  corporateInfo?: CorporateInfo; // Optional, depending on type
}

export interface IResCreateOrUpdateUserCustomer {
  message: string;
  statusCode: number;
  data: object; // Ideally, replace `object` with a specific type for the returned data
}

export interface IResGetAdminUserDetail {
  message: string;
  statusCode: number;
  data: AdminUserDetail;
}
export interface UserInfoAdminUserDetail {
  id: number;
  userId: number;
  phoneCode: string | null;
  phone: string;
  phoneVerified: number; // 1 or 0
  passport: string;
  national: string;
  dateOfBirth: string; // Format: "DD/MM/YYYY"
  placeOfBirth: string;
  residential: string;
  countryOfResidence: string;
  taxResidence: string;
  step: number;
  caseCommonId: string | null;
  kycVerified: number; // 0, 1, 2, etc.
  finance: string | null;
  eligibility: string | null;
  riskProfile: string | null;
  agreementSigned: number; // 1 or 0
  documentUrl: string | null;
  capacity: string | null;
  createdAt: string; // ISO format
  updatedAt: string; // ISO format
}

export interface CompanyAdminUserDetail {
  id: number;
  userId: number;
  name: string;
  country: string;
  registrationNumber: string;
  registeredAddress: string;
  businessAddress: string;
  isSfcLicensed: number; // 0 or 1
  isListedSub: number; // 0 or 1
  createdAt: string; // ISO format
  updatedAt: string; // ISO format
  deletedAt: string | null;
}

export interface AdminUserDetail {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: number; // Define enum for role if necessary
  status: number; // Define enum for status if necessary
  password: string;
  forgotPasswordCode: string | null;
  scope: string;
  isChangePass: number; // 1 or 0
  verifiedBy: string | null;
  riskDisclosureSigned: number; // 1 or 0
  type: number; // Define enum for type if necessary
  deletedBy: string | null;
  createdAt: string; // ISO format
  updatedAt: string; // ISO format
  deletedAt: string | null;
  userInfo: UserInfoAdminUserDetail | null;
  userCompany: CompanyAdminUserDetail | null;
}

export interface UserCustomerFormData {
  email: string;
  password: string;
  type: number;
  passport: string;
  nationality: string;
  dateOfBirth: string;
  placeOfBirth: string;
  residential: string;
  countryOfResidence: string;
  taxResidence: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  capacity: string;
  companyName: string;
  companyCountry: string;
  companyRegistrationNumber: string;
  companyRegisteredAddress: string;
  companyBusinessAddress: string;
  isSfcLicensed: number;
  isListedSub: number;
}
export interface DefaultValuesEditFrom {
  password?: string | undefined;
  type: string;
  email: string;
  firstName?: string;
  lastName?: string;
  capacity?: string | null;
  taxResidence?: string | null;
  phoneNumber?: string;
  passport?: string;
  nationality?: string;
  dateOfBirth?: Date | null | string;
  placeOfBirth?: string;
  residential?: string;
  countryOfResidence?: string;
  companyName?: string | null;
  companyCountry?: string | null;
  companyRegistrationNumber?: string | null;
  companyRegisteredAddress?: string | null;
  companyBusinessAddress?: string | null;
  isSfcLicensed?: string;
  isListedSub?: string;
}

export interface IAdminInvitedItem {
  id: number;
  invitedId: string;
  firstName: string;
  lastName: string;
  email: string;
  code: string;
  status: number;
  expiredAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAdminActiveItem {
  userId: number;
  firstName: string;
  lastName: string;
  createdAt: string;
  adminVerify?: string | null;
  company?: string;
  verifiedBy?: string;
  docs?: IAdminActiveItemDocument[];
  createdBy?: number | null;
}
export interface IAdminActiveItemDocument {
  id: number;
  source: string;
  sourceId: number;
  filePath: string;
  fileName: string | null;
  index: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  fullPath: string;
}

export interface IAdminRemovedItem {
  userId: number;
  firstName: string;
  lastName: string;
  createdAt: string;
  deletedAt: string;
  deletedBy: number;
  company?: string | null;
  adminDeleted: string;
}
export interface IResCustomerList<Status extends InviteStatus> {
  message: string;
  statusCode: number;
  data: Array<
    Status extends InviteStatus.ACTIVE
      ? IAdminActiveItem
      : Status extends InviteStatus.INVITED
      ? IAdminInvitedItem
      : Status extends InviteStatus.REMOVED
      ? IAdminRemovedItem
      : unknown
  >;
  count: number;
}

export interface IResUserCusTomer {
  message: string;
  statusCode: number;
  data: object;
}

export interface IMostlyViewItem {
  id: number;
  name: string;
  country: string | null;
  industry: string | null;
  lastRound: string;
  lrv: string;
  lrvDate: string;
  sharePrice: string;
  logoUrl: string;
  websiteUrl: string;
  description: string;
  sourceId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface IUserOverview {
  sumIndicationCreated: number;
  sumBidAndOffer: number;
  demand: number;
}

export interface IResGetUserOverview {
  message: string;
  statusCode: number;
  data: {
    mostlyView: IMostlyViewItem[];
    userOverview: IUserOverview;
  };
}
export interface IParamRequestTimeline {
  userId: number;
  page: number;
  limit: number;
}

export interface ITimelineItemDetail {
  country: string | null;
  industry: string | null;
  search: string | null;
  primaryId: number | null;
  secondaryId: number | null;
  notional: string | null;
  sharePrice: string | null;
  tabName: string | null;
}

export interface IItemTimeline {
  id: number;
  userId: number;
  source: number;
  sourceId: number | null;
  action: string;
  color: string;
  detail: ITimelineItemDetail;
  createdAt: string;
  title: string;
  text: string;
  companyName: string;
  companyLogo: string;
  customerName: string;
  side: number;
}

export interface IResGetTimeline {
  message: string;
  statusCode: number;
  data: IItemTimeline[];
  count: number;
}
export interface IParamRequestDownloadDocs {
  userId: number;
}
