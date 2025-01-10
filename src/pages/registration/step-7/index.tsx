import { Box, Button, Typography } from "@mui/joy";
import { RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react";
import { useNavigate } from "react-router-dom";
import FormWithStep from "src/components/common/FormWithStep";
import TopDisplay from "src/components/layout/TopDisplay";
import PAGES from "src/constants/router";
import { useAuthStore } from "src/store/authStore";

const Step7 = () => {
  const navigate = useNavigate();
  const setPartialAccess = useAuthStore((s) => s.setPartialAccess);

  const Top = () => (
    <Box sx={{ mb: 24, display: "flex", flexDirection: "column", gap: 24 }}>
      <Typography level="h4">Document Verification is on Going</Typography>
      <Typography level="body1">
        We have received both your{" "}
        <Typography
          level="body1"
          sx={(theme) => ({ color: theme.color["primary-main"] })}
        >
          Client Agreement
        </Typography>{" "}
        and your{" "}
        <Typography
          level="body1"
          sx={(theme) => ({ color: theme.color["primary-main"] })}
        >
          Financial Documents
        </Typography>
        .
      </Typography>
      <Typography level="body1">
        Our staff is reviewing them at the moment and will grant you full access
        to Astra once it is done. We will notify you by email when that happens.
      </Typography>
      <Typography level="body1">
        You can already start exploring Astra with limited access.
      </Typography>
    </Box>
  );

  const Footer = () => (
    <Box
      sx={(theme) => ({
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        mt: 24,

        [theme.breakpoints.down("laptop")]: {
          flexDirection: "column",
          gap: 12,
        },
      })}
    >
      <Button
        variant="outlined"
        onClick={() => navigate(PAGES.REGISTRATION.STEP_6)}
        startDecorator={<RiArrowLeftLine />}
      >
        Go Back
      </Button>
      <Button
        onClick={() => {
          navigate(PAGES.DASHBOARD);
          setPartialAccess("partial");
        }}
        endDecorator={<RiArrowRightLine />}
      >
        Go To your Astra Dashboard
      </Button>
    </Box>
  );

  return (
    <FormWithStep currentStep={7}>
      <Box sx={{ display: { mobile: "block", laptop: "none" } }}>
        <TopDisplay />
      </Box>
      <Top />
      <Footer />
    </FormWithStep>
  );
};

export default Step7;
