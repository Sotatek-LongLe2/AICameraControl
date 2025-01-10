export interface IResLRV {
  message: string;
  statusCode: number;
  data: {
    sumLrv: number;
    resultByType: {
      "rank-1": number;
      "rank-2": number;
      "rank-3": number;
      "rank-4": number;
      "rank-5": number;
    };
  };
}

export interface IResLastFundingRound {
  message: string;
  statusCode: number;
  data: {
    seedPreA: number;
    seriesA: number;
    seriesB: number;
    seriesC: number;
    seriesDPlus: number;
    total: number;
  };
}

export interface IResPrice {
  message: string;
  statusCode: number;
  data: {
    premium: number;
    discount: number;
    flat: number;
    total: number;
  };
}

export interface IReqGetPrimaryDemand {
  limit: number;
  page: number;
}

export type PrimaryDemandItem = {
  id: number;
  name: string;
  userId: number;
  primaryId: number;
  demand: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  logoUrl: string;
};

export interface IResPrimaryDemand {
  message: string;
  statusCode: number;
  data: PrimaryDemandItem[];
}

export type InteractionItem = {
  id: number;
  side: number;
  firstName: string;
  lastName: string;
  companyName: string;
  total: string;
};

export interface IResInteraction {
  message: string;
  statusCode: number;
  data: InteractionItem[];
}

export interface IResSecondaryIois {
  message: string;
  statusCode: number;
  data: SecondaryChartData;
}

export interface SecondaryChartData {
  chartBuy: Chart[] | null;
  chartSell: Chart[] | null;
}

export interface Chart {
  date_time: Date;
  sum_national: number;
}

export type TrendingNowItem = {
  sourceId: number;
  count: string;
  companyName: string;
};

export interface IResTrendingNow {
  message: string;
  statusCode: number;
  data: TrendingNowItem[];
}
