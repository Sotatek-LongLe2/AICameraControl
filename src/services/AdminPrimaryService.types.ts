import {
  PrimaryFundingRound,
  PrimaryStatus,
  StageAdmin,
} from "src/constants/enumBE";
import { IPagination } from "./type";

export interface IParamsGetAdminPrimaryList extends IPagination {
  search: string;
  status: PrimaryStatus;
}

export interface IResGetAdminPrimaryList {
  message: string;
  statusCode: number;
  data: IAdminPrimaryItem[];
  count: number;
}

export interface IAdminPrimaryItem {
  id: number;
  company: string;
  logoUrl: string | null;
  fundingRound: PrimaryFundingRound | null;
  dealSize: number | null;
  launchDate: Date;
  booksOpen: Date;
  booksClose: Date;
  allocationStartDate: Date;
  closeDate: Date;
  numberOfOrders: number;
  USD: number;
  demand: number;
  stage: StageAdmin;
}

export interface IResAdminPrimaryDetail {
  message: string;
  statusCode: number;
  data: IAdminPrimaryDetail;
}

export interface IAdminPrimaryDetail {
  id: number;
  name: string;
  industry: null;
  placeHolderName: null;
  fundingRound: null;
  dealSize: number | null;
  valuationPre: null;
  offerPrice: null;
  minimumSize: null;
  logoUrl: string;
  launchDate: Date;
  booksOpen: Date;
  booksClose: Date;
  allocationStartDate: Date;
  closeDate: Date;
  bannerUrl: string;
  placeholderBannerUrl: string;
  introduction: null;
  solution: null;
  dealTerms: null;
  status: PrimaryStatus;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  numberOfOrders: number;
  USD: number;
  demand: number;
  stage: StageAdmin;
}

export interface IResGetAdminPrimaryOrder {
  message: string;
  statusCode: number;
  data: IAdminPrimaryOrderItem[];
  count: number;
}

export interface IAdminPrimaryOrderItem {
  id: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  demand: string;
  status: number;
  allocation: string | null;
  firstName: string;
  lastName: string;
  share: number;
}

export interface IBodyPutPrimaryAllocation {
  primaryId: number;
  data: IBodyPutAllocationItem[];
}

export interface IBodyPutAllocationItem {
  primaryOrderId: string | number;
  allocation: string | number;
}

export interface IResPutAllocationItem {
  message: string;
  statusCode: number;
  data: IPrimaryData;
}

export interface IBodyPostPrimary {
  id?: number;
  docs: (File | IDocument)[];
  logo?: File;
  banner?: File;
  placeholderBanner?: File;
  name: string;
  industry?: string;
  placeHolderName: string;
  fundingRound?: PrimaryFundingRound;
  dealSize?: string | number;
  valuationPre?: string | number;
  offerPrice?: string | number;
  minimumSize?: string | number;
  launchDate?: string;
  booksOpen?: string;
  booksClose?: string;
  allocationStartDate?: string;
  closeDate?: string;
  introduction?: string;
  solution?: string;
  dealTerms: IBodyPostDealTerm[];
  isDraft: boolean;
  deleteDocsIdList: number[];

  // Remove draft image
  logoUrl?: string;
  bannerUrl?: string;
  placeholderBannerUrl?: string;
}

export interface IBodyPostDealTerm {
  index: number;
  name: string;
  value: string;
}

export interface IResGetPrimaryByID {
  message: string;
  statusCode: number;
  data: IPrimaryData;
}

export interface IPrimaryData {
  id: number;
  name: string;
  industry: string;
  placeHolderName: string;
  fundingRound: number;
  dealSize: string;
  valuationPre: string;
  offerPrice: string;
  minimumSize: string;
  logoUrl: string;
  launchDate: string;
  booksOpen: string;
  booksClose: string;
  allocationStartDate: string;
  closeDate: string;
  bannerUrl: string;
  placeholderBannerUrl: string;
  introduction: string;
  solution: string;
  dealTerms: IDealTerm[];
  status: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  stage: string;
  docs: IDocument[];
}

export interface IDealTerm {
  name: string;
  index: string;
  value: string;
}

export interface IDocument {
  id: number;
  source: string;
  sourceId: number;
  filePath: string;
  fileName: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  fullPath: string;
}

export interface IResDeletePrimary {
  message: string;
  statusCode: number;
  data: object;
}

export interface IParamsPostDocument {
  primaryId: number;
  file: File;
  index: number;
}

export interface IParamsPutDocumentIndex {
  data: { id: number; index: number }[];
}
