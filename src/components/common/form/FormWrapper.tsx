import React, { PropsWithChildren } from "react";
import {
  useForm,
  FormProvider,
  FieldValues,
  DefaultValues,
  UseFormProps,
} from "react-hook-form";
import { Box } from "@mui/joy";

interface FormProps<T extends FieldValues> {
  header?: React.FC;
  bottom?: React.FC;
  defaultValues?: T;
  onSubmit: (data: T) => void;
  mode?: UseFormProps<T>["mode"];
}

const Form = <T extends FieldValues>({
  header: FormHeader,
  bottom: FormBottom,
  defaultValues,
  onSubmit,
  mode = "onSubmit",
  children,
}: PropsWithChildren<FormProps<T>>) => {
  const methods = useForm<T>({
    defaultValues: defaultValues as DefaultValues<T>,
    mode,
  });

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
        {FormHeader && <FormHeader />}
        {children}
        {FormBottom && <FormBottom />}
      </Box>
    </FormProvider>
  );
};

export default Form;
