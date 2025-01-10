import { Box, Typography, CircularProgress } from "@mui/joy";
import hexToRGBA from "src/helpers/hexToRGB";
import { useAppStore } from "src/store/appStore";
import { colors } from "src/styles/colors";
import { zIndex } from "src/styles/zIndex";

export const Loading = () => {
  const loading = useAppStore((s) => s.loading);

  return (
    loading && (
      <Box
        sx={{
          // zIndex: (theme) => theme.zIndex.drawer + 1
          zIndex: zIndex.loading,

          position: "fixed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          inset: "0px",
          backgroundColor: hexToRGBA(colors["body-bg"], 0.9),
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
          }}
        ></Box>
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            minHeight: "100vh",
            flexDirection: "column",
          }}
        >
          <CircularProgress size="md" sx={{ mb: 12 }} />
          <Typography
            sx={{
              color: colors["primary-main"],
              fontSize: "13px",
              fontWeight: "700",
              lineHeight: "18px",
            }}
          >
            Loading...
          </Typography>
        </Box>
      </Box>
    )
  );
};
