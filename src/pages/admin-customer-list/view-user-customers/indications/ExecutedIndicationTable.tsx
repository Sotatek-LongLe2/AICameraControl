import { Box, Card, Chip, Typography } from "@mui/joy";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AppTable, { IColumn } from "src/components/base/AppTable";
import TextWithTooltip from "src/components/common/TextWithTooltip";
import { ITEM_PER_PAGE } from "src/constants/common";
import { SecondarySideEnum } from "src/constants/enumBE";
import { number2USD } from "src/helpers/formatNumber";
import { UserService } from "src/services/UserService";
import {
  IIndicationItem,
  IParamsGetIndications,
  TYPE_INDICATION,
} from "src/services/UserService.types";
import { useAppStore } from "src/store/appStore";
import { colors } from "src/styles/colors";

interface Props {
  onChangeData: (data: IIndicationItem[]) => void;
}

const columns: IColumn<IIndicationItem>[] = [
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
    title: "INDICATION",
    key: "companyName",
    render: (value, rowData) => (
      <Box display="flex">
        <Box
          display="flex"
          alignItems="center"
          gap="8px"
          overflow="hidden"
          title={value?.toString()}
        >
          <Chip
            color={
              rowData.side === SecondarySideEnum.BUY ? "primary" : "danger"
            }
          >
            {rowData.side === SecondarySideEnum.BUY ? "BUY" : "SELL"}
          </Chip>
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
  },
  {
    title: "MATCH",
    key: "usernameMatched",
    headerProps: {
      style: {
        width: "210px",
      },
    },
    render: (value) => (
      <TextWithTooltip
        text={
          <Typography
            level="h5"
            sx={{
              color: colors["text-primary"],
            }}
          >
            {String(value)}
          </Typography>
        }
        tooltip={String(value)}
      />
    ),
  },
  {
    title: "TOTAL COMMISSION",
    key: "totalCommission",
    headerProps: {
      style: {
        width: "210px",
      },
    },
    render: (value) => (
      <Typography
        level="body1"
        sx={{
          color: colors["text-primary"],
        }}
      >
        ${number2USD(Number(value))}
      </Typography>
    ),
  },
  {
    title: "EXECUTED BY",
    key: "executedBy",
    headerProps: {
      style: {
        width: "210px",
      },
    },
    render: (value) => (
      <TextWithTooltip
        text={
          <Typography
            level="body1"
            sx={{
              color: colors["text-primary"],
            }}
          >
            {String(value)}
          </Typography>
        }
        tooltip={String(value)}
      />
    ),
  },
];

const ExecutedIndicationTable: React.FC<Props> = ({ onChangeData }) => {
  const { id } = useParams();
  const { loading, setLoading } = useAppStore();
  const [data, setData] = useState<IIndicationItem[]>([]);
  const [params, setParams] = useState<IParamsGetIndications>({
    page: 1,
    limit: ITEM_PER_PAGE,
    type: TYPE_INDICATION.CLOSED,
    userId: Number(id),
  });
  const [hasMore, setHasMore] = useState<boolean>(false);

  const loadMore = useCallback(() => {
    if (!hasMore || loading) return;

    setParams((prev) => ({ ...prev, page: prev.page + 1 }));
  }, [hasMore, loading]);

  const fetchData = useCallback(
    async (params: IParamsGetIndications) => {
      try {
        if (!id) return;
        setLoading(true);
        const res = await UserService.getIndications(params);

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
    <Box>
      <Typography
        level="h5"
        sx={(theme) => ({ color: theme.color["text-primary"], mb: 24 })}
      >
        Executed
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

export default ExecutedIndicationTable;
