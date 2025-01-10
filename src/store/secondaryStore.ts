import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const SEC_ITEM_PER_PAGE = 50;

export interface ISecondaryFilterParams {
  page: number;
  limit: number;
  // side: SecondarySideEnum;
  countryFilter: string;
  industryFilter: string;
  search: string;
}

export interface SecondaryOrder {
  notional: number;
  sharePrice: number;
  premiumDiscount: number;
}

interface SecondaryStore {
  displayView: string;
  setDisplayView: (data: string) => void;
  secondaryFilterParams: ISecondaryFilterParams;
  onChangeSecondaryFilterParams: (
    data: Partial<ISecondaryFilterParams>
  ) => void;
  onNextPage: () => void;
  resetFilter: () => void;
  secondaryOrder?: SecondaryOrder;
  setSecondaryOrder: (data: SecondaryOrder | undefined) => void;
}

const defaultSecondaryFilterParams: ISecondaryFilterParams = {
  page: 1,
  limit: SEC_ITEM_PER_PAGE,
  // side: SecondarySideEnum.BUY,
  countryFilter: "",
  industryFilter: "",
  search: "",
};

export const useSecondaryStore = create<SecondaryStore>()(
  immer((set) => ({
    displayView: "list",
    secondaryFilterParams: defaultSecondaryFilterParams,
    setDisplayView: (data: string) => {
      set({
        displayView: data,
      });
    },
    onChangeSecondaryFilterParams: (data: Partial<ISecondaryFilterParams>) => {
      set((state) => {
        Object.entries(data).forEach(([key, value]) => {
          if (key in state.secondaryFilterParams && value !== undefined) {
            (state.secondaryFilterParams[
              key as keyof ISecondaryFilterParams
            ] as any) = value;
          }
        });
      });
    },
    onNextPage: () => {
      set((state) => {
        state.secondaryFilterParams = {
          ...state.secondaryFilterParams,
          page: state.secondaryFilterParams.page + 1,
        };
      });
    },
    resetFilter: () => {
      set({
        secondaryFilterParams: defaultSecondaryFilterParams,
        displayView: "list",
      });
    },
    setSecondaryOrder: (data: SecondaryOrder | undefined) => {
      set({
        secondaryOrder: data,
      });
    },
  }))
);
