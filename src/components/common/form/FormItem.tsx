import { Box, Typography } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import React, { useMemo } from "react";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";
import { MessageError } from "../MessageError";

interface FormItemProps {
  name: string;
  label?: string;
  labelStyle?: SxProps;
  rules?: RegisterOptions;
  error?: string;
  children: (
    field: ControllerRenderProps<FieldValues, string>
  ) => React.ReactNode;
}

const FormItem: React.FC<FormItemProps> = ({
  name,
  label,
  labelStyle,
  rules,
  error,
  children,
}) => {
  const { control, formState } = useFormContext();

  const errorMessage = useMemo(
    () => error || formState.errors[name]?.message?.toString(),
    [error, formState, name]
  );

  return (
    <Box>
      {label && (
        <Typography sx={{ color: "#fff", fontSize: 13, ...labelStyle }}>
          {label}
        </Typography>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => <>{children(field)}</>}
      />
      {errorMessage && <MessageError>{errorMessage}</MessageError>}
    </Box>
  );
};

export default FormItem;
