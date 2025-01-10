import { Box, Card } from "@mui/joy";
import { useCallback, useEffect, useState } from "react";
import { CardAnnouncements } from "src/components/common/dashboard/CardAnnouncements";
import { CardIOIInteraction } from "src/components/common/dashboard/CardIOIInteraction";
import {
  CardPrimaryDemand,
  PrimaryDemand,
} from "src/components/common/dashboard/CardPrimaryDemand";
import ChartTrending from "src/components/common/dashboard/ChartTrending";
import SecondarySnapshot from "src/components/common/dashboard/SecondarySnapshot";
import { ChartService } from "src/services/DashboardService";
import { InteractionItem } from "src/services/DashboardService.types";
import { useAppStore } from "src/store/appStore";

const DashboardAdmin = () => {
  const setLoading = useAppStore((state) => state.setLoading);
  const [dataPrimaryDemand, setDataPrimaryDemand] = useState<PrimaryDemand[]>(
    []
  );
  const [dataInteraction, setDataInteraction] = useState<InteractionItem[]>([]);

  const fetchPrimaryDemand = useCallback(async () => {
    try {
      setLoading(true);
      const res = await ChartService.getPrimaryDemand({
        page: 1,
        limit: 4,
      });
      if (res.data.statusCode === 200) {
        setDataPrimaryDemand(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  const fetchInteraction = useCallback(async () => {
    try {
      setLoading(true);
      const res = await ChartService.getInteraction();
      if (res.data.statusCode === 200) {
        setDataInteraction(res.data.data.slice(0, 4));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  useEffect(() => {
    fetchPrimaryDemand();
  }, [fetchPrimaryDemand]);

  useEffect(() => {
    fetchInteraction();
  }, [fetchInteraction]);

  return (
    <>
      <Box
        sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}
      >
        <Card>
          <CardPrimaryDemand data={dataPrimaryDemand} />
        </Card>
        <Card>
          <CardIOIInteraction data={dataInteraction} />
        </Card>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 24,
          mt: 24,
        }}
      >
        <Card>
          <CardAnnouncements />
        </Card>
        <Card>
          <ChartTrending />
        </Card>
      </Box>
      <Box
        sx={{
          mt: 24,
        }}
      >
        <SecondarySnapshot />
      </Box>
    </>
  );
};

export default DashboardAdmin;
