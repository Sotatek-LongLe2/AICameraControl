import { Box, Card, Chip, Typography } from "@mui/joy";
import dayjs from "dayjs";
import { round } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AppTable, { IColumn } from "src/components/base/AppTable";
import TextWithTooltip from "src/components/common/TextWithTooltip";
import { ITEM_PER_PAGE } from "src/constants/common";
import { SecondarySideEnum } from "src/constants/enumBE";
import { number2USD } from "src/helpers/formatNumber";
import { UserService } from "src/services/UserService";
import {
  IBidsOffersItem,
  IParamsGetBidsOffers,
  TYPE_BIDS_OFFERS,
} from "src/services/UserService.types";
import { useAppStore } from "src/store/appStore";

interface Props {
  onChangeData: (data: IBidsOffersItem[]) => void;
}

const alignRightStyle: React.CSSProperties = {
  textAlign: "end",
  paddingLeft: 0,
  paddingRight: 24,
};

const columns: IColumn<IBidsOffersItem>[] = [
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
    key: "secondaryId",
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
    title: "IOI",
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
                {value?.toString()} - {rowData.firstName} {rowData.lastName}
              </Typography>
            }
            tooltip={`${value?.toString()} - ${rowData.firstName} ${
              rowData.lastName
            }`}
          />
        </Box>
      </Box>
    ),
  },
  {
    title: "AMOUNT",
    key: "notionalOrder",
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
      },
    },
  },
  {
    title: "PRICE",
    key: "sharePriceOrder",
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
        width: 134,
        ...alignRightStyle,
      },
    },
    rowProps: {
      style: {
        ...alignRightStyle,
      },
    },
  },
  {
    title: "DISCOUNT TO IOI",
    key: "premiumDiscount",
    render: (value) => {
      const formatValue = `${round(Number(value || "") || 0, 1)}%`;
      return (
        <Typography
          level="body1-500"
          variant="text-ellipsis"
          color="text-secondary"
        >
          {formatValue}
        </Typography>
      );
    },
    headerProps: {
      style: {
        width: 168,
        ...alignRightStyle,
      },
    },
    rowProps: {
      style: {
        ...alignRightStyle,
      },
    },
  },
];

const PendingBidOfferTable: React.FC<Props> = ({ onChangeData }) => {
  const { id } = useParams();
  const { loading, setLoading } = useAppStore();
  const [data, setData] = useState<IBidsOffersItem[]>([]);
  const [params, setParams] = useState<IParamsGetBidsOffers>({
    page: 1,
    limit: ITEM_PER_PAGE,
    type: TYPE_BIDS_OFFERS.OPEN,
    userId: Number(id),
  });
  const [hasMore, setHasMore] = useState<boolean>(false);

  const loadMore = useCallback(() => {
    if (!hasMore || loading) return;

    setParams((prev) => ({ ...prev, page: prev.page + 1 }));
  }, [hasMore, loading]);

  const fetchData = useCallback(
    async (params: IParamsGetBidsOffers) => {
      try {
        if (!id) return;
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

export default PendingBidOfferTable;
