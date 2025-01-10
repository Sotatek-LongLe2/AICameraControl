import { FormControl, FormControlProps, FormLabel } from "@mui/joy";
import { forwardRef, memo } from "react";
import { MessageError } from "../common/MessageError";

export interface AppFormWrapperProps extends Omit<FormControlProps, "error"> {
  label?: string;
  error?: string | boolean;
}

export const AppFormWrapper = memo(
  forwardRef<HTMLDivElement, AppFormWrapperProps>(
    ({ label, error, children, ...props }, ref) => {
      return (
        <FormControl slotProps={{ root: { ref } }} {...props}>
          {label && <FormLabel>{label}</FormLabel>}
          {children}
          {error && typeof error === "string" && (
            <MessageError>{error}</MessageError>
          )}
        </FormControl>
      );
    }
  )
);
