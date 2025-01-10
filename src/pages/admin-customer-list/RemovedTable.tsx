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
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { generatePath } from "react-router-dom";
import { toast } from "react-toastify";
import TextWithTooltip from "src/components/common/TextWithTooltip.tsx";
import { InviteStatus } from "src/constants/enumBE.ts";
import { PAGES_ADMIN } from "src/constants/router.ts";
import hexToRGBA from "src/helpers/hexToRGB.ts";
import { AdminUsersCustomersService } from "src/services/AdminUsersCustomersService.ts";
import { IAdminRemovedItem } from "src/services/AdminUsersCustomersService.type.ts";
import AppTable, { IColumn } from "../../components/base/AppTable.tsx";
import { useAppStore } from "../../store/appStore.ts";
import { colors } from "../../styles/colors.ts";
import { ITabUserCustomerProps } from "./index.tsx";

const columns = (
  onRestoreUser: (userId: number) => void,
  activeTab: number
): Array<IColumn<IAdminRemovedItem>> => [
  {
    title: "CREATED",
    key: "createdAt",
    render: (value) => (
      <Typography
        level="body1-500"
        variant="text-ellipsis"
        sx={{
          color: colors["text-primary"],
        }}
      >
        {value}
      </Typography>
    ),
    headerProps: {
      style: {
        width: "90px",
      },
    },
  },
  {
    title: "CUSTOMER",
    key: "firstName",
    render: (_, rowData) => (
      <TextWithTooltip
        text={
          <Typography
            level="body1-500"
            variant="text-ellipsis"
            sx={{
              color: colors["text-primary"],
            }}
          >
            {rowData?.firstName} {rowData?.lastName}
            <Typography
              level="body1"
              sx={{
                color: hexToRGBA(colors["text-primary"], 0.8),
                ml: 8,
              }}
            >
              {rowData?.company}
            </Typography>
          </Typography>
        }
        tooltip={`${rowData.firstName} ${rowData.lastName} ${
          rowData.company ? ` - ${rowData.company}` : ""
        }`}
      />
    ),
  },
  {
    title: "REMOVED",
    key: "deletedAt",
    render: (value, rowData) => (
      <Typography
        level="body1"
        variant="text-ellipsis"
        sx={{
          color: colors["text-primary"],
        }}
      >
        {value} {rowData.adminDeleted ? `by ${rowData.adminDeleted}` : ""}
      </Typography>
    ),
    headerProps: {
      style: {
        width: "413.5px",
      },
    },
  },
  {
    title: "",
    key: "userId",
    render: (_, rowData) => (
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{ root: { variant: "plain", color: "neutral" } }}
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
              color: colors["text-primary"],
              "&&:hover": {
                color: colors["primary-main"],
                bgcolor: colors["primary-opacity-light"],
              },
            }}
            onClick={() =>
              window.navigate(
                `${generatePath(PAGES_ADMIN.CUSTOMERS.EDIT, {
                  id: rowData.userId.toString(),
                })}?tab=${activeTab}`
              )
            }
          >
            <Box display="flex" alignItems="center" gap="8px">
              <RiEditLine />
              <Typography level="body1">Edit </Typography>
            </Box>
          </MenuItem>
          <MenuItem
            sx={{
              padding: "8px 20px",
              color: colors["text-primary"],
              "&&:hover": {
                color: colors["primary-main"],
                bgcolor: colors["primary-opacity-light"],
              },
            }}
            onClick={(e) => {
              e.stopPropagation();
              onRestoreUser(rowData.userId);
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

export default function RemovedTable({ activeTab }: ITabUserCustomerProps) {
  const setLoading = useAppStore((state) => state.setLoading);
  const isLoading = useAppStore((state) => state.loading);
  const [removedArray, setRemovedArray] = useState<IAdminRemovedItem[] | null>(
    null
  );
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const loadInvitedList = useCallback(
    async (currentPage: number) => {
      try {
        setLoading(true);
        const res = await AdminUsersCustomersService.listInvited({
          page: currentPage,
          limit: 1000,
          status: InviteStatus.REMOVED,
        });
        const updatedData = res.data.data.map((item: IAdminRemovedItem) => {
          const formattedCreatedAt = dayjs(item.createdAt).format("DD/MM/YY");
          const formattedDeletedAt = dayjs(item.deletedAt).format("DD/MM/YY");
          return {
            ...item,
            createdAt: formattedCreatedAt,
            deletedAt: formattedDeletedAt,
          };
        });

        setRemovedArray(updatedData);
        setHasMore(res.data.data.length >= 1000);
      } catch (error) {
        toast.error(String(error));
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );

  useEffect(() => {
    loadInvitedList(page);
  }, [loadInvitedList, page]);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setPage(page + 1);
  }, [hasMore, isLoading, page]);

  const onRestoreUser = useCallback(
    async (userId: number) => {
      try {
        setLoading(true);
        const res = await AdminUsersCustomersService.restoreUser({
          id: userId,
        });
        if (res.data.statusCode === 200) {
          await loadInvitedList(1);
          toast.success(`Account restored successfully`);
        }
      } catch (e) {
        toast.error(String(e));
      } finally {
        setLoading(false);
      }
    },
    [loadInvitedList, setLoading]
  );

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <Card>
        <AppTable
          columns={columns(onRestoreUser, activeTab)}
          data={removedArray}
          loadMore={loadMore}
          stickyHeader
          containerProps={{
            maxHeight: "calc(100vh - 155px)",
          }}
        />
      </Card>
    </Box>
  );
}
