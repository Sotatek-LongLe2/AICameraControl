import { Box, Link, Typography } from "@mui/joy";
import PAGES from "src/constants/router";
import { colors } from "src/styles/colors";

const LAUNCH_POINT_URL = "https://www.launchpoint.com.hk/";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={() => ({
        paddingY: "12px",
        px: 16,
        m: "auto",
        width: "100%",
      })}
    >
      <Box
        sx={(theme) => ({
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
          [theme.breakpoints.down("laptop")]: {
            flexDirection: "column",
          },
        })}
      >
        <Typography
          level="body1"
          sx={(theme) => ({
            color: colors["text-secondary-2"],
            [theme.breakpoints.down("laptop")]: {
              textAlign: "center",
            },
          })}
        >
          Astra is a private investment platform powered by{" "}
          <Link
            href={LAUNCH_POINT_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Launch Point
          </Link>
        </Typography>

        <Box
          sx={(theme) => ({
            display: "flex",
            alignItems: "center",
            gap: 4,
            flexWrap: "wrap",
            [theme.breakpoints.down("laptop")]: {
              justifyContent: "center",
            },
          })}
        >
          <Typography level="body1">
            <Link
              href={PAGES.FOOTER.PRIVACY_POLICY}
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </Link>
          </Typography>
          <Typography level="body1" sx={{ color: colors["text-secondary"] }}>
            -
          </Typography>
          <Typography level="body1">
            <Link
              href={PAGES.FOOTER.TERMS_AND_CONDITIONS}
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms and Conditions
            </Link>
          </Typography>
          <Typography level="body1" sx={{ color: colors["text-secondary"] }}>
            -
          </Typography>
          <Typography level="body1">
            <Link
              href={PAGES.FOOTER.RISK_WARNING}
              target="_blank"
              rel="noopener noreferrer"
            >
              Risk Warning
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
