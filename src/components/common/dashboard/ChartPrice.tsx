import { Box, Typography } from "@mui/joy";
import { ChartData } from "chart.js";
import { useCallback, useEffect, useState } from "react";
import { colors } from "src/styles/colors";
import DoughnutChart from "src/components/common/chart/DoughnutChart";
import { ChartService } from "src/services/DashboardService";

const ChartPrice = () => {
  const [loading, setLoading] = useState(false);
  const [priceChartData, setPriceChartData] = useState<number[]>([]);

  const dataPrice: ChartData<"doughnut"> = {
    labels: ["Premium", "Discount", "Flat"],
    datasets: [
      {
        data: priceChartData,
        backgroundColor: [
          colors["astra-main"], // premium
          colors["astra-dark-purple"], // discount
          colors["astra-pink"], // flat
        ],
      },
    ],
  };

  const fetchDataPriceChart = useCallback(async () => {
    try {
      setLoading(true);
      const res = await ChartService.getPrice();
      if (res.data.statusCode === 200) {
        setPriceChartData([
          res.data.data.premium || 0,
          res.data.data.discount || 0,
          res.data.data.flat || 0,
        ]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  useEffect(() => {
    fetchDataPriceChart();
  }, [fetchDataPriceChart]);

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
  ) : priceChartData.every((value) => value === 0) ? (
    <Typography level="h5" color="text-primary" sx={{ textAlign: "center" }}>
      No data
    </Typography>
  ) : (
    <DoughnutChart data={dataPrice} />
  );
};

export default ChartPrice;
