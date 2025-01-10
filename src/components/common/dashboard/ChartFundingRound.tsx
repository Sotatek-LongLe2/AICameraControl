import { Box, Typography } from "@mui/joy";
import { ChartData } from "chart.js";
import { useCallback, useEffect, useState } from "react";
import { colors } from "src/styles/colors";
import DoughnutChart from "src/components/common/chart/DoughnutChart";
import { ChartService } from "src/services/DashboardService";
import { toast } from "react-toastify";

const ChartFundingRound = () => {
  const [loading, setLoading] = useState(false);
  const [fundingChartData, setFundingChartData] = useState<number[]>([]);

  const dataFunding: ChartData<"doughnut"> = {
    labels: ["Seed/Pre A", "A", "B", "C", "D+"],
    datasets: [
      {
        data: fundingChartData,
        backgroundColor: [
          colors["astra-pink"], // Seed/Pre A
          colors["astra-light-blue"], // A
          colors["astra-main"], // B
          colors["astra-dark-blue"], // C
          colors["astra-dark-purple"], // D+
        ],
      },
    ],
  };

  const fetchDataFundingRoundChart = useCallback(async () => {
    try {
      setLoading(true);
      const res = await ChartService.getLastFundingRound();
      if (res.data.statusCode === 200) {
        setFundingChartData([
          res.data.data.seedPreA || 0,
          res.data.data.seriesA || 0,
          res.data.data.seriesB || 0,
          res.data.data.seriesC || 0,
          res.data.data.seriesDPlus || 0,
        ]);
      }
    } catch (error) {
      toast.error(String(error));
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  useEffect(() => {
    fetchDataFundingRoundChart();
  }, [fetchDataFundingRoundChart]);

  return loading ? (
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
    <>
      {fundingChartData.every((value) => value === 0) ? (
        <Typography
          level="h5"
          color="text-primary"
          sx={{ textAlign: "center" }}
        >
          No data
        </Typography>
      ) : (
        <DoughnutChart data={dataFunding} />
      )}
    </>
  );
};

export default ChartFundingRound;
