import { Button, Card, Typography } from "@mui/joy";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import TextWithTooltip from "src/components/common/TextWithTooltip.tsx";
import { DateFormat } from "src/constants/enum.ts";
import { AdminUsersCustomersService } from "src/services/AdminUsersCustomersService.ts";
import { IAdminInvitedItem } from "src/services/AdminUsersCustomersService.type.ts";
import { colors } from "src/styles/colors.ts";
import AppTable, { IColumn } from "../../components/base/AppTable.tsx";
import { InviteStatus } from "../../constants/enumBE.ts";
import { useAppStore } from "../../store/appStore.ts";

const columns = (
  onWithdrawnUser: (id: number) => void
): Array<IColumn<IAdminInvitedItem>> => [
  {
    title: "CODE SENT",
    key: "updatedAt",
    render: (value) => (
      <Typography
        level="body1-500"
        variant="text-ellipsis"
        sx={{
          color: colors["text-primary"],
        }}
      >
        {dayjs(value).format(DateFormat["DD/MM/YY HH:mm:ss"])}
      </Typography>
    ),
    headerProps: {
      style: { width: "158px", verticalAlign: "middle", padding: 12 },
    },
  },
  {
    title: "CUSTOMER",
    key: "firstName",
    headerProps: {
      style: { verticalAlign: "middle", padding: 12 },
    },
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
          </Typography>
        }
        tooltip={`${rowData?.firstName} ${rowData?.lastName}`}
      />
    ),
  },
  {
    title: "EMAIL",
    key: "email",
    render: (value) => (
      <TextWithTooltip
        text={
          <Typography
            level="body1-500"
            variant="text-ellipsis"
            sx={{
              color: colors["text-primary"],
            }}
          >
            {value}
          </Typography>
        }
        tooltip={`${value}`}
      />
    ),
    headerProps: {
      style: { width: "248.5px", verticalAlign: "middle", padding: 12 },
    },
  },
  {
    title: (
      <Typography>
        REMAINING <br /> TIME
      </Typography>
    ),
    key: "expiredAt",
    render: (value) => {
      const expirationTime = dayjs(Number(value));

      const diffInSeconds = expirationTime.diff(dayjs(), "seconds");
      const dur = dayjs.duration(diffInSeconds, "seconds");

      const hours = Math.floor(dur.asHours());
      const minutes = dur.minutes();
      const secs = dur.seconds();

      const formattedTime = `${hours}:${String(minutes).padStart(
        2,
        "0"
      )}:${String(secs).padStart(2, "0")}`;

      return (
        <Typography
          level="body1-500"
          variant="text-ellipsis"
          sx={{
            color: colors["text-primary"],
          }}
        >
          {hours + minutes + secs > 0 ? formattedTime : "Expired"}
        </Typography>
      );
    },
    headerProps: {
      style: {
        width: "120px",
        verticalAlign: "middle",
        whiteSpace: "normal",
        padding: 12,
      },
    },
  },
  {
    title: "",
    key: "id",
    render: (value, rowData) => (
      <Button
        key={value}
        variant="outlined"
        color="error-main"
        size="md"
        onClick={(e) => {
          e.stopPropagation();
          onWithdrawnUser(rowData.id);
        }}
      >
        Withdraw Invitation
      </Button>
    ),
    headerProps: { style: { width: "197px" } },
    rowProps: { style: { textAlign: "center" } },
  },
];

export default function InvitedTable() {
  const setLoading = useAppStore((state) => state.setLoading);
  const isLoading = useAppStore((state) => state.loading);
  const [invitedArray, setInvitedArray] = useState<IAdminInvitedItem[] | null>(
    null
  );
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  // const [y] = useScroll(document);

  const loadInvitedList = useCallback(
    async (currentPage: number) => {
      try {
        setLoading(true);
        const res = await AdminUsersCustomersService.listInvited({
          page: currentPage,
          limit: 1000,
          status: InviteStatus.INVITED,
        });

        setInvitedArray(res.data.data);
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

  const onWithdrawnUser = useCallback(
    async (invitedId: number) => {
      try {
        setLoading(true);
        const res = await AdminUsersCustomersService.withdrawInvitationUser({
          invitedId: invitedId,
        });
        if (res.data.statusCode === 200) {
          await loadInvitedList(1);
          toast.success(`Invitation withdrawn successfully`);
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
    <Card>
      <AppTable
        columns={columns(onWithdrawnUser)}
        data={invitedArray}
        loadMore={loadMore}
        stickyHeader
        containerProps={{
          maxHeight: "calc(100vh - 155px)",
        }}
      />
    </Card>
  );
}
