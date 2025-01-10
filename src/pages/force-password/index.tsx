import { Box, Button, Typography } from "@mui/joy";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LogoAstra } from "src/assets/icon";
import { InputPassword } from "src/components/common/InputPassword";
import { MessageError } from "src/components/common/MessageError";
import { Message } from "src/constants/message";
import { PAGES_ADMIN } from "src/constants/router";
import { validatePassword } from "src/helpers/validatePassword";
import { AdminService } from "src/services/AdminService";
import { IReqCreatePassword } from "src/services/UserService.types";
import { useAppStore } from "src/store/appStore";
import { colors } from "src/styles/colors";

export default function ForcePasswordPage() {
  const navigate = useNavigate();
  const setLoading = useAppStore((state) => state.setLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
    // watch,
    setError,
  } = useForm<IReqCreatePassword>();

  const onSubmit = async (data: IReqCreatePassword) => {
    try {
      setLoading(true);
      if (!errors.password && !errors.password_confirmation) {
        const passwordError = validatePassword(data.password);
        if (passwordError !== true) {
          setError("password", {
            type: "manual",
            message: passwordError,
          });
          return;
        }

        if (data.password !== data.password_confirmation) {
          setError("password_confirmation", {
            type: "manual",
            message: "The confirmed password does not match",
          });
          return;
        }

        const res = await AdminService.changePassword({
          password: data.password,
        });
        if (res.data.statusCode === 200) {
          navigate(PAGES_ADMIN.LOGIN);
        } else {
          throw new Error("Failed to create password");
        }
      }
    } catch (error) {
      console.log("ERROR: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={(theme) => ({
        [theme.breakpoints.down("laptop")]: {
          width: "100%",
        },
      })}
    >
      <Box
        sx={(theme) => ({
          padding: "48px",
          backgroundColor: colors.paper,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "460px",
          borderRadius: "6px",
          [theme.breakpoints.down("laptop")]: {
            width: "100%",
            padding: "48px 12px 12px 12px",
          },
        })}
      >
        <LogoAstra width={60} height={53} />
        <Typography
          level="h3"
          sx={{
            fontWeight: 500,
            color: colors["text-primary"],
            marginTop: "24px",
          }}
        >
          Secure your Account
        </Typography>
        <Typography
          level="body1"
          sx={{
            color: colors["text-secondary"],
            marginTop: "4px",
            textAlign: "center",
          }}
        >
          It is the first time you are logging in. Please change your password
          to make your account safer.
        </Typography>

        {/* Input Fields */}
        <Box
          sx={{
            margin: "20px 0",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "100%",
          }}
        >
          {/* Password Input */}
          <Box>
            <InputPassword
              variant={"outlined"}
              placeholder="New Password"
              size="lg"
              {...register("password", {
                required: Message.REQUIRED,
              })}
              slotProps={{
                input: {
                  maxLength: 72,
                },
              }}
            />
            {errors.password && (
              <MessageError>{String(errors.password.message)}</MessageError>
            )}
          </Box>

          {/* Confirm Password Input */}
          <Box>
            <InputPassword
              variant={"outlined"}
              placeholder="Password Confirmation"
              sx={{
                height: "48px",
              }}
              {...register("password_confirmation", {
                required: Message.REQUIRED,
              })}
              slotProps={{
                input: {
                  maxLength: 72,
                },
              }}
            />
            {errors.password_confirmation && (
              <MessageError>
                {String(errors.password_confirmation.message)}
              </MessageError>
            )}
          </Box>
        </Box>

        {/* Continue Button */}
        <Button
          variant={"solid"}
          sx={{
            width: "100%",
            height: "42px",
          }}
          type="submit"
        >
          Update Password
        </Button>
      </Box>
    </Box>
  );
}
