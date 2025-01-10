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
import { round } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { generatePath, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AppTable, { IColumn } from "src/components/base/AppTable";
import TextWithTooltip from "src/components/common/TextWithTooltip";
import { ITEM_PER_PAGE } from "src/constants/common";
import { SecondarySideEnum } from "src/constants/enumBE";
import { PAGES_ADMIN } from "src/constants/router";
import { formatNumber, number2USD } from "src/helpers/formatNumber";
import { AdminSecondaryService } from "src/services/AdminSecondaryService";
import { UserService } from "src/services/UserService";
import {
  IIndicationItem,
  IParamsGetIndications,
  TYPE_INDICATION,
} from "src/services/UserService.types";
import { useAppStore } from "src/store/appStore";
import { colors } from "src/styles/colors";
import { shadow } from "src/styles/shadow";

interface Props {
  onChangeData: (data: IIndicationItem[]) => void;
}

const alignRightStyle: React.CSSProperties = {
  textAlign: "end",
  paddingLeft: 0,
  paddingRight: 24,
};

const getColumns = (
  onRemoveSecondary: (secondary: IIndicationItem) => void
): IColumn<IIndicationItem>[] => [
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
    title: "NOTIONAL",
    key: "notional",
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
    title: "SHARE PRICE",
    key: "sharePrice",
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
    title: "VS LRV",
    key: "vsLRV",
    render: (value) => {
      return (
        <Typography
          level="body1-500"
          variant="text-ellipsis"
          color="text-secondary"
        >
          {value !== "0" ? `${formatNumber(Number(value), false, 1)}%` : "0%"}
        </Typography>
      );
    },
    headerProps: {
      style: {
        width: 96,
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
    title: "VALUATION",
    key: "valuation",
    render: (value) => {
      const formatValue = `$${number2USD((value || "")?.toString())}`;

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
        width: 122,
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
    title: "FEE",
    key: "fee",
    render: (value) => {
      const formatValue = `${round(Number(value) || 0, 1)}%`;
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
        width: 73,
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
    title: "MIN. SIZE",
    key: "minSize",
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
        width: 110,
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
    title: "",
    key: "id",
    render: (_, rowData) => (
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{ root: { color: "white" } }}
        >
          <RiMoreLine />
        </MenuButton>
        <Menu
          placement="bottom-end"
          sx={{
            minWidth: "160px",
            borderRadius: "6px",
            borderColor: colors.divider,
            bgcolor: colors.paper,
            boxShadow: shadow.lg,
            padding: "7px 0",
          }}
        >
          <MenuItem
            onClick={() =>
              window.navigate(
                `${generatePath(PAGES_ADMIN.SECONDARY.EDIT, {
                  id: rowData.id.toString(),
                })}?tab=${0}&side=${rowData.side}`
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
        width: 62,
      },
    },
    rowProps: {
      style: {
        ...alignRightStyle,
        paddingRight: "13px",
      },
    },
  },
];

const PostingIndicationTable: React.FC<Props> = ({ onChangeData }) => {
  const { id } = useParams();
  const { loading, setLoading } = useAppStore();
  const [data, setData] = useState<IIndicationItem[]>([]);
  const [params, setParams] = useState<IParamsGetIndications>({
    page: 1,
    limit: ITEM_PER_PAGE,
    type: TYPE_INDICATION.OPEN,
    userId: Number(id),
  });
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [indicationRemove, setIndicationRemove] = useState<IIndicationItem>();

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

  const handleRemoveIndication = useCallback(async () => {
    if (!indicationRemove?.id) return;

    try {
      setLoading(true);
      const res = await AdminSecondaryService.deleteSecondary({
        secondaryId: indicationRemove.id,
      });

      if (res.data.statusCode === 200) {
        fetchData(params);
        setIndicationRemove(undefined);
      }
    } catch (e) {
      toast.error(String(e));
    } finally {
      setLoading(false);
    }
  }, [fetchData, indicationRemove, params, setLoading]);

  useEffect(() => {
    fetchData(params);
  }, [fetchData, params]);

  useEffect(() => {
    onChangeData(data);
  }, [data, onChangeData]);

  if (!data || data.length <= 0) return <></>;

  return (
    <>
      <Box sx={{ mb: 24 }}>
        <Typography
          level="h5"
          sx={(theme) => ({ color: theme.color["text-primary"], mb: 24 })}
        >
          Postings
        </Typography>
        <Card>
          <AppTable
            columns={getColumns(setIndicationRemove)}
            data={data}
            loadMore={loadMore}
            stickyHeader
            containerProps={{
              maxHeight: "256px",
            }}
          />
        </Card>
      </Box>
      <Modal
        open={!!indicationRemove}
        onClose={() => setIndicationRemove(undefined)}
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
            You are about to remove Indication “{indicationRemove?.companyName}{" "}
            - {indicationRemove?.firstName} {indicationRemove?.lastName}”. All
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
              onClick={() => setIndicationRemove(undefined)}
            >
              Cancel
            </Button>
            <Button onClick={handleRemoveIndication} color="astra-pink">
              Delete
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default PostingIndicationTable;
