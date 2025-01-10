import { Order } from "src/services/UserPrimaryService.types";
import { create } from "zustand";

interface PrimaryStore {
  notional: string;
  setNotional: (data: string) => void;
  order?: Order;
  setOrder: (data?: Order) => void;
  isEditing: boolean;
  setIsEditing: (data: boolean) => void;
}

export const usePrimaryStore = create<PrimaryStore>()((set) => ({
  notional: "",
  isEditing: false,
  setNotional: (data: string) => {
    set({
      notional: data,
    });
  },
  setOrder: (data?: Order) => {
    set({
      order: data,
    });
  },
  setIsEditing: (data: boolean) => {
    set({
      isEditing: data,
    });
  },
}));
