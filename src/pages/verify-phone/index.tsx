import { Box, Button, styled, Typography } from "@mui/joy";
import axios from "axios";
import { useCallback, useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactPhoneInput from "react-phone-input-2";
import { useNavigate } from "react-router-dom";
import { CloseError, LogoAstra } from "src/assets/icon";
import { MessageError } from "src/components/common/MessageError";
import OtpInput from "src/components/common/OtpInput";
import PAGES from "src/constants/router";
import { convertNumberHidden, cutNumber } from "src/helpers/formatNumber";
import { UserInformationService } from "src/services/UserInformationService";
import { IReqUpdatePhoneNumber } from "src/services/UserInformationService.types";
import { useAppStore } from "src/store/appStore";
import { useUserStore } from "src/store/userStore";
import { colors } from "src/styles/colors";

const TextDetail = styled(Typography)(() => ({
  color: colors["text-secondary"],
}));

export default function VerifyPhoneForm() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setError,
  } = useForm<IReqUpdatePhoneNumber>();

  const navigate = useNavigate();
  const setLoading = useAppStore((state) => state.setLoading);
  const [isSentSMS, setIsSentSMS] = useState(false);
  const phoneNumber = watch("phoneNumber");
  const [showErrorOtp, setShowErrorOtp] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const updateProgress = useUserStore((s) => s.updateProgress);
  const [phoneCode, setPhoneCode] = useState("+84");

  useEffect(() => {
    const adjustDropdownWidth = () => {
      const phoneInput = document.querySelector(".customPhoneInput");
      const dropdown = document.querySelector(".customDropdown");

      if (phoneInput && dropdown) {
        const inputWidth = phoneInput.clientWidth;
        (dropdown as HTMLElement).style.width = `${inputWidth + 3}px`;
      }
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          const dropdown = document.querySelector(".customDropdown");
          if (dropdown) {
            adjustDropdownWidth();
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    window.addEventListener("resize", adjustDropdownWidth);

    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", adjustDropdownWidth);
    };
  }, []);

  const sendPhoneNumber = async (phone: string, code: string) => {
    const sanitizedCountryCode = code.replace("+", "");
    const phoneNumberWithoutCode = phone.startsWith(sanitizedCountryCode)
      ? phone.slice(sanitizedCountryCode.length)
      : phone;

    return await UserInformationService.updatePhoneNumber({
      phoneCode: code,
      phoneNumber: phoneNumberWithoutCode,
    });
  };
  const handleSendPhoneNumber = async (phone: string, code: string) => {
    try {
      setLoading(true);
      const res = await sendPhoneNumber(phone, code);
      if (res.data.statusCode === 200) {
        setIsSentSMS(true);
        setIsDisabled(true);
        setCountdown(30);
        const interval = setInterval(() => {
          setCountdown((prev) => {
            if (prev !== null && prev > 1) {
              return prev - 1;
            } else {
              clearInterval(interval);
              setIsDisabled(false);
              return null;
            }
          });
        }, 1000);
      }
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error?.response?.data?.code === "SMS_00005"
      ) {
        setError("phoneNumber", {
          type: "manual",
          message: error?.response?.data?.message,
        });
      } else {
        console.log("Error: ", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: IReqUpdatePhoneNumber) => {
    await handleSendPhoneNumber(data.phoneNumber, phoneCode);
  };

  const handleResend = async (): Promise<void> => {
    await handleSendPhoneNumber(phoneNumber, phoneCode);
  };
  const handleOtpChange = useCallback((): void => {}, []);

  const handleOnComplete = useCallback(
    async (value: string): Promise<void> => {
      try {
        setLoading(true);
        const response = await UserInformationService.verifyPhoneNumber({
          code: value,
        });
        if (response.data.statusCode === 200) {
          updateProgress({
            phoneVerified: 1,
            step: 0,
          });
          navigate(PAGES.REGISTRATION.STEP_1);
        } else {
          console.error("OTP verification failed");
        }
      } catch (error) {
        setShowErrorOtp(true);
        if (
          axios.isAxiosError(error) &&
          error?.response?.data?.code === "SMS_00004"
        ) {
          setError("phoneCode", {
            type: "manual",
            message: error?.response?.data?.message,
          });
        } else if (
          axios.isAxiosError(error) &&
          error?.response?.data?.code === "SMS_00006"
        ) {
          setError("phoneCode", {
            type: "manual",
            message: error?.response?.data?.message,
          });
        } else {
          console.error("Error verifying OTP:", error);
        }
      } finally {
        setLoading(false);
      }
    },
    [navigate, setError, setLoading, updateProgress]
  );

  return (
    <>
      {isSentSMS ? (
        <Box
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
              maxWidth: "460px",
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
                color: "#fff",
                marginTop: "24px",
              }}
            >
              Mobile Verification
            </Typography>
            <TextDetail
              level="body1"
              sx={{
                marginTop: "4px",
              }}
            >
              We sent a verification code to your mobile.
            </TextDetail>

            <TextDetail level="body1">
              {convertNumberHidden(phoneNumber)} {cutNumber(phoneNumber)}
            </TextDetail>
            <TextDetail level="body1">
              Please enter the code in the field below.
            </TextDetail>

            <Box
              sx={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "100%",
              }}
            >
              <OtpInput
                length={6}
                onOtpChange={handleOtpChange}
                onComplete={handleOnComplete}
              />
            </Box>

            {errors.phoneCode && (
              <Box
                sx={{
                  border: `1px solid #F72585`,
                  borderRadius: "6px",
                  display: "flex",
                  gap: "12px",
                  alignItems: "center",
                  padding: "11px 15px",
                  marginTop: "40px",
                }}
              >
                <Box>
                  <CloseError />
                </Box>
                <Typography level="body1" sx={{ color: "#F72585" }}>
                  {errors.phoneCode.message}
                </Typography>
              </Box>
            )}

            <Box
              sx={{
                display: "flex",
                marginTop: showErrorOtp ? "20px" : "40px",
                alignItems: "center",
                gap: "4px",
              }}
            >
              <Typography
                level="body1"
                sx={{
                  color: colors["text-primary"],
                }}
              >
                Didn’t get the code?{" "}
              </Typography>
              <Typography
                sx={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <Typography
                  onClick={isDisabled ? undefined : handleResend}
                  sx={{
                    color: isDisabled
                      ? colors["text-primary"]
                      : colors["primary-main"],
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    opacity: isDisabled ? 0.5 : 1,
                  }}
                >
                  Resend{" "}
                </Typography>
                {isDisabled && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      color: colors["primary-main"],
                    }}
                  >
                    {" "}
                    <Box
                      component={"img"}
                      src={"/icon/kyc-in-progress.svg"}
                      width={16}
                      height={16}
                    />
                    {isDisabled && countdown !== null ? `${countdown}` : ""}
                  </Box>
                )}
              </Typography>
            </Box>
          </Box>
        </Box>
      ) : (
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
                color: colors["text-primary"],
                marginTop: "24px",
                textAlign: "center",
              }}
            >
              Enter Your Phone Number
            </Typography>
            <Typography
              level="body1"
              sx={{
                color: colors["text-secondary"],
                marginTop: "4px",
                textAlign: "center",
              }}
            >
              We need to verify your mobile. Please enter your number below and
              we will send you a verification code by SMS.
            </Typography>

            {/* Input Fields */}
            <Box
              sx={{
                margin: "20px 0",
                width: "100%",
              }}
            >
              {/* Phone number code Input */}

              <Controller
                control={control}
                name="phoneNumber"
                rules={{
                  required: "This field is required",
                }}
                render={({ field: { ref, ...field } }) => (
                  <>
                    <ReactPhoneInput
                      {...field}
                      inputProps={{
                        ref,
                      }}
                      country={"hk"}
                      inputClass={`customPhoneInput ${
                        errors.phoneNumber && "error"
                      }`}
                      dropdownClass="customDropdown"
                      buttonClass={`customButton ${
                        errors.phoneNumber && "error"
                      }`}
                      placeholder="Phone Number"
                      onChange={(value, country: any) => {
                        field.onChange(value);
                        setPhoneCode(`+${country.dialCode}`);
                      }}
                    />
                    {errors.phoneNumber && (
                      <MessageError>{errors.phoneNumber.message}</MessageError>
                    )}
                  </>
                )}
              />
            </Box>

            {/* Login Button */}
            <Button
              key={""}
              type="submit"
              variant={"solid"}
              disabled={isSentSMS}
              sx={{
                width: "100%",
                height: "42px",
              }}
            >
              Send SMS
            </Button>
          </Box>
        </form>
      )}
    </>
  );
}
