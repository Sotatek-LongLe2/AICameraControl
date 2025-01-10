import {
  Box,
  Chip,
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  Typography,
} from "@mui/joy";
import {
  RiDeleteBinLine,
  RiEditLine,
  RiEyeLine,
  RiMoreLine,
} from "@remixicon/react";
import dayjs from "dayjs";
import { round } from "lodash";
import { createSearchParams } from "react-router-dom";
import { AppLogo } from "src/components/base/AppLogo";
import { IColumn } from "src/components/base/AppTable";
import { SecondarySideEnum } from "src/constants/enumBE";
import PAGES from "src/constants/router";
import { number2USD } from "src/helpers/formatNumber";
import {
  IBidsOffersItem,
  TYPE_BIDS_OFFERS,
} from "src/services/UserService.types";
import { getNet } from "src/shared/helpers/misc";
import { colors } from "src/styles/colors";
import { shadow } from "src/styles/shadow";

const alignRightStyle: React.CSSProperties = {
  textAlign: "end",
  paddingLeft: 0,
  paddingRight: 24,
};

interface IGetBidsOffersColumns {
  type: TYPE_BIDS_OFFERS;
  onRemoveOffer?: (rowData?: IBidsOffersItem) => void;
}

export const getBidsOffersColumns = ({
  onRemoveOffer,
  type,
}: IGetBidsOffersColumns) => {
  const columns: IColumn<IBidsOffersItem>[] = [
    {
      title: "DATE",
      key: "createdAt",
      render: (value) => {
        const formatvalue = dayjs(value?.toString()).format("DD/MM/YY");

        return (
          <Typography
            level="body1-500"
            variant="text-ellipsis"
            title={formatvalue}
          >
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
      // Change docs: 21. Display Id of order
      key: "id",
      render: (value) => {
        const formatValue = `#${value?.toString()}`;

        return (
          <Typography
            level="body1-500"
            variant="text-ellipsis"
            title={formatValue}
          >
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
            <AppLogo src={rowData.logoUrl ?? undefined} size={39} />
            <Typography level="h5" variant="text-ellipsis">
              {value?.toString()}
            </Typography>
            <Chip
              color={
                rowData.side === SecondarySideEnum.BUY ? "primary" : "danger"
              }
            >
              {rowData.side === SecondarySideEnum.BUY ? "BUY" : "SELL"}
            </Chip>
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
          <Typography
            level="body1-500"
            variant="text-ellipsis"
            title={formatValue}
          >
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
          <Typography
            level="body1-500"
            variant="text-ellipsis"
            title={formatValue}
          >
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
  ];

  if (type === TYPE_BIDS_OFFERS.OPEN) {
    const openColumns: IColumn<IBidsOffersItem>[] = [
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
              title={formatValue}
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
      {
        title: "",
        // Random key display
        key: "userIdOrder",
        render: (_, rowData) => (
          <Dropdown>
            <MenuButton
              slots={{ root: IconButton }}
              slotProps={{
                root: { color: "white", style: { paddingRight: "16px" } },
              }}
            >
              <RiMoreLine />
            </MenuButton>
            <Menu
              placement="bottom-end"
              sx={{
                minWidth: "174px",
                borderRadius: "6px",
                borderColor: colors.divider,
                bgcolor: colors.paper,
                boxShadow: shadow.lg,
                padding: "7px 0",
              }}
            >
              <MenuItem
                sx={{
                  padding: "7px 20px",
                  color: colors["text-primary"],

                  "&&:hover": {
                    bgcolor: colors["primary-opacity-light"],
                    color: colors["text-primary"],
                  },
                }}
                onClick={() => {
                  if (!rowData?.companyId) return;

                  window.navigate({
                    pathname: PAGES.SECONDARY_DETAIL,
                    search: createSearchParams({
                      companyId: String(rowData.companyId),
                      side: String(rowData.side),
                    }).toString(),
                  });
                }}
              >
                <Box display="flex" alignItems="center" gap="8px">
                  <RiEyeLine />
                  <Typography level="body1">View IOI</Typography>
                </Box>
              </MenuItem>
              <MenuItem
                sx={{
                  padding: "7px 20px",
                  color: colors["primary-main"],

                  "&&:hover": {
                    color: colors["primary-main"],
                    bgcolor: colors["primary-opacity-light"],
                  },
                }}
                onClick={() => {
                  if (!rowData?.companyId) return;

                  window.navigate({
                    pathname: PAGES.SECONDARY_ENTRY,
                    search: createSearchParams({
                      companyId: String(rowData.companyId),
                      side: String(rowData.side),
                    }).toString(),
                  });
                }}
              >
                <Box display="flex" alignItems="center" gap="8px">
                  <RiEditLine />
                  <Typography level="body1">Amend</Typography>
                </Box>
              </MenuItem>
              <MenuItem
                sx={{
                  padding: "7px 20px",
                  color: colors["astra-pink"],

                  "&&:hover": {
                    color: colors["astra-pink"],
                    backgroundColor: colors["error-opacity-light"],
                  },
                }}
                onClick={() => onRemoveOffer?.(rowData)}
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
            paddingRight: 0,
          },
        },
      },
    ];

    columns.push(...openColumns);
  } else {
    const closedColumns: IColumn<IBidsOffersItem>[] = [
      {
        title: "NET",
        // random key
        key: "sharePrice",
        render: (_, rowData) => {
          const { side, buyFee, sellFee, notional } = rowData ?? {};
          // https://jira.sotatek.com/browse/ASA-734
          const formatValue = getNet(
            side === SecondarySideEnum.BUY
              ? SecondarySideEnum.SELL
              : SecondarySideEnum.BUY,
            {
              notional: notional,
              fee: side === SecondarySideEnum.BUY ? sellFee : buyFee,
            }
          );

          return (
            <Typography
              level="body1-500"
              variant="text-ellipsis"
              color="text-secondary"
              title={`${formatValue}`}
            >
              ${formatValue}
            </Typography>
          );
        },
        headerProps: {
          style: {
            width: 154,
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

    columns.push(...closedColumns);
  }

  return columns;
};
