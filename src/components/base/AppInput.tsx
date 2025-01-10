import {
  FormControl,
  FormControlProps,
  FormLabel,
  Input,
  InputProps,
} from "@mui/joy";
import { forwardRef, memo } from "react";
import { MessageError } from "../common/MessageError";

export interface AppInputProps extends Omit<InputProps, "error"> {
  wrapperProps?: FormControlProps;
  label?: string;
  error?: string | boolean;
}

export const AppInput = memo(
  forwardRef<HTMLDivElement, AppInputProps>(
    ({ label, error, wrapperProps, ...props }, ref) => {
      return (
        <FormControl {...wrapperProps}>
          {label && <FormLabel>{label}</FormLabel>}
          <Input ref={ref} {...props} error={Boolean(error)} />
          {error && typeof error === "string" && (
            <MessageError>{error}</MessageError>
          )}
        </FormControl>
      );
    }
  )
);
