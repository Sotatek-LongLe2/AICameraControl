import { Box, Card, Typography } from "@mui/joy";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AppLogo } from "src/components/base/AppLogo";
import AppTable, { IColumn } from "src/components/base/AppTable";
import TextWithTooltip from "src/components/common/TextWithTooltip";
import { ITEM_PER_PAGE } from "src/constants/common";
import { number2USD } from "src/helpers/formatNumber";
import { UserService } from "src/services/UserService";
import {
  IDemandItem,
  IParamsGetDemands,
  TYPE_DEMAND,
} from "src/services/UserService.types";
import { useAppStore } from "src/store/appStore";

interface Props {
  onChangeData: (data: IDemandItem[]) => void;
}

const alignRightStyle: React.CSSProperties = {
  textAlign: "end",
  paddingLeft: 0,
  paddingRight: 24,
};

const columns: IColumn<IDemandItem>[] = [
  {
    title: "DATE",
    key: "createdAt",
    render: (value) => {
      const formatvalue = dayjs(value?.toString()).format("DD/MM/YY");

      return (
        <Typography level="body1-500" variant="text-ellipsis">
          {formatvalue}
        </Typography>
      );
    },
    headerProps: {
      style: {
        width: 90,
      },
    },
  },
  {
    title: "ID",
    key: "id",
    render: (value) => {
      const formatValue = `#${value?.toString()}`;

      return (
        <Typography level="body1-500" variant="text-ellipsis">
          {formatValue}
        </Typography>
      );
    },
    headerProps: {
      style: {
        width: 70,
      },
    },
    rowProps: {
      style: {
        paddingRight: "9px",
      },
    },
  },
  {
    title: "COMPANY",
    key: "name",
    render: (value, rowData) => (
      <Box display="flex">
        <Box
          display="flex"
          alignItems="center"
          gap="8px"
          overflow="hidden"
          title={value?.toString()}
        >
          <AppLogo src={rowData.logoUrl ?? undefined} size={39} />
          <TextWithTooltip
            text={
              <Typography level="h5" variant="text-ellipsis">
                {value?.toString()}
              </Typography>
            }
            tooltip={value?.toString()}
          />
        </Box>
      </Box>
    ),
    headerProps: {
      style: {
        minWidth: 70,
      },
    },
  },
  {
    title: "NOTIONAL",
    key: "demand",
    render: (value) => {
      const formatValue = `$${number2USD((value || "")?.toString())}`;
      return (
        <Typography level="body1-500" variant="text-ellipsis">
          {formatValue}
        </Typography>
      );
    },
    headerProps: {
      style: {
        width: 118,
        ...alignRightStyle,
      },
    },
    rowProps: {
      style: {
        ...alignRightStyle,
        paddingLeft: 22,
      },
    },
  },
  {
    title: "BOOKS CLOSED",
    key: "booksClose",
    render: (value) => {
      const formatValue = dayjs(value?.toString()).format("ddd. DD, MMMM");
      return (
        <Typography level="body1-500" variant="text-ellipsis">
          {formatValue}
        </Typography>
      );
    },
    headerProps: {
      style: {
        width: 190,
        ...alignRightStyle,
      },
    },
    rowProps: {
      style: {
        ...alignRightStyle,
        paddingLeft: 16,
      },
    },
  },
];

const PendingDemandTable: React.FC<Props> = ({ onChangeData }) => {
  const { id } = useParams();
  const { loading, setLoading } = useAppStore();
  const [data, setData] = useState<IDemandItem[]>([]);
  const [params, setParams] = useState<IParamsGetDemands>({
    page: 1,
    limit: ITEM_PER_PAGE,
    type: TYPE_DEMAND.PENDING,
    userId: Number(id),
  });
  const [hasMore, setHasMore] = useState<boolean>(false);

  const loadMore = useCallback(() => {
    if (!hasMore || loading) return;

    setParams((prev) => ({ ...prev, page: prev.page + 1 }));
  }, [hasMore, loading]);

  const fetchData = useCallback(
    async (params: IParamsGetDemands) => {
      try {
        if (!id) return;
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
    [id, setLoading]
  );

  useEffect(() => {
    fetchData(params);
  }, [fetchData, params]);

  useEffect(() => {
    onChangeData(data);
  }, [data, onChangeData]);

  if (!data || data.length <= 0) return <></>;

  return (
    <Box sx={{ mb: 24 }}>
      <Typography
        level="h5"
        sx={(theme) => ({ color: theme.color["text-primary"], mb: 24 })}
      >
        Pending
      </Typography>
      <Card>
        <AppTable
          columns={columns}
          data={data}
          loadMore={loadMore}
          stickyHeader
          containerProps={{
            maxHeight: "256px",
          }}
        />
      </Card>
    </Box>
  );
};

export default PendingDemandTable;
