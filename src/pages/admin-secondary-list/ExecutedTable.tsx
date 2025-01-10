import { Box, Card, Typography } from "@mui/joy";
import { useCallback, useEffect, useRef, useState } from "react";
import { AppButtonStatusBuySell } from "src/components/base/AppButtonStatusBuySell.tsx";
import ComponentFilterUserCompany from "src/components/common/ComponentFilterUserCompany.tsx";
import { SecondaryScreen } from "src/constants/enumBE.ts";
import { number2USD } from "src/helpers/formatNumber.ts";
import { AdminSecondaryService } from "src/services/AdminSecondaryService.ts";
import { IAdminSecondaryItem } from "src/services/AdminSecondaryService.types.ts";
import AppTable, { IColumn } from "../../components/base/AppTable.tsx";
import { useAppStore } from "../../store/appStore.ts";
import { colors } from "../../styles/colors.ts";
import { ITabSecondaryProps } from "./index.tsx";
import TextWithTooltip from "src/components/common/TextWithTooltip.tsx";
import { toast } from "react-toastify";

const columns: Array<IColumn<IAdminSecondaryItem>> = [
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
    title: "Match",
    key: "usernameMatched",
    headerProps: {
      style: {
        width: "210px",
      },
    },
    render: (_, rowData) => (
      <TextWithTooltip
        text={
          <Typography
            level="h5"
            sx={{
              color: colors["text-primary"],
            }}
          >
            {rowData.usernameMatched ?? ""}
          </Typography>
        }
        tooltip={`${rowData.usernameMatched}`}
      />
    ),
  },
  {
    title: "Total commission",
    key: "usernameOrdered",
    headerProps: {
      style: {
        width: "210px",
      },
    },
    render: (_, rowData) => (
      <Typography
        level="body1"
        sx={{
          color: colors["text-primary"],
        }}
      >
        ${number2USD(Number(rowData.buyCom) + Number(rowData.sellCom))}
      </Typography>
    ),
  },
  {
    title: "Executed by",
    key: "adminName",
    headerProps: {
      style: {
        width: "210px",
      },
    },
    render: (_, rowData) => (
      <TextWithTooltip
        text={
          <Typography
            level="body1"
            sx={{
              color: colors["text-primary"],
            }}
          >
            {rowData.adminName ?? ""}
          </Typography>
        }
        tooltip={`${rowData.adminName}`}
      />
    ),
  },
];

export default function ExecutedTable({
  listUser,
  listCompany,
  activeSide,
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
          screen: SecondaryScreen.EXECUTED, // is tab new listings or accepting...
          customerFilter: selectedUser,
          companyFilter: selectedCompany,
        });
        setNewListingArray(data.data);
        // setNewListingArray((prevData) => [...prevData, ...data.data]);
        setHasMore(data.data.length >= 1000);
      } catch (error) {
        toast.error(String(error));
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
          columns={columns}
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
