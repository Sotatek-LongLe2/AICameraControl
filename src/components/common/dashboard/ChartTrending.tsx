import { Box, Typography } from "@mui/joy";
import { useCallback, useEffect, useState } from "react";
import { colors } from "src/styles/colors";
import BarChart, { BarChartProps } from "../chart/BarChart";
import { ChartService } from "src/services/DashboardService";

const ChartTrending = () => {
  const [loading, setLoading] = useState(false);
  const [trendingData, setTrendingData] = useState<BarChartProps["data"]>([]);

  const fetchDataTrendingChart = useCallback(async () => {
    try {
      setLoading(true);
      const res = await ChartService.getTrendingNow();
      if (res.data.statusCode === 200) {
        const transformedData = res.data.data.map((item: any) => ({
          label: item.companyName,
          value: item.count,
        }));

        setTrendingData(transformedData);
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  useEffect(() => {
    fetchDataTrendingChart();
  }, [fetchDataTrendingChart]);

  return (
    <Box
      sx={{
        backgroundColor: colors["paper"],
        padding: "20px 20px 0",
        width: "100%",
        borderRadius: "6px",
      }}
    >
      <Box>
        <Typography level="h5">Trending Now</Typography>
        <Typography level="body2" color="text-secondary">
          What Astra users have been looking at during the last 24 hours.
        </Typography>
      </Box>
      <Box height="240px">
        {loading ? (
          <Box
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Loading...
          </Box>
        ) : (
          <BarChart data={trendingData} />
        )}
      </Box>
    </Box>
  );
};

export default ChartTrending;
