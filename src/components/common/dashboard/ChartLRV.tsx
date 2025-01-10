import { Box, Typography } from "@mui/joy";
import { ChartData } from "chart.js";
import { useCallback, useEffect, useState } from "react";
import { colors } from "src/styles/colors";
import DoughnutChart from "src/components/common/chart/DoughnutChart";
import { ChartService } from "src/services/DashboardService";
import { toast } from "react-toastify";

const ChartLRV = () => {
  const [loading, setLoading] = useState(false);
  const [pieData, setPieData] = useState<number[]>([]);

  const dataLrv: ChartData<"doughnut"> = {
    labels: ["10bn+", "5-10bn", "2-5bn", "500mn-2bn", "0-500mn"],
    datasets: [
      {
        data: pieData,
        backgroundColor: [
          colors["astra-pink"], // 10bn+
          colors["astra-light-blue"], // 5-10bn
          colors["astra-main"], // 2-5bn
          colors["astra-dark-blue"], // 500mn-2bn
          colors["astra-dark-purple"], // 0-500mn
        ],
      },
    ],
  };

  const fetchDataLrvChart = useCallback(async () => {
    try {
      setLoading(true);
      const res = await ChartService.getLRV();
      if (res.data.statusCode === 200) {
        setPieData([
          res.data.data.resultByType["rank-5"],
          res.data.data.resultByType["rank-4"],
          res.data.data.resultByType["rank-3"],
          res.data.data.resultByType["rank-2"],
          res.data.data.resultByType["rank-1"],
        ]);
      }
    } catch (error) {
      toast.error(String(error));
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  useEffect(() => {
    fetchDataLrvChart();
  }, [fetchDataLrvChart]);

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
      {pieData.every((value) => value === 0) ? (
        <Typography
          level="h5"
          color="text-primary"
          sx={{ textAlign: "center" }}
        >
          No data
        </Typography>
      ) : (
        <DoughnutChart data={dataLrv} />
      )}
    </>
  );
};

export default ChartLRV;
