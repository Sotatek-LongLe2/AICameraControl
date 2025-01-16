import { Box, Button, Typography } from "@mui/joy";
import { RiArrowRightLine } from "@remixicon/react";
import { useNavigate } from "react-router-dom";
import { LogoAstra } from "src/assets/icon";
import PAGES from "src/constants/router";
import { colors } from "src/styles/colors";

export default function Error404Page() {
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
          <Typography level="h1">404</Typography>
          <Typography
            level="body1"
            color="text-secondary"
            sx={{
              marginTop: "4px",
            }}
          >
            We could not find the page you are looking for.
            <br /> It might have been removed.
          </Typography>
        </Box>

        <Button
          variant={"solid"}
          endDecorator={<RiArrowRightLine />}
          onClick={() => navigate(PAGES.DASHBOARD)}
          sx={{
            width: "100%",
            height: "42px",
            marginTop: "20px",
          }}
        >
          Access your Dashboard
        </Button>
      </Box>
    </Box>
  );
}
