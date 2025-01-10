import { Box, Card, CardContent, Typography } from "@mui/joy";
import LineChart from "../chart/LineChart";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SecondaryChartData } from "src/services/DashboardService.types";
import { ChartService } from "src/services/DashboardService";
import dayjs from "dayjs";
import { formatNumberWithComa } from "src/helpers/formatNumber";
import { useMedia } from "src/shared/hooks/useMedia";
import { toast } from "react-toastify";

const SITE_USER = true;

const SecondarySnapshot = () => {
  const { isMobile } = useMedia();

  const [secondaryIoiData, setSecondaryIoiData] = useState<SecondaryChartData>({
    chartBuy: null,
    chartSell: null,
  });

  const chartDataLabel = useMemo(() => {
    if (!secondaryIoiData.chartBuy || secondaryIoiData.chartBuy.length <= 0)
      return [];
    return secondaryIoiData.chartBuy.map((item) =>
      dayjs(item.date_time).format("DD/MM")
    );
  }, [secondaryIoiData]);

  const buyData = useMemo(() => {
    if (!secondaryIoiData.chartBuy || secondaryIoiData.chartBuy.length <= 0)
      return [];
    return secondaryIoiData.chartBuy.map((item) => item.sum_national);
  }, [secondaryIoiData]);

  const sellData = useMemo(() => {
    if (!secondaryIoiData.chartSell || secondaryIoiData.chartSell.length <= 0)
      return [];
    return secondaryIoiData.chartSell.map((item) => item.sum_national);
  }, [secondaryIoiData]);

  const totalBuy = useMemo(() => {
    if (buyData.length <= 0) return 0;
    return buyData.reduce((acc, value) => acc + value, 0);
  }, [buyData]);

  const totalSell = useMemo(() => {
    if (sellData.length <= 0) return 0;
    return sellData.reduce((acc, value) => acc + value, 0);
  }, [sellData]);

  const getSecondaryIois = useCallback(async () => {
    try {
      const res = await ChartService.getSecondaryIois();
      if (res.data.statusCode === 200) {
        setSecondaryIoiData(res.data.data);
      }
    } catch (error) {
      toast.error(String(error));
    }
  }, []);

  useEffect(() => {
    getSecondaryIois();
  }, [getSecondaryIois]);

  return (
    <Card>
      <CardContent sx={{ p: SITE_USER ? 20 : 0 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: SITE_USER ? 0 : 20,
            gap: 48,
            mb: 24,
          }}
        >
          <Box>
            <Typography level="h5">Secondary IOIs</Typography>
            <Typography
              level="body1"
              sx={(theme) => ({ color: theme.color["text-subtitle"] })}
            >
              Notional
            </Typography>
          </Box>
          {!isMobile && (
            <>
              <Box sx={{ ml: "auto" }}>
                <Typography level="body1" sx={{ textAlign: "center" }}>
                  {formatNumberWithComa(totalBuy)}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Box
                    sx={(theme) => ({
                      width: 10,
                      height: 10,
                      borderRadius: 50,
                      background: theme.color["astra-main"],
                    })}
                  />
                  <Typography
                    level="body2"
                    sx={(theme) => ({ color: theme.color["text-secondary"] })}
                  >
                    BUY
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography level="body1" sx={{ textAlign: "center" }}>
                  {formatNumberWithComa(totalSell)}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Box
                    sx={(theme) => ({
                      width: 10,
                      height: 10,
                      borderRadius: 50,
                      background: theme.color["astra-dark-pink"],
                    })}
                  />
                  <Typography
                    level="body2"
                    sx={(theme) => ({ color: theme.color["text-secondary"] })}
                  >
                    SELL
                  </Typography>
                </Box>
              </Box>
            </>
          )}
        </Box>
        <Box sx={{ height: 374 }}>
          <LineChart
            labels={chartDataLabel}
            buyData={buyData}
            sellData={sellData}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SecondarySnapshot;
