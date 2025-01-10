import {
  Box,
  BoxProps,
  Button,
  Grid,
  Input,
  Link,
  Stack,
  Typography,
} from "@mui/joy";
import axios from "axios";
import dayjs from "dayjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { VITE_SITE_USER } from "src/constants/env";
import { Message } from "src/constants/message.ts";
import { Regex } from "src/constants/regex.ts";
import { emailSupport } from "src/shared/helpers/misc.ts";
import { colors } from "src/styles/colors";
import { AppDatePicker } from "../../components/base/AppDatePicker.tsx";
import FormItem from "../../components/common/form/FormItem.tsx";
import Form from "../../components/common/form/FormWrapper.tsx";
import { PAGES_ADMIN } from "../../constants/router.ts";
import { AdminService } from "../../services/AdminService.ts";
import {
  IReqSaveInviteCode,
  IResInvited,
} from "../../services/AdminService.types.ts";
import { IField } from "../../shared/types.ts";
import { useAppStore } from "../../store/appStore.ts";
import { InvitedTab } from "../admin-customer-list/AdminCustomerList.const.ts";

const inviteLink = `${VITE_SITE_USER}/register`;

const INVITE_CUSTOMER_FIELDS: Array<IField<IReqSaveInviteCode>> = [
  {
    name: "firstName",
    label: "First Name",
    rules: {
      required: Message.REQUIRED,
      maxLength: {
        value: 100,
        message: "This field cannot exceed 100 characters",
      },
    },
    size: {
      mobile: 12,
      laptop: 4,
    },
    renderItem: (field) => (
      <Input
        {...field}
        fullWidth
        sx={{ background: "transparent" }}
        slotProps={{
          input: {
            maxLength: 100,
          },
        }}
      />
    ),
  },
  {
    name: "lastName",
    label: "Last Name",
    rules: {
      required: Message.REQUIRED,
      maxLength: {
        value: 100,
        message: "This field cannot exceed 100 characters",
      },
    },
    size: {
      mobile: 12,
      laptop: 4,
    },
    renderItem: (field) => (
      <Input
        {...field}
        fullWidth
        sx={{ background: "transparent" }}
        slotProps={{
          input: {
            maxLength: 100,
          },
        }}
      />
    ),
  },
  {
    name: "email",
    label: "Email",
    rules: {
      required: Message.REQUIRED,
      maxLength: {
        value: 100,
        message: "This field cannot exceed 100 characters",
      },
      pattern: {
        value: Regex.EMAIL,
        message: Message.VALID_EMAIL,
      },
    },
    size: {
      mobile: 12,
      laptop: 4,
    },
    renderItem: (field) => (
      <Input
        {...field}
        fullWidth
        sx={{ background: "transparent" }}
        slotProps={{
          input: {
            maxLength: 100,
          },
        }}
      />
    ),
  },
  {
    name: "registerBy",
    label: "Register By",
    rules: {
      required: Message.REQUIRED,
    },
    size: {
      mobile: 12,
      laptop: 4,
    },
    renderItem: (field) => (
      <AppDatePicker
        {...field}
        selected={field.value}
        dateFormat="dd/MM/YYYY"
      />
    ),
  },
];

const defaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  registerBy: "",
};

interface EmailTopLineProps extends BoxProps {
  label: string;
}

const EmailTopLine = ({ label, children, ...props }: EmailTopLineProps) => {
  return (
    <Box display="flex" gap="16px" {...props}>
      <Typography level="body1" minWidth="54px" textAlign="right">
        {label}
      </Typography>
      <Typography level="body1" fontWeight="500">
        {children}
      </Typography>
    </Box>
  );
};

export default function AdminInviteCustomerForm() {
  const [isPreview, setIsPreview] = useState(false);
  const [dataInvited, setDataInvited] = useState<IResInvited>();
  const navigate = useNavigate();
  const {
    setError,
    formState: { errors },
  } = useForm<{
    email: string;
    lastName: string;
    firstName: string;
    registerBy: Date;
  }>();
  const setLoading = useAppStore((state) => state.setLoading);

  const Top = () => (
    <Typography level="h4" sx={{ mb: 28 }}>
      {isPreview ? "Email preview" : "Invite New Customer"}
    </Typography>
  );

  const Footer = () => (
    <Grid
      spacing={16}
      container
      sx={{
        width: "100%",
        mt: 48,
      }}
    >
      <Grid mobile={6} laptop={6}>
        <Button
          variant="outlined"
          color="astra-pink"
          sx={{
            width: "100%",
          }}
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Grid>
      <Grid mobile={6} laptop={6}>
        <Button type="submit" variant="solid" sx={{ width: "100%" }}>
          {isPreview ? "Send Invitation" : " Preview Invitation Email"}
        </Button>
      </Grid>
    </Grid>
  );

  const onCancel = () => {
    if (isPreview) {
      setIsPreview(false);
    } else {
      navigate(PAGES_ADMIN.CUSTOMERS.INDEX);
    }
  };

  const sendInvitationCode = async (email: string) => {
    try {
      setLoading(true);
      const res = await AdminService.sendInvitationCode({ to: email });
      if (res?.status === 200 || res?.status === 201) {
        toast.success("Email sent");
        navigate(PAGES_ADMIN.CUSTOMERS.INDEX + `?tab=${InvitedTab.INVITED}`);
      }
    } catch (error) {
      console.error("Send invitation email failed:", error);
      toast.error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  const saveInviteCode = async (dataInvite: IReqSaveInviteCode) => {
    try {
      setLoading(true);
      const { data, status } = await AdminService.saveInviteCode({
        ...dataInvite,
        registerBy: dayjs(dataInvite.registerBy).format("YYYY-MM-DD"),
      });
      if (status === 200 || status === 201) {
        setDataInvited(data);
        setIsPreview(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const code = String(error.response?.data.code) as keyof typeof Message;
        switch (code) {
          case "INVITATION_00006":
            setError(
              "email",
              { message: Message.INVITATION_00006 },
              { shouldFocus: true }
            );
            break;

          case "INVITATION_00003":
            setError(
              "email",
              { message: Message.INVITATION_00003 },
              { shouldFocus: true }
            );
            break;

          default:
            console.error("Save invite code failed:", error);
            toast.error(`${error}`);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data: IReqSaveInviteCode) => {
    if (isPreview && dataInvited?.data?.email) {
      await sendInvitationCode(dataInvited.data.email);
    } else {
      await saveInviteCode(data);
    }
  };

  return (
    <Grid
      sx={{
        padding: "28px",
        backgroundColor: colors.paper,
      }}
    >
      <Form
        header={Top}
        bottom={Footer}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
      >
        {isPreview ? (
          <Box>
            <Grid
              container
              mobile={12}
              sx={{
                paddingBottom: "16px",
                borderBottom: "1px solid #E3F1FC1F",
              }}
            >
              <Stack gap="12px">
                <EmailTopLine label="From">
                  {dataInvited?.data?.adminName}
                  <Typography fontWeight={400} color="text-secondary">
                    {` <${dataInvited?.data?.emailAdmin}>`}
                  </Typography>
                </EmailTopLine>

                <EmailTopLine label="To">
                  {dataInvited?.data?.firstName} {dataInvited?.data?.lastName}
                  <Typography fontWeight={400} color="text-secondary">
                    {` <${dataInvited?.data?.email}>`}
                  </Typography>
                </EmailTopLine>

                <EmailTopLine label="CC">
                  {dataInvited?.data?.supportName}
                  <Typography fontWeight={400} color="text-secondary">
                    {` <${dataInvited?.data?.emailSupport}>`}
                  </Typography>
                </EmailTopLine>

                <EmailTopLine label="Subject">
                  Your Invitation to Astra – Startup Investment Opportunities
                  Await
                </EmailTopLine>
              </Stack>
            </Grid>
            <Box mt={16}>
              {[
                `Dear ${dataInvited?.data.firstName},`,
                <>
                  We are excited to invite you to Astra, a platform by Launch
                  Point that provides access to carefully selected,
                  high-potential startup investment opportunities. As part of a
                  limited group of investors, you’ll enjoy priority access and
                  allocations that fit your investment goals.
                </>,
                `To get started, please use your unique invitation code when creating your account:`,
                ``,
                <span style={{ fontWeight: 700 }}>
                  Your Invitation Code: {dataInvited?.data.code}
                </span>,
                ``,
                "Click the link below to create your account and explore the opportunities on Astra:",
                <Link href={inviteLink}>{inviteLink}</Link>,
                `If you have any questions, feel free to contact us at ${emailSupport}. We look forward to welcoming you to Astra and helping you discover the exciting opportunities ahead.`,
                "Best Regards.",
              ].map((text, index) => (
                <Typography
                  key={index}
                  sx={{
                    mb: index === 2 || index === 4 || index === 6 ? 0 : 20,
                    color: "#FFFFFF",
                  }}
                  level="body1"
                >
                  {text}
                </Typography>
              ))}
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 15 }}>
              <svg
                width="61"
                height="71"
                viewBox="0 0 61 71"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M30.5014 5H39.1529C30.4286 19.8711 21.7043 34.745 12.98 49.6161H21.6315L39.1529 19.7499C46.4353 32.1632 53.7176 44.5764 61 56.9925H34.6116L30.2858 49.6189L20.6768 66H12.0253L17.3086 56.9952H0L30.5014 5ZM39.1529 34.497L30.283 49.6134H48.02L39.1501 34.497H39.1529Z"
                  fill="#0089DE"
                />
              </svg>
              <Box
                sx={{
                  m: 0,
                  lineHeight: "20px",
                  fontSize: "14px",
                  fontFamily: "'Roboto', sans-serif",
                }}
              >
                <span style={{ fontWeight: 600 }}>
                  {dataInvited?.data.adminName}
                </span>
                <br />
                <span>CEO/Founder, Launch Point Limited</span>
                <br />
                <span>10F, YF Life Tower, 33 Lockhart Road</span>
                <br />
                <span>Wan Chai, Hong Kong</span>
              </Box>
            </Box>
          </Box>
        ) : (
          <Grid container rowSpacing={20} columnSpacing={16}>
            {INVITE_CUSTOMER_FIELDS.map((field, index) => (
              <Grid
                key={index}
                mobile={field.size?.mobile}
                laptop={field.size?.laptop}
              >
                <FormItem
                  name={field.name}
                  label={field.label}
                  rules={field.rules}
                  error={errors[field.name]?.message}
                >
                  {(fieldProps) => field.renderItem(fieldProps)}
                </FormItem>
              </Grid>
            ))}
          </Grid>
        )}
      </Form>
    </Grid>
  );
}
