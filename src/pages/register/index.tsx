import { Box, Button, Input, Link, Typography } from "@mui/joy";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LogoAstra } from "src/assets/icon";
import { MessageError } from "src/components/common/MessageError";
import { LOCAL_STORAGE_KEY } from "src/constants/localStorage";
import { Message } from "src/constants/message";
import PAGES from "src/constants/router";
import { UserService } from "src/services/UserService";
import { IReqVerifyInvitationCode } from "src/services/UserService.types";
import { colors } from "src/styles/colors";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IReqVerifyInvitationCode>();

  const navigate = useNavigate();

  const onSubmit = async (data: IReqVerifyInvitationCode) => {
    try {
      const res = await UserService.verifyInvitationCode({
        code: data.code,
      });
      if (res.data.statusCode === 201) {
        localStorage.setItem(LOCAL_STORAGE_KEY.INVITATION_CODE, data.code);
        navigate(PAGES.CREATE_PASSWORD);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error?.response?.data?.message) {
        setError("code", {
          type: "manual",
          message: error.response.data.message,
        });
      } else {
        toast.error("Error occurred while verifying invitation code.");
      }
    }
  };

  return (
    <Box
      component={"form"}
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
            color: "#fff",
            marginTop: "24px",
          }}
        >
          Register to Astra
        </Typography>
        <Typography
          level="body1"
          sx={{
            color: "#FFFFFFCC",
            marginTop: "4px",
            textAlign: "center",
          }}
        >
          Astra is a private investment platform.
          <br /> Please type in your invitation code to access.
        </Typography>

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
            placeholder="Invitation code"
            size="lg"
            {...register("code", {
              required: Message.REQUIRED,
            })}
            slotProps={{
              input: {
                maxLength: 8,
              },
            }}
          />
          {errors.code?.message && (
            <MessageError>{String(errors.code.message)}</MessageError>
          )}
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
          Continue
        </Button>

        <Typography level="body1" sx={{ color: "#fff", marginTop: "40px" }}>
          Already have an account? <Link href={"/login"}>Login here.</Link>
        </Typography>
      </Box>
    </Box>
  );
}
