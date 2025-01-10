import { useCallback, useEffect, useMemo, useState } from "react";
import AppTable from "src/components/base/AppTable";
import {
  IDemandItem,
  IParamsGetDemands,
  TYPE_DEMAND,
} from "src/services/UserService.types";
import { getIndicationColumns } from "./helpers";
import { colors } from "src/styles/colors";
import { useAppStore } from "src/store/appStore";
import { toast } from "react-toastify";
import { UserService } from "src/services/UserService";
import { ITEM_PER_PAGE } from "src/constants/common";
import { Modal, ModalDialog, Typography, Box, Button, Card } from "@mui/joy";

export interface TableDemandsProps {
  type: TYPE_DEMAND;
}

const DEFAULT_PARAMS: IParamsGetDemands = {
  limit: ITEM_PER_PAGE,
  page: 1,
  type: TYPE_DEMAND.PENDING,
};

export const TableDemands = ({ type }: TableDemandsProps) => {
  const { loading, setLoading } = useAppStore();
  const [data, setData] = useState<IDemandItem[]>([]);
  const [params, setParams] = useState<IParamsGetDemands>({
    ...DEFAULT_PARAMS,
  });
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [deleteDemand, setDeleteDemand] = useState<IDemandItem>();

  const loadMore = useCallback(() => {
    if (!hasMore || loading) return;

    setParams((prev) => ({ ...prev, page: prev.page + 1 }));
  }, [hasMore, loading]);

  const fetchData = useCallback(
    async (params: IParamsGetDemands) => {
      try {
        setLoading(true);
        const res = await UserService.getDemands(params);

        const newData = res.data.data;
        setHasMore(newData.length === params.limit);
        setData((prev) =>
          params.page === 1 ? newData : [...prev, ...newData]
        );
      } catch (e) {
        toast.error(String(e));
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );

  useEffect(() => {
    fetchData({ ...params, type });
  }, [fetchData, params, type]);

  const onRemoveDemand = useCallback(async (rowData?: IDemandItem) => {
    if (!rowData?.id) return;
    setDeleteDemand(rowData);
  }, []);

  const columns = useMemo(
    () => getIndicationColumns({ type, onRemoveDemand }),
    [onRemoveDemand, type]
  );

  const handleRemove = useCallback(async () => {
    if (!deleteDemand) return;

    try {
      setLoading(true);
      const res = await UserService.deleteDemand({
        id: deleteDemand.id,
      });

      if (!res.data.data) throw new Error(String(res));

      // 29/11/2024 10:30 Lack FDD
      toast.success("Demand removed");

      setParams({ ...DEFAULT_PARAMS, type });
    } catch (e) {
      toast.error(String(e));
    } finally {
      setLoading(false);
      setDeleteDemand(undefined);
    }
  }, [deleteDemand, setLoading, type]);

  return (
    <>
      <Card>
        <AppTable
          columns={columns}
          data={data}
          sx={{ minWidth: 700 }}
          loadMore={loadMore}
        />
      </Card>
      <Modal open={!!deleteDemand} onClose={() => setDeleteDemand(undefined)}>
        <ModalDialog
          sx={{
            padding: "24px 32px",
            maxWidth: "575px",
            backgroundColor: colors["paper"],
            border: "none",
            borderRadius: "10px",
            gap: "24px",
          }}
        >
          <Typography level="h4">Please Confirm</Typography>
          <Typography
            level="body1"
            sx={{
              color: colors["text-primary"],
            }}
          >
            Do you wish to remove "{deleteDemand?.name ?? ""}" demand?
          </Typography>

          <Box
            gap="16px"
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setDeleteDemand(undefined)}
            >
              Cancel
            </Button>
            <Button onClick={handleRemove} color="astra-pink">
              Delete
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  );
};
