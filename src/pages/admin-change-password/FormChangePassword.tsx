import { Box, BoxProps, Typography } from "@mui/joy";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { InputPassword } from "src/components/common/InputPassword";
import { MessageError } from "src/components/common/MessageError";
import { SITE_USER } from "src/constants/env";
import { Message } from "src/constants/message";
import { PAGES_ADMIN } from "src/constants/router";
import { validatePassword } from "src/helpers/validatePassword";
import { AuthService } from "src/services/AuthService";
import { IReqChangePassword } from "src/services/AuthService.types";
import { useMedia } from "src/shared/hooks/useMedia";
import { combineSx } from "src/shared/utils";
import { useAppStore } from "src/store/appStore";
import { useAuthStore } from "src/store/authStore";
import { useUserStore } from "src/store/userStore";

type FormChangePasswordProps = BoxProps & {};

export const FormChangePassword = ({
  children,
  ...props
}: FormChangePasswordProps) => {
  const { isMobile } = useMedia();
  const navigate = useNavigate();
  const clear = useUserStore((state) => state.clear);
  const logout = useAuthStore((state) => state.logout);
  const setLoading = useAppStore((state) => state.setLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
    // watch,
    setError,
  } = useForm<IReqChangePassword>();

  const onSubmit = async (data: IReqChangePassword) => {
    try {
      setLoading(true);
      if (
        !errors.currentPassword &&
        !errors.newPassword &&
        !errors.confirmNewPassword
      ) {
        const passwordError = validatePassword(data.newPassword);
        if (passwordError !== true) {
          setError("newPassword", {
            type: "manual",
            message: passwordError,
          });
          return;
        }

        if (data.newPassword !== data.confirmNewPassword) {
          setError("confirmNewPassword", {
            type: "manual",
            message: "The confirmed password does not match",
          });
          return;
        }

        if (data.currentPassword === data.newPassword) {
          setError("newPassword", {
            type: "manual",
            message: "New password must be different from the current password",
          });
          return;
        }

        const res = await AuthService.changePassword({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        });
        if (res.data.statusCode === 201) {
          await logout();
          clear();
          navigate(PAGES_ADMIN.LOGIN);
          toast.success("Update password successfully");
        } else {
          throw new Error("Failed to update password");
        }
      }
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error?.response?.data?.message === "The current password is incorrect"
      ) {
        setError("currentPassword", {
          type: "manual",
          message: error.response.data.message,
        });
      } else {
        toast.error("Failed to update password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} {...props}>
      <Box>
        <Box
          sx={{
            display: "grid",
            gap: 20,
            width: "100%",
            gridTemplateColumns: "1fr 1fr",

            ...(isMobile &&
              SITE_USER && {
                gridTemplateColumns: "1fr",
              }),
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1px" }}>
            <Typography level="input-label" color="text-primary">
              Current Password
            </Typography>
            <InputPassword
              variant={"outlined"}
              size="md"
              {...register("currentPassword", {
                required: Message.REQUIRED,
              })}
              slotProps={{
                input: {
                  maxLength: 72,
                },
              }}
            />
            {errors.currentPassword && (
              <MessageError>
                {String(errors.currentPassword.message)}
              </MessageError>
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

            ...(isMobile &&
              SITE_USER && {
                gridTemplateColumns: "1fr",
              }),
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1px" }}>
            <Typography level="input-label" color="text-primary">
              New Password
            </Typography>
            <InputPassword
              variant={"outlined"}
              size="md"
              {...register("newPassword", {
                required: Message.REQUIRED,
              })}
              slotProps={{
                input: {
                  maxLength: 72,
                },
              }}
            />
            {errors.newPassword && (
              <MessageError>{String(errors.newPassword.message)}</MessageError>
            )}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1px" }}>
            <Typography level="input-label" color="text-primary">
              Confirm New Password
            </Typography>
            <InputPassword
              variant={"outlined"}
              size="md"
              {...register("confirmNewPassword", {
                required: Message.REQUIRED,
              })}
              slotProps={{
                input: {
                  maxLength: 72,
                },
              }}
            />
            {errors.confirmNewPassword && (
              <MessageError>
                {String(errors.confirmNewPassword.message)}
              </MessageError>
            )}
          </Box>
        </Box>
      </Box>
      {children}
    </Box>
  );
};

type ButtonControlProps = BoxProps & {};

const ButtonControl = ({ children, ...props }: ButtonControlProps) => {
  return (
    <Box
      {...props}
      sx={combineSx(
        {
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          mt: 44,
          gap: 16,
        },
        props.sx
      )}
    >
      {children}
    </Box>
  );
};

FormChangePassword.ButtonControl = ButtonControl;
