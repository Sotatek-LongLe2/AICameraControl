import { Grid, Stack, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DisplayPhoneNumber } from "src/components/common/DisplayPhoneNumber";
import { UserService } from "src/services/UserService";
import { IPersonalDetail } from "src/services/UserService.types";
import { emailSupport } from "src/shared/helpers/misc";
import { useMedia } from "src/shared/hooks/useMedia";
import { useAppStore } from "src/store/appStore";
import { colors } from "src/styles/colors";

interface IData {
  label: string;
  value:
    | keyof IPersonalDetail
    | ((personalDetail?: IPersonalDetail) => React.ReactNode);
}
const identities: IData[] = [
  { label: "First Name", value: "firstName" },
  { label: "Last Name", value: "lastName" },
  { label: "Passport", value: (info) => info?.userInfo.passport },
  { label: "Nationality", value: (info) => info?.userInfo.national },
  { label: "Date of Birth", value: (info) => info?.userInfo.dateOfBirth },
  { label: "Place of Birth", value: (info) => info?.userInfo.placeOfBirth },
];

const contacts: IData[] = [
  { label: "Residential Address", value: (info) => info?.userInfo.residential },
  {
    label: "Country of Residence",
    value: (info) => info?.userInfo.countryOfResidence,
  },
  { label: "Tax Residency", value: (info) => info?.userInfo.taxResidence },
  {
    label: "Mobile",
    value: (info) => <DisplayPhoneNumber value={info?.userInfo.phone} />,
  },
];

export const PersonalDetail = () => {
  const { setLoading } = useAppStore();

  const { isDesktop } = useMedia();
  const [personalDetail, setPersonalDetail] = useState<IPersonalDetail>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await UserService.getPersonalDetail();

        setPersonalDetail(res.data.data);
      } catch (e) {
        toast.error(String(e));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setLoading]);

  return (
    <Stack gap="24px">
      <Typography level={isDesktop ? "h4" : "h5"} color="text-primary">
        Personal Details
      </Typography>

      <Typography level="body1" sx={{ color: colors["astra-pink"] }}>
        If there is any change in your personal details, please send us an email
        at{" "}
        <Typography fontWeight="500" sx={{ color: colors["astra-pink"] }}>
          {/*Date: 22-11-2024: Different from the Figma design*/}
          {emailSupport}.
        </Typography>
      </Typography>

      <Typography level="h5" color="text-primary">
        Identity
      </Typography>

      <Grid container spacing="20px">
        {identities.map(({ label, value }, index) => (
          <Grid mobile={12} laptop={6} key={index}>
            <Stack>
              <Typography level="input-text-small" variant="text-ellipsis">
                {label}
              </Typography>
              <Typography
                level="input-text"
                sx={{ wordBreak: "break-word" }}
                color="text-primary"
              >
                {typeof value === "string"
                  ? personalDetail?.[value]?.toString()
                  : value(personalDetail)}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>

      <Typography level="h5" color="text-primary">
        Address / Contact
      </Typography>

      <Grid container spacing="20px">
        {contacts.map(({ label, value }, index) => (
          <Grid mobile={12} laptop={6} key={index}>
            <Stack>
              <Typography level="input-text-small" variant="text-ellipsis">
                {label}
              </Typography>
              <Typography
                level="input-text"
                sx={{ wordBreak: "break-word" }}
                color="text-primary"
              >
                {typeof value === "string"
                  ? personalDetail?.[value]?.toString()
                  : value(personalDetail)}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};
