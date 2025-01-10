import { Id, toast, ToastContent, ToastOptions } from "react-toastify";
import { TContentToastCustom } from "./toast";
import { ToastCustom } from "./ToastCustom";
import { IconToastError } from "./IconToastError";
import { IconToastSuccess } from "./IconToastSuccess";

toast.successLegacy = toast.success;
toast.errorLegacy = toast.error;

toast.custom = <TData = unknown,>(
  content: TContentToastCustom<TData>,
  options?: ToastOptions<TData> | undefined
): Id => {
  if (typeof content === "function") return toast(content, options);

  const icon = content?.icon ?? options?.icon;

  return toast(
    ToastCustom({
      ...content,
      icon: typeof icon === "function" ? undefined : icon,
    }),
    {
      ...options,
      icon: typeof icon === "function" ? icon : undefined,
      className: "Toastify__toast-custom",
    }
  );
};

toast.success = <TData = unknown,>(
  content: ToastContent<TData>,
  options?: ToastOptions<TData> | undefined
): Id => {
  return toast.successLegacy(content, {
    ...options,
    icon:
      typeof options?.icon === "function" ? (
        options.icon
      ) : (
        <IconToastSuccess icon={options?.icon} />
      ),
  });
};

const toastIdExpired = "login-session-expired";

toast.error = <TData = unknown,>(
  content: ToastContent<TData>,
  options?: ToastOptions<TData> | undefined
): Id => {
  const isActiveToastExpired = toast.isActive(toastIdExpired);
  if (isActiveToastExpired) return "";

  const isError401 =
    String(content).includes("AxiosError") && String(content).includes("401");

  return toast.errorLegacy(isError401 ? "Login session expired" : content, {
    toastId: isError401 ? toastIdExpired : undefined,
    //
    ...options,
    icon:
      typeof options?.icon === "function" ? (
        options.icon
      ) : (
        <IconToastError icon={options?.icon} />
      ),
  });
};
