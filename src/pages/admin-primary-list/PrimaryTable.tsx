import {
  Box,
  Button,
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Modal,
  ModalDialog,
  Typography,
} from "@mui/joy";
import { RiDeleteBinLine, RiEditLine, RiMoreLine } from "@remixicon/react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { generatePath } from "react-router-dom";
import { toast } from "react-toastify";
import { AppLogo } from "src/components/base/AppLogo";
import AppTable, { AppTableProps, IColumn } from "src/components/base/AppTable";
import TextWithTooltip from "src/components/common/TextWithTooltip";
import { PrimaryStatus } from "src/constants/enumBE";
import { PAGES_ADMIN } from "src/constants/router";
import { number2Demand, number2USD } from "src/helpers/formatNumber";
import { AdminPrimaryService } from "src/services/AdminPrimaryService";
import {
  IAdminPrimaryItem,
  IResGetAdminPrimaryList,
} from "src/services/AdminPrimaryService.types";
import {
  getInforPrimaryByStatus,
  getStatusFromDate,
} from "src/shared/primaryStatus";
import { useAppStore } from "src/store/appStore";
import { colors } from "src/styles/colors";
import { FUNDING_ROUNDs } from "../../constants/options";
import { PrimaryDrafts } from "./PrimaryDrafts";

const getColumns = (
  onRemovePrimary: (primary: IAdminPrimaryItem) => void
): Array<IColumn<IAdminPrimaryItem>> => [
  {
    title: "COMPANY",
    key: "company",
    render: (_, rowData) => (
      <Box display="flex" alignItems="center" gap="8px">
        <AppLogo src={rowData.logoUrl ?? ""} size={40} />
        <TextWithTooltip
          text={
            <Typography level="h5" color="text-primary" variant="text-ellipsis">
              {rowData.company}
            </Typography>
          }
          tooltip={`${rowData.company}`}
        />
        <Typography
          level="body2"
          fontWeight="400"
          color="text-secondary"
          sx={{
            flexShrink: 0,
            textTransform: "uppercase",
          }}
        >
          {
            FUNDING_ROUNDs.find(({ value }) => value === rowData.fundingRound)
              ?.label
          }
        </Typography>
      </Box>
    ),
  },
  {
    title: "STAGE",
    key: "stage",
    headerProps: {
      style: {
        width: "250px",
      },
    },
    render: (_, rowData) => {
      const { stageDate, stage } = getStatusFromDate(rowData);
      const { Icon, status } = getInforPrimaryByStatus(stage, stageDate);

      return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box
            display="flex"
            alignItems="center"
            gap="3px"
            color={colors["text-primary"]}
          >
            <Icon />
            <Typography level="body1" fontWeight="500">
              {status}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    title: "NUMBER OF ORDERS",
    key: "numberOfOrders",
    headerProps: {
      style: {
        width: "176px",
        textAlign: "right",
      },
    },
    render: (value) => (
      <Typography level="body1" fontWeight="500" color="text-secondary">
        {value?.toString()}
      </Typography>
    ),
    rowProps: {
      style: {
        textAlign: "right",
      },
    },
  },
  {
    title: "USD",
    key: "USD",
    headerProps: {
      style: {
        width: "140px",
        textAlign: "right",
      },
    },
    render: (value) => (
      <Typography level="body1" fontWeight="500" color="text-primary">
        ${number2USD(value?.toString() || 0)}
      </Typography>
    ),
    rowProps: {
      style: {
        textAlign: "right",
      },
    },
  },
  {
    title: "DEMAND",
    key: "demand",
    render: (value) => (
      <Box
        color="danger"
        sx={{ alignItems: "center", display: "flex", justifyContent: "end" }}
      >
        <Typography level="body1" fontWeight="500" color="text-primary">
          {number2Demand(value?.toString())}
        </Typography>
      </Box>
    ),
    headerProps: {
      style: {
        width: "140px",
        textAlign: "right",
      },
    },
    rowProps: {
      style: {
        textAlign: "right",
      },
    },
  },
  {
    title: "",
    key: "dealSize", // random key to display action column
    render: (_, rowData) => (
      <Box
        sx={{ alignItems: "center", display: "flex", justifyContent: "end" }}
      >
        <Dropdown>
          <MenuButton
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: "plain", color: "neutral" } }}
            onClick={(e) => e.stopPropagation()}
          >
            <RiMoreLine />
          </MenuButton>
          <Menu
            sx={{
              minWidth: "160px",
              borderRadius: "6px",
              borderColor: colors.divider,
              bgcolor: colors.paper,
              boxShadow: `0px 6px 16px 0px ${colors["shadow-lg"]}`,
            }}
          >
            <MenuItem
              sx={{
                padding: "8px 20px",
                color: colors["primary-main"],

                "&&:hover": {
                  color: colors["primary-main"],
                  bgcolor: colors["primary-opacity-light"],
                },
              }}
              onClick={(e) => {
                e.stopPropagation();

                window.navigate(
                  generatePath(PAGES_ADMIN.PRIMARY.EDIT, {
                    id: (rowData.id ?? "").toString(),
                  })
                );
              }}
            >
              <Box display="flex" alignItems="center" gap="8px">
                <RiEditLine />
                <Typography level="body1">Edit Details</Typography>
              </Box>
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();

                onRemovePrimary(rowData);
              }}
              sx={{
                padding: "8px 20px",
                color: colors["astra-pink"],
                "&&:hover": {
                  color: colors["astra-pink"],
                  backgroundColor: colors["error-opacity-light"],
                },
              }}
            >
              <Box display="flex" alignItems="center" gap="8px">
                <RiDeleteBinLine />
                <Typography level="body1">Remove</Typography>
              </Box>
            </MenuItem>
          </Menu>
        </Dropdown>
      </Box>
    ),
    headerProps: {
      style: {
        width: "55px",
        textAlign: "center",
      },
    },
    rowProps: {
      style: {
        textAlign: "right",
      },
    },
  },
];

export interface PrimaryTableProps
  extends Omit<AppTableProps<IAdminPrimaryItem>, "columns" | "data"> {
  isActiveTable?: boolean;
}

export const PrimaryTable = memo(
  ({ isActiveTable, ...props }: PrimaryTableProps) => {
    const [dataDrafts, setDataDrafts] = useState<IResGetAdminPrimaryList>();
    const [dataPrimary, setDataPrimary] = useState<IResGetAdminPrimaryList>();
    const setLoading = useAppStore((state) => state.setLoading);
    const [primaryRemove, setPrimaryRemove] = useState<IAdminPrimaryItem>();

    const fetchList = useCallback(
      async (onlyTable?: boolean) => {
        try {
          setLoading(true);

          const [resTable, resDrafts] = await Promise.all([
            AdminPrimaryService.getPrimaryList({
              page: 1,
              limit: 1000,
              search: "",
              status: isActiveTable
                ? PrimaryStatus.ACTIVE
                : PrimaryStatus.EXECUTED,
            }),
            isActiveTable && !onlyTable
              ? AdminPrimaryService.getPrimaryList({
                  page: 1,
                  limit: 1000,
                  search: "",
                  status: PrimaryStatus.DRAFT,
                })
              : undefined,
          ]);

          setDataPrimary(resTable.data);
          if (resDrafts) setDataDrafts(resDrafts.data);
        } catch (e) {
          toast.error(String(e));
        } finally {
          setLoading(false);
        }
      },
      [isActiveTable, setLoading]
    );

    useEffect(() => {
      fetchList();
    }, [fetchList]);

    const primaryColumns = useMemo(() => {
      const columns = getColumns(setPrimaryRemove).filter(
        (column) => isActiveTable || column.key !== "stage"
      );

      return isActiveTable
        ? columns
        : columns.filter((column) => column.key !== "stage");
    }, [isActiveTable]);

    const onRemovePrimary = useCallback(async () => {
      if (!primaryRemove?.id) return;

      try {
        setLoading(true);
        const res = await AdminPrimaryService.deletePrimary({
          primaryId: primaryRemove.id,
        });

        if (res.data.statusCode === 200) {
          await fetchList(true);
          setPrimaryRemove(undefined);
        }
      } catch (e) {
        toast.error(String(e));
      } finally {
        setLoading(false);
      }
    }, [fetchList, primaryRemove, setLoading]);

    return (
      <>
        <Box height="100%" display="flex" flexDirection="column">
          <Box>
            <AppTable
              stickyHeader
              {...props}
              columns={primaryColumns}
              data={dataPrimary?.data ?? null}
              onRowClick={(item, index) => {
                window.navigate(
                  generatePath(PAGES_ADMIN.PRIMARY.DETAIL, {
                    id: item.id.toString(),
                  })
                );

                props.onRowClick?.(item, index);
              }}
            />
          </Box>

          {dataDrafts && dataDrafts.data.length > 0 ? (
            <PrimaryDrafts data={dataDrafts.data} />
          ) : null}
        </Box>
        <Modal
          open={!!primaryRemove}
          onClose={() => setPrimaryRemove(undefined)}
        >
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
              You are about to remove Primary “{primaryRemove?.company}”. All
              demands placed by Customers will also be removed.
            </Typography>

            <Box
              gap="12px"
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
            >
              <Button
                variant="outlined"
                onClick={() => setPrimaryRemove(undefined)}
              >
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
  }
);
