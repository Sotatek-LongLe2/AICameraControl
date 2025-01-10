import {
  FormControl,
  FormControlProps,
  FormLabel,
  Select,
  SelectProps,
  SelectTypeMap,
} from "@mui/joy";
import { ForwardedRef } from "react";
import { combineSx, genericForwardRef, genericMemo } from "src/shared/utils";
import { MessageError } from "../common/MessageError";

export type AppSelectProps<
  OptionValue extends {},
  Multiple extends boolean,
  D extends React.ElementType = SelectTypeMap<
    OptionValue,
    Multiple
  >["defaultComponent"]
> = SelectProps<OptionValue, Multiple, D> & {
  wrapperProps?: FormControlProps;
  label?: string;
  error?: string | boolean;
};

export const AppSelect = genericMemo(
  genericForwardRef(
    <
      OptionValue extends {},
      Multiple extends boolean,
      D extends React.ElementType = SelectTypeMap<
        OptionValue,
        Multiple
      >["defaultComponent"]
    >(
      {
        label,
        error,
        wrapperProps,
        ...props
      }: AppSelectProps<OptionValue, Multiple, D>,
      ref: ForwardedRef<HTMLButtonElement> | null
    ) => {
      return (
        <FormControl {...wrapperProps}>
          {label && <FormLabel>{label}</FormLabel>}
          <Select
            ref={ref}
            {...props}
            sx={combineSx(
              {
                ...(error && { borderColor: "var(--joy-palette-danger-500)" }),
              },
              props.sx
            )}
          />
          {error && typeof error === "string" && (
            <MessageError>{error}</MessageError>
          )}
        </FormControl>
      );
    }
  )
);
