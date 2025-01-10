import {
  ToastContentProps,
  ToastIcon,
} from "node_modules/react-toastify/dist/types";
import { Id, ToastOptions, toast } from "react-toastify";

export interface IToastCustom {
  icon?: ToastIcon;
  title?: string;
  description?: string;
}
export type TContentToastCustom<TData> =
  | IToastCustom
  | ((props: ToastContentProps<TData>) => React.ReactNode);

declare module "react-toastify" {
  namespace toast {
    let custom: <TData = unknown>(
      content: TContentToastCustom<TData>,
      options?: ToastOptions<TData> | undefined
    ) => Id;

    let successLegacy: <TData = unknown>(
      content: ToastContent<TData>,
      options?: ToastOptions<TData> | undefined
    ) => Id;

    let errorLegacy: <TData = unknown>(
      content: ToastContent<TData>,
      options?: ToastOptions<TData> | undefined
    ) => Id;
  }
}
