import { Box, Button, Card, Modal, ModalDialog, Typography } from "@mui/joy";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import AppTable from "src/components/base/AppTable";
import { ITEM_PER_PAGE } from "src/constants/common";
import { SecondarySideEnum } from "src/constants/enumBE";
import { UserService } from "src/services/UserService";
import {
  IBidsOffersItem,
  IParamsGetBidsOffers,
  TYPE_BIDS_OFFERS,
} from "src/services/UserService.types";
import { useAppStore } from "src/store/appStore";
import { colors } from "src/styles/colors";
import { getBidsOffersColumns } from "./helpers";

export interface TableBidsOffersProps {
  type: TYPE_BIDS_OFFERS;
}

const DEFAULT_PARAMS: IParamsGetBidsOffers = {
  limit: ITEM_PER_PAGE,
  page: 1,
  type: TYPE_BIDS_OFFERS.OPEN,
};

export const TableBidsOffers = ({ type }: TableBidsOffersProps) => {
  const { loading, setLoading } = useAppStore();
  const [data, setData] = useState<IBidsOffersItem[]>([]);
  const [params, setParams] = useState<IParamsGetBidsOffers>({
    ...DEFAULT_PARAMS,
  });
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [deleteOffer, setDeleteOffer] = useState<IBidsOffersItem>();

  const loadMore = useCallback(() => {
    if (!hasMore || loading) return;

    setParams((prev) => ({ ...prev, page: prev.page + 1 }));
  }, [hasMore, loading]);

  const fetchData = useCallback(
    async (params: IParamsGetBidsOffers) => {
      try {
        setLoading(true);
        const res = await UserService.getBidsOffers(params);

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

  const columns = useMemo(
    () => getBidsOffersColumns({ type, onRemoveOffer: setDeleteOffer }),
    [type]
  );

  const handleRemove = useCallback(async () => {
    if (!deleteOffer) return;

    try {
      setLoading(true);
      const res = await UserService.deleteOffers({ id: deleteOffer.id });

      if (!res.data.data) throw new Error(String(res));

      toast.success("Order removed");
      setParams({ ...DEFAULT_PARAMS, type });
    } catch (e) {
      toast.error(String(e));
    } finally {
      setLoading(false);
      setDeleteOffer(undefined);
    }
  }, [deleteOffer, setLoading, type]);

  return (
    <>
      <Card>
        <AppTable
          columns={columns}
          data={data}
          sx={{
            bgcolor: colors.paper,
            minWidth: type === TYPE_BIDS_OFFERS.OPEN ? 825 : 750,
          }}
          loadMore={loadMore}
        />
      </Card>
      <Modal open={!!deleteOffer} onClose={() => setDeleteOffer(undefined)}>
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
            Do you wish to remove "{deleteOffer?.companyName ?? ""}"{" "}
            {deleteOffer?.side === SecondarySideEnum.SELL ? "Bid" : "Offer"}?
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
              onClick={() => setDeleteOffer(undefined)}
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
