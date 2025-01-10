import { Box, Button, Input, Link, Typography } from "@mui/joy";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { LogoAstra, TickSuccess } from "src/assets/icon";
import { MessageError } from "src/components/common/MessageError";
import { Message } from "src/constants/message";
import PAGES from "src/constants/router";
import { formatTime } from "src/helpers/formatTime";
import { UserService } from "src/services/UserService";
import { IReqForgotPassword } from "src/services/UserService.types";
import { useAppStore } from "src/store/appStore";
import { colors } from "src/styles/colors";

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<IReqForgotPassword>();

  const navigate = useNavigate();
  const setLoading = useAppStore((state) => state.setLoading);
  const [searchParam] = useSearchParams();
  const [isSent, setIsSentMail] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [coolDown, setCoolDown] = useState(300);
  const [endTime, setEndTime] = useState<number>(0);

  const isExpired = searchParam.get("expired");

  const formatTimeLeft = (time: number) => {
    return -dayjs().diff(new Date(Number(time)), "second");
  };

  const pageTitle = isExpired
    ? "This link has expired"
    : isSent
    ? "Link Sent"
    : "Send a Reset Link";

  const pageDescription = isExpired
    ? "Please try again and use your reset password link within the next five minutes."
    : isSent
    ? "We sent you an email. Please click the link it contains to reset your password."
    : "Please type in the email address associated with your Astra account. We well send you a link to reset your password.";

  const fetchTimeLeft = async (emailResend: string) => {
    const res = await UserService.checkTimeResendEmail(emailResend);

    return res.data.data.waitTime;
  };

  const sendResetEmail = async (email: string, showToast = false) => {
    try {
      setLoading(true);
      const waitTime = await fetchTimeLeft(email.trim());
      const res = await UserService.sendMailResetPassword({
        email: email.trim(),
      });
      if (res.status === 201) {
        const timeLeft = waitTime
          ? formatTimeLeft(Number(waitTime))
          : formatTimeLeft(Number(res.data.data.waitTime));

        if (timeLeft > 300) {
          setCoolDown(300);
          setEndTime(Date.now() + timeLeft * 1000);
          setIsSentMail(true);
          setIsDisabled(true);
        } else {
          setCoolDown(timeLeft);
          setEndTime(Date.now() + timeLeft * 1000);
          setIsSentMail(true);
          setIsDisabled(true);
        }

        if (showToast) {
          toast.success("Resend email successfully");
        }
        if (isExpired) {
          navigate(PAGES.FORGOT_PASSWORD);
        }
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
        setError("email", {
          type: "manual",
          message: Message.USER_DELETED,
        });
      } else {
        setError("email", {
          type: "manual",
          message: "This email address has not been registered yet",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let intervalId: number;

    if (coolDown > 0) {
      // Set end time when cooldown starts
      if (endTime === 0) {
        setEndTime(Date.now() + coolDown * 1000);
      }

      intervalId = window.setInterval(() => {
        const timeLeft = Math.ceil((endTime - Date.now()) / 1000);

        if (timeLeft <= 0) {
          setCoolDown(0);
          setIsDisabled(false);
          setEndTime(0);
        } else {
          setCoolDown(timeLeft);
        }
      }, 100);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [coolDown, endTime]);

  const onSubmit = async (data: IReqForgotPassword) => {
    await sendResetEmail(data.email);
  };

  useEffect(() => {
    if (isExpired) {
      const emailForgot = searchParam.get("email");
      setValue("email", emailForgot || "");
    }
  }, [isExpired, searchParam, setValue]);

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
        <LogoAstra height={53} width={60} />
        <Typography
          level="h3"
          sx={{
            fontWeight: 500,
            color: colors["text-primary"],
            marginTop: "24px",
          }}
        >
          {pageTitle}
        </Typography>
        <Typography
          level="body1"
          sx={{
            color: colors["text-secondary"],
            marginTop: "4px",
            textAlign: "center",
          }}
        >
          {pageDescription}
        </Typography>

        {isSent && (
          <Box
            sx={{
              border: `1px solid ${colors["success-main"]}`,
              borderRadius: "6px",
              display: "flex",
              gap: "12px",
              alignItems: "center",
              padding: "11px 15px",
              marginTop: "20px",
            }}
          >
            <Box>
              <TickSuccess />
            </Box>
            <Typography level="body1">
              Please check your inbox for our email. Alternatively,
              <Typography
                onClick={!isDisabled ? handleSubmit(onSubmit) : undefined}
                sx={{
                  color: colors["primary-main"],
                  cursor: isDisabled ? "not-allowed" : "pointer",
                }}
              >
                {" "}
                <Typography
                  sx={{
                    color: !isDisabled ? "" : `${colors["text-primary"]}`,
                    opacity: isDisabled ? "0.5" : 1,
                  }}
                >
                  send a Reset Link again.
                </Typography>{" "}
                {isDisabled && (
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "4px" }}
                  >
                    {" "}
                    <Box
                      component={"img"}
                      src={"/icon/kyc-in-progress.svg"}
                      width={16}
                      height={16}
                    />
                    {formatTime(coolDown)}
                  </Box>
                )}
              </Typography>
            </Typography>
          </Box>
        )}

        {/* Input Fields */}
        <Box
          sx={{
            margin: "20px 0",
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {/* Invitation code Input */}
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
            disabled={isSent}
          />
          {errors.email?.message && (
            <MessageError>{String(errors.email.message)}</MessageError>
          )}
        </Box>

        {/* Login Button */}
        <Button
          variant={"solid"}
          sx={{
            width: "100%",
          }}
          type="submit"
          disabled={isSent}
        >
          Send Email
        </Button>

        <Link href={PAGES.LOGIN} level="body1" mt={40}>
          Back to Log In
        </Link>
      </Box>
    </Box>
  );
}
