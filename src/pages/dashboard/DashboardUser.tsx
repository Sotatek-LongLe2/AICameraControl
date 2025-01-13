import { Box, Card, Typography } from "@mui/joy";

import { useMedia } from "src/shared/hooks/useMedia";
import { colors } from "src/styles/colors";

const DashboardUser = () => {
  const { isMobile } = useMedia();

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "repeat(auto-fill, minmax(350px, 1fr))"
            : "1fr 1fr",
          gridTemplateRows: "repeat(auto-fill, minmax(300px, auto))",
          gap: 24,
        }}
      ></Box>
      <Typography level="h4" sx={{ my: 24 }}>
        Secondary Snapshot
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
          gridTemplateRows: "repeat(auto-fill, minmax(300px, auto))",
          gap: 24,
          mt: 24,
        }}
      >
        <Card
          sx={{
            p: "20px",
            width: "100%",
            height: "501px",
          }}
        >
          <Typography level="h5" sx={{ mb: 24 }}>
            LRV
          </Typography>
        </Card>
        <Card sx={{ p: "20px" }}>
          <Box>
            <Typography level="h5">Last Funding Round</Typography>
            <Typography
              level="body1"
              sx={{
                color: colors["text-subtitle"],
                mb: 24,
              }}
            >
              By Series
            </Typography>
          </Box>
        </Card>
        <Card sx={{ p: "20px" }}>
          <Box sx={{ mb: 24 }}>
            <Typography level="h5">Price</Typography>
            <Typography
              level="body1"
              sx={{
                color: colors["text-subtitle"],
              }}
            >
              Premium discount to LFR
            </Typography>
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default DashboardUser;
