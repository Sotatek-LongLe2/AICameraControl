import { Box, Button, Link, Typography } from "@mui/joy";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LogoAstra } from "src/assets/icon";
import { InputPassword } from "src/components/common/InputPassword";
import { MessageError } from "src/components/common/MessageError";
import { Message } from "src/constants/message";
import PAGES from "src/constants/router";
import { IReqCreatePassword } from "src/services/UserService.types";
import { useAuthStore } from "src/store/authStore";
import { colors } from "src/styles/colors";

export default function CreatePasswordPage() {
  const navigate = useNavigate();
  const createPassword = useAuthStore((state) => state.createPassword);

  const {
    register,
    handleSubmit,
    formState: { errors },
    // watch,
    setError,
  } = useForm<IReqCreatePassword>();

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      return "Passwords must contain at least 8 characters, capital letters, lowercase letters, numbers, special characters and no spaces";
    }
    if (/\s/.test(password)) {
      return "Passwords must not contain spaces";
    }
    return true;
  };

  const onSubmit = async (data: IReqCreatePassword) => {
    try {
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

        const res = await createPassword(
          data.password,
          data.password_confirmation
        );
        if (res.data.statusCode === 201) {
          navigate(PAGES.RISK_DISCLOSURE);
        } else {
          throw new Error("Failed to create password");
        }
      }
    } catch (error) {
      toast.error(String(error));
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
          Create Password
        </Typography>
        <Typography
          level="body1"
          sx={{
            color: colors["text-secondary"],
            marginTop: "4px",
            textAlign: "center",
          }}
        >
          We could validate your invitation code. Please <br /> choose your
          password to access Astra.
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
          Continue
        </Button>

        <Typography
          level="body1"
          sx={{ color: colors["text-primary"], marginTop: "40px" }}
        >
          Already have an account? <Link href={"/login"}>Login here.</Link>
        </Typography>
      </Box>
    </Box>
  );
}
