import {
  Box,
  Card,
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Typography,
} from "@mui/joy";
import { RiArrowGoBackLine, RiEditLine, RiMoreLine } from "@remixicon/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { generatePath } from "react-router-dom";
import { AppButtonStatusBuySell } from "src/components/base/AppButtonStatusBuySell.tsx";
import ComponentFilterUserCompany from "src/components/common/ComponentFilterUserCompany.tsx";
import { SecondaryScreen } from "src/constants/enumBE.ts";
import { PAGES_ADMIN } from "src/constants/router.ts";
import { formatNumber, number2USD } from "src/helpers/formatNumber.ts";
import { AdminSecondaryService } from "src/services/AdminSecondaryService.ts";
import { IAdminSecondaryItem } from "src/services/AdminSecondaryService.types.ts";
import AppTable, { IColumn } from "../../components/base/AppTable.tsx";
import { useAppStore } from "../../store/appStore.ts";
import { colors } from "../../styles/colors.ts";
import { ITabSecondaryProps } from "./index.tsx";
import TextWithTooltip from "src/components/common/TextWithTooltip.tsx";

const getColumns = (
  onRestoreSecondary: (secondary: IAdminSecondaryItem) => void,
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
      <Box display={"flex"} gap={8}>
        <AppButtonStatusBuySell side={rowData.side} />
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
      <Typography
        level="body1-500"
        sx={{
          color: colors["text-secondary"],
        }}
      >
        {rowData.vsLRV !== "0"
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
      <Typography
        level="body1-500"
        sx={{
          color: colors["text-secondary"],
        }}
      >
        {rowData.valuation ? `$${number2USD(rowData.valuation)}` : ""}
      </Typography>
    ),
    headerProps: {
      style: {
        width: "120px",
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
      <Typography
        level="body1-500"
        sx={{
          color: colors["text-secondary"],
        }}
      >
        {rowData.fee ? `${rowData.fee}%` : ""}
      </Typography>
    ),
    headerProps: {
      style: {
        width: "60px",
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
      <Typography
        level="body1-500"
        sx={{
          color: colors["text-primary"],
        }}
      >
        {rowData.minSize ? `$${number2USD(rowData.minSize)}` : ""}
      </Typography>
    ),
    headerProps: {
      style: {
        width: "90px",
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
              color: colors["text-primary"],
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
            onClick={() => onRestoreSecondary(rowData)}
            sx={{
              padding: "8px 20px",
              color: colors["text-primary"],
              "&&:hover": {
                color: colors["primary-main"],
                bgcolor: colors["primary-opacity-light"],
              },
            }}
          >
            <Box display="flex" alignItems="center" gap="8px">
              <RiArrowGoBackLine />
              <Typography level="body1">Restore</Typography>
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

export default function TrashTable({
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

  const loadInvitedList = useCallback(
    async (currentPage?: number) => {
      if (isDataLoading.current) return;
      try {
        isDataLoading.current = true;
        setLoading(true);
        const { data } = await AdminSecondaryService.getSecondaryList({
          page: currentPage || 1,
          limit: 100,
          side: activeSide, // buy or sell
          screen: SecondaryScreen.TRASH, // is tab new listings or accepting...
          customerFilter: selectedUser,
          companyFilter: selectedCompany,
        });
        setNewListingArray(data.data);
        // setNewListingArray((prevData) => [...prevData, ...data.data]);
        setHasMore(data.data.length >= 100);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
        isDataLoading.current = false;
      }
    },
    [activeSide, selectedCompany, selectedUser, setLoading]
  );

  useEffect(() => {
    loadInvitedList(page);
  }, [loadInvitedList, page]);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setPage((prevPage) => prevPage + 1);
  }, [hasMore, isLoading]);

  const onRestoreSecondary = useCallback(
    async (secondary: IAdminSecondaryItem) => {
      try {
        setLoading(true);
        const res = await AdminSecondaryService.restoreSecondary({
          secondaryId: secondary.id,
        });
        if (res.data.statusCode === 200) {
          await loadInvitedList();
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    },
    [loadInvitedList, setLoading]
  );

  return (
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
          columns={getColumns(onRestoreSecondary, activeTab, activeSide)}
          data={newListingArray}
          loadMore={loadMore}
          stickyHeader
          containerProps={{
            maxHeight: "calc(100vh - 278px)",
          }}
        />
      </Card>
    </Box>
  );
}
