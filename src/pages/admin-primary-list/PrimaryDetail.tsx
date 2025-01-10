import {
  Box,
  BoxProps,
  Button,
  Modal,
  ModalDialog,
  Stack,
  Typography,
} from "@mui/joy";
import {
  RiArrowLeftLine,
  RiCheckLine,
  RiDeleteBinLine,
  RiEditLine,
} from "@remixicon/react";
import axios from "axios";
import _ from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { generatePath, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AppTable from "src/components/base/AppTable";
import CardPrimaryAdmin from "src/components/common/card/CardPrimaryAdmin";
import { StageAdmin } from "src/constants/enumBE";
import { PAGES_ADMIN } from "src/constants/router";
import {
  formatNumber,
  number2Demand,
  number2USD,
} from "src/helpers/formatNumber";
import { AdminPrimaryService } from "src/services/AdminPrimaryService";
import {
  IAdminPrimaryDetail,
  IAdminPrimaryOrderItem,
} from "src/services/AdminPrimaryService.types";
import { useAppStore } from "src/store/appStore";
import { colors } from "src/styles/colors";
import { getPrimaryOrderColumns } from "./PrimaryDetail.const";

interface StatProps extends BoxProps {
  label: string;
}

const Stat = ({ label, children, ...props }: StatProps) => {
  return (
    <Box
      width="100%"
      minHeight="120px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      <Typography level="subtitle2">{label}</Typography>
      <Typography level="h1">{children}</Typography>
    </Box>
  );
};

export const PrimaryDetail = () => {
  const params = useParams();
  const id = Number(params.id);
  const setLoading = useAppStore((state) => state.setLoading);

  const [data, setData] = useState<IAdminPrimaryDetail>();
  const [currentStage, setCurrentStage] = useState<StageAdmin>();
  const [primaryOrders, setPrimaryOrders] = useState<IAdminPrimaryOrderItem[]>(
    []
  );
  const [editableOrders, setEditableOrders] = useState<
    IAdminPrimaryOrderItem[] | null
  >([]);
  const [isEditAllocation, setEditAllocation] = useState<boolean>(false);
  const [allocationAvailable, setAllocationAvailable] = useState<number>(0);
  const [openRemove, setOpenRemove] = useState<boolean>(false);

  const onReloadOrdersTable = useCallback(async () => {
    const resPrimaryOrders = await AdminPrimaryService.getPrimaryOrder({
      limit: 1000,
      page: 1,
      primaryId: id,
    });

    const primaryOrders = resPrimaryOrders.data.data;
    setPrimaryOrders(primaryOrders);
    setEditableOrders(_.cloneDeep(primaryOrders));
  }, [id]);

  const handleUpdateAllocation = useCallback(async () => {
    try {
      setLoading(true);
      const data = (editableOrders ?? []).map((order) => ({
        primaryOrderId: order.id,
        allocation: String(order.allocation || 0),
      }));

      const resUpdate = await AdminPrimaryService.editPrimaryOrder({
        data,
        primaryId: id,
      });

      if (resUpdate.data.data) {
        await onReloadOrdersTable();
        setEditAllocation(false);
        return;
      }
    } catch (e) {
      toast.error(String(e));
    } finally {
      setLoading(false);
    }
  }, [editableOrders, id, onReloadOrdersTable, setLoading]);

  const isValidAllocation = useCallback(
    (id: number, value: string | number) => {
      if (!data?.dealSize) return false;

      const sumAllocation = (editableOrders ?? []).reduce(
        (result, current) =>
          (result +=
            current.id === id ? Number(value) : Number(current.allocation)),
        0
      );

      return data?.dealSize >= sumAllocation;
    },
    [data?.dealSize, editableOrders]
  );

  const handleChangeAllocation = useCallback(
    (id?: number, value?: string) => {
      const sumAllocation = (editableOrders ?? []).reduce(
        (result, current) =>
          (result +=
            current.id === id ? Number(value) : Number(current.allocation)),
        0
      );

      setAllocationAvailable((data?.dealSize ?? 0) - sumAllocation);
    },
    [data?.dealSize, editableOrders]
  );

  const afterCloseStage = useMemo(
    () =>
      [
        StageAdmin.BOOKS_CLOSED,
        StageAdmin.CLOSED,
        StageAdmin.ALLOCATION_SIGNING,
      ].some((s) => s === currentStage),
    [currentStage]
  );

  const columns = useMemo(
    () =>
      getPrimaryOrderColumns({
        isEditable: isEditAllocation,
        afterCloseStage,
        isValidAllocation,
        handleChangeAllocation,
      }),
    [
      afterCloseStage,
      handleChangeAllocation,
      isEditAllocation,
      isValidAllocation,
    ]
  );

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [resPrimaryDetail] = await Promise.all([
          AdminPrimaryService.getPrimaryDetail({
            primaryId: id,
          }),
          onReloadOrdersTable(),
        ]);
        const detail = resPrimaryDetail.data.data;

        setData(detail);
        setCurrentStage(detail.stage);
      } catch (e) {
        if (
          axios.isAxiosError(e) &&
          e.response?.data?.code === "PRIMARY_00000"
        ) {
          window.navigate(PAGES_ADMIN.PRIMARY.INDEX);
        }
        toast.error(String(e));
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id, onReloadOrdersTable, setLoading]);

  const onRemovePrimary = useCallback(async () => {
    if (!data?.id) return;

    try {
      setLoading(true);
      const res = await AdminPrimaryService.deletePrimary({
        primaryId: data.id,
      });

      if (res.data.statusCode === 200) {
        window.navigate(PAGES_ADMIN.PRIMARY.INDEX);
      }
    } catch (e) {
      toast.error(String(e));
    } finally {
      setLoading(false);
    }
  }, [data, setLoading]);

  if (!id) {
    window.navigate(PAGES_ADMIN.PRIMARY.INDEX);
    return;
  }

  return (
    <>
      <Stack gap="24px" height="100%">
        <Box display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            sx={{ border: "none" }}
            startDecorator={<RiArrowLeftLine />}
            onClick={() => window.navigate(PAGES_ADMIN.PRIMARY.INDEX)}
          >
            Back To List
          </Button>

          <Box display="flex" gap="16px">
            <Button
              variant="outlined"
              startDecorator={<RiEditLine />}
              onClick={() => {
                window.navigate(
                  generatePath(PAGES_ADMIN.PRIMARY.EDIT, {
                    id: id.toString(),
                  })
                );
              }}
            >
              Edit Details
            </Button>
            <Button
              variant="outlined"
              color="error-main"
              startDecorator={<RiDeleteBinLine />}
              onClick={() => setOpenRemove(true)}
            >
              Remove
            </Button>
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              ...(data?.logoUrl && {
                backgroundImage: `url('${data.bannerUrl}')`,
              }),

              border: `1px solid ${colors.divider}`,
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxShadow: "0px 2px 4px 0px #2E263D29",
            }}
          >
            <CardPrimaryAdmin
              data={data}
              // onChangeStage={setCurrentStage}
              sx={{
                margin: "30px 32.5px 33px 0",
              }}
            />
          </Box>
          <Box display="flex">
            <Stat label="NUMBER OF ORDERS" bgcolor={colors["astra-main"]}>
              {data?.numberOfOrders}
            </Stat>
            <Stat label="USD" bgcolor={colors["astra-dark-pink"]}>
              ${number2USD(data?.USD)}
            </Stat>
            <Stat label="DEMAND" bgcolor={colors["astra-dark-blue"]}>
              {number2Demand(data?.demand)}
            </Stat>
          </Box>
        </Box>
        {!isEditAllocation && afterCloseStage && (
          <Box display="flex" justifyContent="flex-end">
            <Button
              startDecorator={<RiEditLine />}
              variant="outlined"
              onClick={() => {
                setEditAllocation(true);

                handleChangeAllocation();
              }}
            >
              Edit Allocation
            </Button>
          </Box>
        )}
        <Stack flex={1}>
          <AppTable
            columns={columns}
            data={editableOrders}
            stickyHeader
            style={{
              tableLayout: "fixed",
            }}
            containerProps={{
              height: "auto",
            }}
            rowEndDecorator={[
              null,
              null,
              null,
              isEditAllocation
                ? () => (
                    <>
                      {isEditAllocation && (
                        <Typography
                          color="success"
                          whiteSpace="nowrap"
                          display="flex"
                          justifyContent="flex-end"
                        >
                          + ${formatNumber(allocationAvailable)}
                        </Typography>
                      )}
                    </>
                  )
                : null,
              null,
            ]}
          />
        </Stack>

        {isEditAllocation && (
          <Box display="flex" gap="16px" pt="20px">
            <Button
              color="astra-pink"
              variant="outlined"
              fullWidth
              onClick={() => {
                setEditAllocation(false);
                setEditableOrders(_.cloneDeep(primaryOrders));
              }}
            >
              Discard
            </Button>
            <Button
              endDecorator={<RiCheckLine />}
              fullWidth
              onClick={handleUpdateAllocation}
            >
              Allocate
            </Button>
          </Box>
        )}
      </Stack>
      <Modal open={openRemove} onClose={() => setOpenRemove(false)}>
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
          <Typography level="body1" color="text-primary">
            You are about to remove Primary “{data?.name}”. All demands placed
            by Customers will also be removed.
          </Typography>

          <Box
            gap="16px"
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            <Button variant="outlined" onClick={() => setOpenRemove(false)}>
              Cancel
            </Button>
            <Button onClick={onRemovePrimary} color="astra-pink">
              Delete Primary
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  );
};
