import {
  PrimaryFundingRound,
  PrimaryListType,
  StageAdmin,
} from "src/constants/enumBE";

export interface IPrimaryOrderDTO {
  primaryId: number;
  demand: string;
}

export interface IUpdatePrimaryOrderDTO {
  id: number;
  demand: string;
}

export interface IPrimaryListReq {
  type: PrimaryListType;
  page?: number;
  limit?: number;
}

export interface IPrimaryListRes {
  count?: number;
  message: string;
  statusCode: number;
  data: IPrimaryListType1Res | IPrimaryItem[];
}

export interface IPrimaryListType1Res {
  onGoing: IPrimaryItem[];
  commingNext: IPrimaryItem[];
}

export interface IDoc {
  createdAt: string;
  deletedAt: string;
  filePath: string;
  fileName: string;
  fullPath: string;
  id: number;
  source: string;
  sourceId: number;
  updatedAt: string;
}

export interface IPrimaryDetailRes {
  message: string;
  statusCode: number;
  data: IPrimaryItem;
}

export interface IPrimaryItem {
  id: number;
  name: string;
  industry: string;
  placeHolderName: string | null;
  fundingRound: PrimaryFundingRound;
  dealSize: string | number;
  valuationPre: string | number;
  offerPrice: string | number;
  minimumSize: string | number;
  logoUrl: string;
  launchDate: Date;
  booksOpen: Date;
  booksClose: Date;
  allocationStartDate: Date;
  closeDate: Date;
  bannerUrl: string;
  placeholderBannerUrl: string;
  introduction: string | null;
  solution: string | null;
  dealTerms:
    | {
        name: string;
        value: string;
        index: string;
      }[]
    | string
    | null;
  status: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  stage: StageAdmin;
  docs: IDoc[] | string;
}

export interface ICreateOrderRes {
  message: string;
  statusCode: number;
  data: null;
}

export interface IUpdateOrderRes {
  message: string;
  statusCode: number;
  data: null;
}

export interface IPrimaryOrderRes {
  message: string;
  statusCode: number;
  data: PrimaryOrder;
}

export interface PrimaryOrder {
  order?: Order;
}

export interface Order {
  id: number;
  userId: number;
  primaryId: number;
  demand: string;
  allocation: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface IPrimaryWatchRes {
  message: string;
  statusCode: number;
  data: WatchRes;
}

export interface WatchRes {
  isWatching: boolean;
}
