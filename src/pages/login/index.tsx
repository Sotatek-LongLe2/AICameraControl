import { Box, Button, Checkbox, Input, Link, Typography } from "@mui/joy";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LogoAstra } from "src/assets/icon";
import { InputPassword } from "src/components/common/InputPassword";
import { MessageError } from "src/components/common/MessageError";
import { Role, UserStatus } from "src/constants/enumBE";
import { SITE_USER } from "src/constants/env";
import { Message } from "src/constants/message";
import { PAGES_ADMIN } from "src/constants/router";
import { IReqLogin, IResLogin } from "src/services/AuthService.types";
import { UserInformationService } from "src/services/UserInformationService";
import validateStep from "src/shared/helpers/validateStep";
import { useAppStore } from "src/store/appStore";
import { useAuthStore } from "src/store/authStore";
import { IProgress, useUserStore } from "src/store/userStore";
import { colors } from "src/styles/colors";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<IReqLogin>();
  const [rememberMe, setRememberMe] = useState(true);
  const login = useAuthStore((state) => state.login);
  const setIsLogined = useAuthStore((state) => state.setIsLogined);
  const setPartialAccess = useAuthStore((state) => state.setPartialAccess);
  const setProgress = useUserStore((state) => state.setProgress);
  const clearProgress = useUserStore((state) => state.clearProgress);
  const setLoading = useAppStore((state) => state.setLoading);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = Cookies.get("email");
    const savedPassword = Cookies.get("password");
    const savedRememberMe = Cookies.get("rememberMe");

    if (savedRememberMe === "true") {
      setRememberMe(true);
      if (savedEmail && savedPassword) {
        setValue("email", savedEmail);
        setValue("password", savedPassword);
      }
    }
  }, [setValue]);

  const onSubmit = async (data: IReqLogin) => {
    try {
      setLoading(true);
      // Get token
      const loginResponse = await login(data.email, data.password);

      // Save remember me cookies
      if (rememberMe) {
        const expireDate = 30; // days
        Cookies.set("email", data.email, {
          expires: expireDate,
        });
        Cookies.set("password", data.password, {
          expires: expireDate,
        });
        Cookies.set("rememberMe", "true", {
          expires: expireDate,
        });
      } else {
        Cookies.remove("email");
        Cookies.remove("password");
        Cookies.remove("rememberMe");
      }

      if (SITE_USER) {
        await loginUser(loginResponse.data);
      } else {
        await loginAdmin(loginResponse.data);
      }
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error?.response?.data?.message[0] === "email must be an email"
      ) {
        setError("email", {
          type: "manual",
          message: Message.VALID_EMAIL,
        });
      } else if (
        axios.isAxiosError(error) &&
        error?.response?.data?.code === "USER_00003"
      ) {
        setError("password", {
          type: "manual",
          message: Message.USER_DELETED,
        });
      } else
        setError("password", {
          type: "manual",
          message: "The user credentials were incorrect",
        });
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (data: IResLogin) => {
    if ([Role.ADMIN, Role.SUPPER_ADMIN].includes(data.data.role)) {
      throw new Error("You are not authorized to access this page");
      return;
    }
    let progress: IProgress | undefined = undefined;

    // Redirect to registration page
    const res = await UserInformationService.getCurrentStep();
    if (res.data.statusCode === 200) {
      progress = { ...res.data.data };
      setProgress(progress);
    } else throw new Error("Failed to get current step");

    if (data.data.status === UserStatus.ACTIVE) {
      setIsLogined(true);
      setPartialAccess("full");
    } else {
      // Validate step & redirect to target page
      const targetPage = validateStep(progress as IProgress);
      if (targetPage) {
        // Timeout for switch router
        setTimeout(() => {
          navigate(targetPage);
        }, 0);
      }
    }
  };

  const loginAdmin = async (data: IResLogin) => {
    if ([Role.ADMIN, Role.SUPPER_ADMIN].includes(data.data.role)) {
      clearProgress();
      setIsLogined(true);
      setPartialAccess("full");

      //CHANGE_PASSWORD;
      if (data.statusCode === 201 && data.data.isChangePass === 0) {
        setTimeout(() => {
          navigate(PAGES_ADMIN.FORCE_PASSWORD);
        }, 0);
      } else {
        setTimeout(() => {
          navigate(PAGES_ADMIN.DASHBOARD);
        }, 0);
      }
      return;
    } else {
      setError("password", {
        type: "manual",
        message: "The user credentials were incorrect",
      });
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
          {SITE_USER ? "Welcome to Astra" : "Astra Admin Pannel"}
        </Typography>
        <Typography
          level="body1"
          sx={{
            color: colors["text-secondary"],
            marginTop: "4px",
            textAlign: "center",
          }}
        >
          {SITE_USER
            ? "Sign-in to access our exclusive offers now."
            : "Access to this panel is strictly reserved to Launch Point. Any attempt of fraudulent access can be prosecuted."}
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
          {/* Email Input */}
          <Box>
            <Input
              variant={"outlined"}
              placeholder="Email"
              size="lg"
              {...register("email", {
                required: Message.REQUIRED,
              })}
              slotProps={{
                input: {
                  maxLength: 100,
                },
              }}
            />
            {errors.email?.message && (
              <MessageError>{String(errors.email.message)}</MessageError>
            )}
          </Box>

          {/* Password Input */}
          <Box>
            <InputPassword
              variant={"outlined"}
              placeholder="Password"
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
        </Box>

        {/* Remember Me and Forgot Password */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: "20px",
          }}
        >
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "9px",
            }}
          >
            <Checkbox
              label={"Remember Me"}
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
          </Box>
          <Link href={"/forgot-password"}>
            <Typography level="body1">Forgot Password?</Typography>
          </Link>
        </Box>

        {/* Login Button */}
        <Button
          key={""}
          variant={"solid"}
          sx={{
            width: "100%",
            height: "42px",
          }}
          type="submit"
        >
          Login
        </Button>

        {SITE_USER && (
          <Typography
            level="body1"
            sx={{ color: colors["text-primary"], marginTop: "40px" }}
          >
            New Customer? <Link href={"/register"}>Register here.</Link>
          </Typography>
        )}
      </Box>
    </Box>
  );
}
