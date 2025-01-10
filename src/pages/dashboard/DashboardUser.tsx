import { Box, Card, CardContent, Typography } from "@mui/joy";
import { CardAnnouncements } from "src/components/common/dashboard/CardAnnouncements";
import ChartFundingRound from "src/components/common/dashboard/ChartFundingRound";
import ChartLRV from "src/components/common/dashboard/ChartLRV";
import ChartPrice from "src/components/common/dashboard/ChartPrice";
import ChartTrending from "src/components/common/dashboard/ChartTrending";
import SecondarySnapshot from "src/components/common/dashboard/SecondarySnapshot";
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
      >
        <Box>
          <CardAnnouncements isShowTime={isMobile ? false : true} />
        </Box>
        <Card>
          <ChartTrending />
        </Card>
      </Box>
      <Typography level="h4" sx={{ my: 24 }}>
        Secondary Snapshot
      </Typography>
      <Box>
        <SecondarySnapshot />
      </Box>
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
          <CardContent sx={{ marginTop: 22, padding: "20px 0 0 0" }}>
            <ChartLRV />
          </CardContent>
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
          <CardContent sx={{ padding: "20px 0 0 0" }}>
            <ChartFundingRound />
          </CardContent>
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
          <CardContent sx={{ padding: "20px 0 0 0" }}>
            <ChartPrice />
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default DashboardUser;
