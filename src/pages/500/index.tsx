import { Box, Button, Typography } from "@mui/joy";
import { RiArrowRightLine, RiSendPlaneLine } from "@remixicon/react";
import { useNavigate } from "react-router-dom";
import { LogoAstra } from "src/assets/icon";
import PAGES from "src/constants/router";
import { colors } from "src/styles/colors";

export default function Error500Page() {
  const navigate = useNavigate();

  return (
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
          width: "460px",
          borderRadius: "6px",
          [theme.breakpoints.down("laptop")]: {
            width: "100%",
            padding: "48px 12px 12px 12px",
          },
        })}
      >
        <LogoAstra width={60} height={53} />
        <Box mt={24} sx={{ textAlign: "center" }}>
          <Typography level="h1">500</Typography>
          <Typography
            level="body1"
            color="text-secondary"
            sx={{
              marginTop: "4px",
            }}
          >
            There was an internal server error. We are fixing
            <br /> the issue at the moment. Please come back later.
          </Typography>
        </Box>

        <Box mt={20}>
          <Button
            variant={"solid"}
            endDecorator={<RiSendPlaneLine />}
            onClick={() => {
              window.location.href = "mailto:support@launchpoint.com.hk";
            }}
            sx={{
              width: "100%",
              height: "42px",
            }}
          >
            Send Us The Error Report
          </Button>
          <Button
            variant={"solid"}
            endDecorator={<RiArrowRightLine />}
            onClick={() => navigate(PAGES.DASHBOARD)}
            sx={{
              width: "100%",
              height: "42px",
              marginTop: "24px",
            }}
          >
            Go Back To Your Dashboard
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
