import { Box, Typography } from "@mui/joy";
import { LogoAstra } from "src/assets/icon";
import { colors } from "src/styles/colors";
import RiskAndWarning from "../risk-disclosure/RiskAndWarning";

export default function RiskWarningPage() {
  return (
    <>
      <Box
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          borderRadius: "6px",
          maxWidth: "608px",
          margin: "auto",
          padding: "48px 0",
          [theme.breakpoints.down("laptop")]: {
            backgroundColor: colors.paper,
            padding: "48px 12px 12px 12px",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
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
            Welcome to Astra
          </Typography>
        </Box>

        <RiskAndWarning cardContentProps={{ sx: { maxHeight: "auto" } }} />
      </Box>
    </>
  );
}
