import {
  Box,
  Button,
  Card,
  Chip,
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
import { useCallback, useEffect, useRef, useState } from "react";
import { generatePath } from "react-router-dom";
import { toast } from "react-toastify";
import { SecondaryScreen } from "src/constants/enumBE.ts";
import { PAGES_ADMIN } from "src/constants/router.ts";
import { formatNumber, number2USD } from "src/helpers/formatNumber.ts";
import { AdminSecondaryService } from "src/services/AdminSecondaryService.ts";
import { IAdminSecondaryItem } from "src/services/AdminSecondaryService.types.ts";
import {} from "src/services/AdminService.types.ts";

import ComponentFilterUserCompany from "src/components/common/ComponentFilterUserCompany.tsx";
import TextWithTooltip from "src/components/common/TextWithTooltip.tsx";
import AppTable, { IColumn } from "../../components/base/AppTable.tsx";
import { useAppStore } from "../../store/appStore.ts";
import { colors } from "../../styles/colors.ts";
import { ITabSecondaryProps } from "./index.tsx";

const getColumns = (
  onRemoveSecondary: (secondary: IAdminSecondaryItem) => void,
  activeTab: number,
  activeSide: number
): Array<IColumn<IAdminSecondaryItem>> => [
  {
    title: "Id",
    key: "id",
    headerProps: {
      style: {
        width: "70px",
      },
    },
    render: (_, rowData) => (
      <Typography
        level="body1-500"
        sx={{
          color: colors["text-primary"],
        }}
      >
        #{rowData.id}
      </Typography>
    ),
  },
  {
    title: "Indication",
    key: "side",
    render: (_, rowData) => (
      <Box display={"flex"} alignItems="center" gap={8}>
        <div>
          <Chip color={rowData.side === 0 ? "primary" : "danger"}>
            {rowData.side === 0 ? "BUY" : "SELL"}
          </Chip>
        </div>
        <TextWithTooltip
          text={
            <Typography level="h5" variant="text-ellipsis">
              {rowData.companyName} - {rowData.firstName} {rowData.lastName}
            </Typography>
          }
          tooltip={`${rowData.companyName} - ${rowData.firstName} ${rowData.lastName}`}
        />
      </Box>
    ),
  },
  {
    title: "Notional",
    key: "notional",
    render: (_, rowData) => (
      <Typography
        level="body1-500"
        sx={{
          color: colors["text-primary"],
        }}
      >
        {rowData.notional ? `$${number2USD(rowData.notional)}` : ""}
      </Typography>
    ),
    headerProps: {
      style: {
        width: "110px",
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
    title: "Share price",
    key: "sharePrice",
    render: (_, rowData) => (
      <Typography
        level="body1-500"
        sx={{
          color: colors["text-primary"],
        }}
      >
        {rowData.sharePrice ? `$${number2USD(rowData.sharePrice)}` : ""}
      </Typography>
    ),
    headerProps: {
      style: {
        width: "130px",
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
    title: "Vs LRV",
    key: "vsLRV",
    render: (_, rowData) => (
      <Typography level="body1-500">
        {rowData.vsLRV !== null
          ? `${formatNumber(Number(rowData.vsLRV), false, 1)}%`
          : "N/A"}
      </Typography>
    ),
    headerProps: {
      style: {
        width: "75px",
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
    title: "Valuation",
    key: "valuation",
    render: (_, rowData) => (
      <Typography level="body1-500">
        {rowData.valuation ? `$${number2USD(rowData.valuation)}` : ""}
      </Typography>
    ),
    headerProps: {
      style: {
        width: "110px",
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
    title: "FEE",
    key: "fee",
    render: (_, rowData) => (
      <Typography level="body1-500">
        {rowData.fee ? `${rowData.fee}%` : ""}
      </Typography>
    ),
    headerProps: {
      style: {
        width: "110px",
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
    title: "Min. size",
    key: "minSize",
    render: (_, rowData) => (
      <Typography level="body1-500" color="text-primary">
        {rowData.minSize ? `$${number2USD(rowData.minSize)}` : ""}
      </Typography>
    ),
    headerProps: {
      style: {
        width: "110px",
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
    key: "id",
    render: (_, rowData) => (
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{ root: { variant: "plain", color: "neutral" } }}
        >
          <RiMoreLine />
        </MenuButton>
        <Menu
          placement="bottom-end"
          sx={{
            width: "160px",
            borderRadius: "6px",
            borderColor: colors.divider,
            bgcolor: colors.paper,
            boxShadow: `0px 6px 16px 0px ${colors["shadow-lg"]}`,
            padding: "7px 0",
          }}
        >
          <MenuItem
            onClick={() =>
              window.navigate(
                `${generatePath(PAGES_ADMIN.SECONDARY.EDIT, {
                  id: rowData.id.toString(),
                })}?tab=${activeTab}&side=${activeSide}`
              )
            }
            sx={{
              padding: "8px 20px",
              "&&:hover": {
                color: colors["primary-main"],
                bgcolor: colors["primary-opacity-light"],
              },
            }}
          >
            <Box display="flex" alignItems="center" gap="8px">
              <RiEditLine />
              <Typography level="body1">Edit</Typography>
            </Box>
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              onRemoveSecondary(rowData);
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
    ),
    headerProps: {
      style: {
        width: "55px",
        textAlign: "center",
      },
    },
  },
];

export default function NewListingsTable({
  listUser,
  listCompany,
  activeSide,
  activeTab,
  handleSideChange,
}: ITabSecondaryProps) {
  const setLoading = useAppStore((state) => state.setLoading);
  const isLoading = useAppStore((state) => state.loading);
  const [newListingArray, setNewListingArray] = useState<
    IAdminSecondaryItem[] | null
  >(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const isDataLoading = useRef(false);
  const [selectedUser, setSelectedUser] = useState<number>();
  const [selectedCompany, setSelectedCompany] = useState<number>();
  const [secondaryRemove, setSecondaryRemove] = useState<IAdminSecondaryItem>();

  const loadInvitedList = useCallback(
    async (currentPage?: number) => {
      if (isDataLoading.current) return;
      try {
        isDataLoading.current = true;
        setLoading(true);
        const { data } = await AdminSecondaryService.getSecondaryList({
          page: currentPage || 1,
          limit: 100,
          side: activeSide,
          screen: SecondaryScreen.NEW_LISTINGS,
          customerFilter: selectedUser,
          companyFilter: selectedCompany,
        });
        setNewListingArray(data.data);
        // setNewListingArray((prevData) => [...prevData, ...data.data]);
        setHasMore(data.data.length >= 100);
      } catch (error) {
        toast.error(String(error));
      } finally {
        setLoading(false);
        isDataLoading.current = false;
      }
    },
    [setLoading, activeSide, selectedUser, selectedCompany]
  );

  useEffect(() => {
    loadInvitedList(page);
  }, [page, loadInvitedList]);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setPage((prevPage) => prevPage + 1);
  }, [hasMore, isLoading]);

  const onRemoveSecondary = useCallback(async () => {
    if (!secondaryRemove?.id) return;

    try {
      setLoading(true);
      const res = await AdminSecondaryService.deleteSecondary({
        secondaryId: secondaryRemove.id,
      });

      if (res.data.statusCode === 200) {
        await loadInvitedList();
        setSecondaryRemove(undefined);
      }
    } catch (e) {
      toast.error(String(e));
    } finally {
      setLoading(false);
    }
  }, [loadInvitedList, secondaryRemove, setLoading]);

  return (
    <>
      <Box display="flex" flexDirection="column" height="100%" gap={24}>
        <ComponentFilterUserCompany
          listUser={listUser}
          listCompany={listCompany}
          activeSide={activeSide}
          handleSideChange={handleSideChange}
          setSelectedUser={setSelectedUser}
          setSelectedCompany={setSelectedCompany}
          showBuySell={true}
        />
        <Card>
          <AppTable
            columns={getColumns(setSecondaryRemove, activeTab, activeSide)}
            data={newListingArray}
            loadMore={loadMore}
            stickyHeader
            containerProps={{
              maxHeight: "calc(100vh - 278px)",
            }}
          />
        </Card>
      </Box>
      <Modal
        open={!!secondaryRemove}
        onClose={() => setSecondaryRemove(undefined)}
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
          <Typography
            level="body1"
            sx={{
              color: colors["text-primary"],
              wordWrap: "break-word",
            }}
          >
            You are about to remove Indication “{secondaryRemove?.companyName} -{" "}
            {secondaryRemove?.firstName} {secondaryRemove?.lastName}”. All
            information related to the Indication will also be removed.
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
              onClick={() => setSecondaryRemove(undefined)}
            >
              Cancel
            </Button>
            <Button onClick={onRemoveSecondary} color="astra-pink">
              Delete
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  );
}
