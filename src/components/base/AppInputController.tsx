import { ForwardedRef, useImperativeHandle, useRef } from "react";
import {
  Control,
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  ValidateResult,
} from "react-hook-form";
import { AppInput, AppInputProps } from "./AppInput";
import { genericForwardRef, genericMemo } from "src/shared/utils";
import { Message } from "src/constants/message";

export interface AppInputControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<AppInputProps, "defaultValue" | "name">,
    Omit<ControllerProps<TFieldValues, TName>, "render" | "name" | "control"> {
  name: FieldPath<TFieldValues>;
  control?: Control<TFieldValues>;
}

export const AppInputController = genericMemo(
  genericForwardRef(
    <
      TFieldValues extends FieldValues = FieldValues,
      TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
    >(
      {
        name,
        defaultValue,
        rules,
        shouldUnregister,
        control,
        disabled,
        required,
        ...props
      }: AppInputControllerProps<TFieldValues, TName>,
      ref: ForwardedRef<HTMLInputElement | undefined>
    ) => {
      const innerRef = useRef<HTMLInputElement | undefined>(undefined);

      useImperativeHandle(ref, () => innerRef.current);

      return (
        <Controller
          name={name as TName}
          defaultValue={defaultValue}
          rules={{
            required: required
              ? { value: true, message: Message.REQUIRED }
              : false,
            ...rules,
            validate: (value, formValues) => {
              if (required && !value?.trim?.()) {
                return "This field is required";
              }

              return typeof rules?.validate === "function"
                ? rules?.validate?.(value, formValues)
                : (rules?.validate as ValidateResult);
            },
          }}
          shouldUnregister={shouldUnregister}
          control={control}
          disabled={disabled}
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <AppInput
              {...props}
              {...field}
              onChange={(e) => {
                field.onChange(e);
                props.onChange?.(e);
              }}
              error={error?.message ?? props.error}
              disabled={disabled}
              onBlur={(e) => {
                field.onChange(e);
                props.onChange?.(e);
              }}
              slotProps={{
                ...props.slotProps,
                input: {
                  ref: (el) => {
                    innerRef.current = el ?? undefined;
                    ref(el);
                    return innerRef;
                  },
                  ...props.slotProps?.input,
                },
              }}
            />
          )}
        />
      );
    }
  )
);
