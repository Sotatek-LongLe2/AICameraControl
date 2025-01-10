import { Box, Button, Typography } from "@mui/joy";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LogoAstra } from "src/assets/icon";
import { InputPassword } from "src/components/common/InputPassword";
import { MessageError } from "src/components/common/MessageError";
import { Message } from "src/constants/message";
import PAGES from "src/constants/router";
import { validatePassword } from "src/helpers/validatePassword";
import { UserService } from "src/services/UserService";
import { IReqResetPassword } from "src/services/UserService.types";
import { colors } from "src/styles/colors";

export default function ResetPasswordForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IReqResetPassword>();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");
  const isExpired = queryParams.get("expired");

  const onSubmit = async (data: IReqResetPassword) => {
    try {
      if (data.password !== data.password_confirmation) {
        setError("password_confirmation", {
          type: "manual",
          message: "The confirmed password does not match",
        });
        return;
      }

      const res = await UserService.resetPassword({
        code: String(code) || "",
        password: data.password,
        password_confirmation: data.password_confirmation,
      });
      if (res.data.statusCode === 200) {
        toast.success("Reset password successfully");
        navigate(PAGES.LOGIN);
      } else {
        throw new Error("Failed to create password");
      }
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

  useEffect(() => {
    if (isExpired) {
      navigate(`${PAGES.FORGOT_PASSWORD}/?expired=true`);
    }
  }, [isExpired, navigate]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          },
        })}
      >
        <LogoAstra width={60} height={53} />
        <Typography
          level="h3"
          sx={{
            fontWeight: 500,
            color: "#fff",
            marginTop: "24px",
          }}
        >
          Update Password
        </Typography>
        <Typography
          level="body1"
          sx={{
            color: colors["text-secondary"],
            marginTop: "4px",
            textAlign: "center",
          }}
        >
          Please choose a strong password. We will you log you in after you
          click “Continue”.
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
              placeholder="Create Password"
              size="lg"
              {...register("password", {
                required: Message.REQUIRED,
                validate: validatePassword,
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
              placeholder="Confirm Password"
              size="lg"
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
          Continue
        </Button>

        <Typography
          onClick={() => navigate(PAGES.LOGIN)}
          sx={{
            color: colors["primary-main"],
            marginTop: "40px",
            cursor: "pointer",
          }}
        >
          Back to Log In
        </Typography>
      </Box>
    </form>
  );
}
