import { ComponentType, forwardRef, memo } from "react";
import {
  InputAttributes,
  NumericFormat,
  NumericFormatProps,
} from "react-number-format";
import { AppInput, AppInputProps } from "./AppInput";

export type AppInputNumberProps<BaseType = InputAttributes> =
  NumericFormatProps<BaseType> & {};

export const AppInputNumber = memo(
  forwardRef<HTMLInputElement, AppInputNumberProps<AppInputProps>>(
    ({ maxLength, ...props }, ref) => {
      return (
        <NumericFormat
          thousandSeparator
          {...props}
          isAllowed={(values) => {
            if (maxLength) return values.value.length <= maxLength;

            return props.isAllowed?.(values) ?? true;
          }}
          customInput={
            props.customInput ?? (AppInput as ComponentType<AppInputProps>)
          }
          getInputRef={props.getInputRef ?? ref}
        />
      );
    }
  )
);
