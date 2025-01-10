import { Box, Link, Typography } from "@mui/joy";
import React from "react";
import { useLocation } from "react-router-dom";
import { LogoAstra } from "src/assets/icon";
import PAGES from "src/constants/router";
import { colors } from "src/styles/colors";

const TopDisplay: React.FC = () => {
  const location = useLocation();

  const isCurrentStep6 = location.pathname === PAGES.REGISTRATION.STEP_6;
  const isCurrentStep7 = location.pathname === PAGES.REGISTRATION.STEP_7;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: { mobile: 24, laptop: 48 },
      }}
    >
      <LogoAstra width={60} height={53} />
      <Typography
        level="h3"
        sx={{
          fontWeight: 500,
          color: colors["text-primary"],
          mt: 24,
          textAlign: "center",
        }}
      >
        {isCurrentStep6 || isCurrentStep7
          ? "Welcome to Astra"
          : "Register to Astra"}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        {!isCurrentStep6 && !isCurrentStep7 && (
          <Typography
            level="body1"
            sx={{
              color: colors["text-secondary"],
              mt: 8,
              textAlign: "center",
            }}
          >
            Please take a few minutes to fill in your details.
          </Typography>
        )}
        {isCurrentStep6 && (
          <>
            <Typography
              level="body1"
              sx={{
                color: colors["text-secondary"],
                mt: 8,
                textAlign: "center",
              }}
            >
              You are signed in!
            </Typography>
            <Typography
              level="body1"
              sx={{
                color: colors["text-secondary"],
                textAlign: "center",
              }}
            >
              Please upload your financial documents to have full access, or
            </Typography>
            <Typography level="body1">
              <Link href={PAGES.DASHBOARD}>start exploring Astra now</Link>.
            </Typography>
          </>
        )}
        {isCurrentStep7 && (
          <>
            <Typography
              level="body1"
              sx={{
                color: colors["text-secondary"],
                mt: 8,
                textAlign: "center",
              }}
            >
              Congratulations on Registering!
            </Typography>
            <Typography level="body1">
              You can{" "}
              <Link href={PAGES.DASHBOARD}>start exploring Astra now</Link>.
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

export default TopDisplay;
