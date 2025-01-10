import { Box, Button, Typography } from "@mui/joy";
import { useForm } from "react-hook-form";
import { MessageError } from "src/components/common/MessageError";
import { colors } from "src/styles/colors";
import { AppInput } from "src/components/base/AppInput";
import { Message } from "src/constants/message";
import { useAppStore } from "src/store/appStore";
import { AdminManagementService } from "src/services/AdminManagementService";
import { IReqPostAdmin } from "src/services/AdminManagementService.types";
import { PAGES_ADMIN } from "src/constants/router";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Regex } from "src/constants/regex";
import axios from "axios";
import { toast } from "react-toastify";
import { useCallback, useEffect } from "react";

interface IAdminManagementForm {
  isEdit?: boolean;
}

export const AdminManagementForm = ({ isEdit }: IAdminManagementForm) => {
  const navigate = useNavigate();
  const setLoading = useAppStore((state) => state.setLoading);
  const [searchParams] = useSearchParams();
  const adminId = searchParams.get("adminId");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    watch,
  } = useForm<IReqPostAdmin>();

  const validateEmail = (email: string) => {
    if (!Regex.EMAIL.test(email)) {
      return Message.VALID_EMAIL;
    }
    return true;
  };

  const fetchDetailAdmin = useCallback(async () => {
    try {
      setLoading(true);
      if (!adminId) return;
      const res = await AdminManagementService.getDetailAdmin({
        adminId: Number(adminId),
      });
      if (res.data.statusCode === 200) {
        setValue("firstName", res.data.data.firstName);
        setValue("lastName", res.data.data.lastName);
        setValue("email", res.data.data.email);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  }, [adminId, setLoading, setValue]);

  const onSubmit = async (data: IReqPostAdmin) => {
    const trimmedData = {
      ...data,
      firstName: data.firstName?.trim(),
      lastName: data.lastName?.trim(),
      email: data.email?.trim(),
      password: data.password?.trim(),
    };

    const dataSubmit = isEdit
      ? { ...trimmedData, adminId: Number(adminId) }
      : trimmedData;

    try {
      setLoading(true);
      if (
        !errors.email &&
        !errors.firstName &&
        !errors.lastName &&
        !errors.password
      ) {
        const emailError = validateEmail(data.email);
        if (emailError !== true) {
          setError("email", {
            type: "manual",
            message: emailError,
          });
          return;
        }
        const res = await AdminManagementService.postAdmin(dataSubmit);
        if (res.data.statusCode === 201) {
          navigate(PAGES_ADMIN.ADMIN_MANAGEMENT.INDEX);
          toast.success(isEdit ? "Account edited" : "Account created");
        } else {
          throw res;
        }
      }
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error?.response?.data?.message === "Email already existed."
      ) {
        setError("email", {
          type: "manual",
          message: "This email address has been registered as a User or Admin",
        });
      } else if (
        axios.isAxiosError(error) &&
        error?.response?.data?.message[0] === "email must be an email"
      ) {
        setError("email", {
          type: "manual",
          message: Message.VALID_EMAIL,
        });
      } else if (
        axios.isAxiosError(error) &&
        error?.response?.data?.code === "USER_00004"
      ) {
        setError("email", {
          type: "manual",
          message: "This email address has been deleted by Super Admin",
        });
      } else {
        toast.error(String(error));
        console.log("error", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailAdmin();
  }, [fetchDetailAdmin]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        padding: "20px",
        background: colors.paper,
      }}
    >
      <Typography level="h4" sx={{ marginBottom: "28px" }}>
        {isEdit ? "Edit Admin Account" : "Create Admin Account"}
      </Typography>
      <Typography level="body1">
        {!isEdit && (
          <>
            This user will have access to Astra Admin panel, but won’t be able
            to create and remove other users account.{" "}
          </>
        )}
      </Typography>
      <Box mt="20px">
        <Box
          sx={{
            display: "grid",
            gap: 20,
            width: "100%",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1px" }}>
            <AppInput
              label="First Name"
              {...register("firstName", {
                required: Message.REQUIRED,
                validate: (value) => value?.trim() !== "" || Message.REQUIRED,
              })}
              slotProps={{
                input: {
                  maxLength: 100,
                },
              }}
            />
            {errors.firstName && (
              <MessageError>{String(errors.firstName.message)}</MessageError>
            )}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1px" }}>
            <AppInput
              label="Last Name"
              {...register("lastName", {
                required: Message.REQUIRED,
                validate: (value) => value?.trim() !== "" || Message.REQUIRED,
              })}
              slotProps={{
                input: {
                  maxLength: 100,
                },
              }}
            />
            {errors.lastName && (
              <MessageError>{String(errors.lastName.message)}</MessageError>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: "grid",
            gap: 20,
            width: "100%",
            gridTemplateColumns: "1fr 1fr",
            marginTop: "20px",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1px" }}>
            <AppInput
              label="Email"
              {...register("email", {
                required: Message.REQUIRED,
                validate: (value) => value?.trim() !== "" || Message.REQUIRED,
              })}
              slotProps={{
                input: {
                  maxLength: 100,
                },
              }}
            />
            {errors.email && (
              <MessageError>{String(errors.email.message)}</MessageError>
            )}
          </Box>
          {!isEdit && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1px" }}>
              <AppInput
                label="Password"
                {...register("password", {
                  required: Message.REQUIRED,
                  validate: (value) => value?.trim() !== "" || Message.REQUIRED,
                })}
                slotProps={{
                  input: {
                    maxLength: 10,
                  },
                }}
              />
              {errors.password && (
                <MessageError>{String(errors.password.message)}</MessageError>
              )}
            </Box>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          mt: "40px",
          gap: "16px",
        }}
      >
        <Button
          variant="outlined"
          color="astra-pink"
          onClick={() => window.history.back()}
          sx={{
            flex: 1,
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={
            !isEdit
              ? !watch("email") ||
                !watch("firstName") ||
                !watch("lastName") ||
                !watch("password")
              : !watch("email") || !watch("firstName") || !watch("lastName")
          }
          sx={{
            flex: 1,
          }}
        >
          {isEdit ? "Update Account" : "Create Account"}
        </Button>
      </Box>
    </Box>
  );
};
