import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/joy";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import FormItem from "src/components/common/form/FormItem";
import { UserTypeEnum } from "src/constants/enumBE";
import { Message } from "src/constants/message";
import { DefaultValuesEditFrom } from "src/services/AdminUsersCustomersService.type";
import CorporateFrom from "./CorporateFrom";
import IndividualForm from "./IndividualForm";

const UserCustomerForm = ({
  isCreate,
  defaultValues,
  errorEmail,
  setErrorEmail,
}: {
  isCreate?: boolean;
  defaultValues?: DefaultValuesEditFrom | undefined;
  errorEmail?: string | null;
  setErrorEmail?: (value: string | null) => void;
}) => {
  const navigate = useNavigate();
  const { reset, watch, formState, setError } = useFormContext();

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  useEffect(() => {
    if (errorEmail) {
      setError("email", {
        message: errorEmail,
      });
    }
  }, [errorEmail, setError]);

  const { isValid } = formState;

  const type = watch("type");

  return (
    <>
      <Grid container sx={{ mb: 24 }}>
        <Grid mobile={12} laptop={12}>
          <FormItem
            name="type"
            label="Type of Account"
            labelStyle={{
              fontSize: 13,
            }}
            rules={{ required: Message.REQUIRED }}
          >
            {(field) => (
              <FormControl>
                <RadioGroup
                  {...field}
                  value={field.value || ""}
                  orientation="horizontal"
                  sx={{
                    pl: 9,
                  }}
                >
                  <Radio
                    value={UserTypeEnum.INDIVIDUAL}
                    label="Individual"
                    slotProps={{
                      radio: {
                        sx: {
                          borderWidth: 3,
                          width: 18,
                          height: 18,
                        },
                      },
                      label: {
                        sx: {
                          fontWeight: 400,
                        },
                      },
                      icon: {
                        sx: {
                          ml: 1,
                        },
                      },
                    }}
                  />
                  <Radio
                    value={UserTypeEnum.CORPORATE}
                    label="Corporate"
                    sx={{
                      ml: 21,
                    }}
                    slotProps={{
                      radio: {
                        sx: {
                          borderWidth: 3,
                          width: 18,
                          height: 18,
                        },
                      },
                      label: {
                        sx: {
                          fontWeight: 400,
                        },
                      },
                      icon: {
                        sx: {
                          ml: 1,
                        },
                      },
                    }}
                  />
                </RadioGroup>
              </FormControl>
            )}
          </FormItem>
        </Grid>
      </Grid>
      <Typography level="h4" sx={{ mb: 24 }}>
        Credentials
      </Typography>
      <Grid container spacing={20} sx={{ mb: type ? 14 : 0 }}>
        <Grid mobile={12} laptop={6}>
          <FormItem
            name="email"
            label="Email"
            labelStyle={{
              fontWeight: 400,
              lineHeight: "15px",
              mb: 1,
            }}
            rules={{
              required: Message.REQUIRED,
              maxLength: {
                value: 100,
                message: "This field cannot exceed 100 characters",
              },
            }}
          >
            {(field) => (
              <Input
                {...field}
                fullWidth
                sx={{ background: "transparent" }}
                slotProps={{
                  input: {
                    maxLength: 100,
                  },
                }}
                onChange={(e) => {
                  field.onChange(e);
                  if (setErrorEmail && errorEmail) setErrorEmail(null);
                }}
              />
            )}
          </FormItem>
        </Grid>
        <Grid mobile={12} laptop={6}>
          <FormItem
            name="password"
            label="Password"
            labelStyle={{
              fontWeight: 400,
              lineHeight: "15px",
              mb: 1,
            }}
            rules={{
              required: Message.REQUIRED,
              maxLength: {
                value: 10,
                message: "This field cannot exceed 10 characters",
              },
            }}
          >
            {(field) => (
              <Input
                {...field}
                type="password"
                autoComplete="new-password"
                fullWidth
                sx={{ background: "transparent" }}
                slotProps={{
                  input: {
                    maxLength: 10,
                  },
                }}
              />
            )}
          </FormItem>
        </Grid>
      </Grid>
      {Number(type) === UserTypeEnum.INDIVIDUAL && <IndividualForm />}
      {Number(type) === UserTypeEnum.CORPORATE && <CorporateFrom />}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          mt: type === undefined ? 34 : 44,
          mb: 64,
          gap: 16,
        }}
      >
        <Button
          variant="outlined"
          color="astra-pink"
          onClick={() => navigate(-1)}
          sx={() => ({
            flex: 1,
          })}
        >
          Cancel
        </Button>
        <Button type="submit" sx={{ flex: 1 }} disabled={!isValid}>
          {isCreate ? "Create User" : "Update User Information"}
        </Button>
      </Box>
    </>
  );
};

export default UserCustomerForm;
