import { Box, Chip, Typography } from "@mui/joy";
import dayjs from "dayjs";
import { round } from "lodash";
import { AppLogo } from "src/components/base/AppLogo";
import { IColumn } from "src/components/base/AppTable";
import { SecondarySideEnum } from "src/constants/enumBE";
import { formatNumber, number2USD } from "src/helpers/formatNumber";
import {
  IIndicationItem,
  TYPE_INDICATION,
} from "src/services/UserService.types";
import { getNet } from "src/shared/helpers/misc";

const alignRightStyle: React.CSSProperties = {
  textAlign: "end",
  paddingLeft: 0,
  paddingRight: 24,
};

export const getIndicationColumns = (type: TYPE_INDICATION) => {
  const columns: IColumn<IIndicationItem>[] = [
    {
      title: "DATE",
      key: "createdAt",
      render: (value) => {
        const formatvalue = dayjs(value).format("DD/MM/YY");

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
      title: "SIDE",
      key: "side",
      render: (value) => (
        <Chip
          sx={(theme) => ({
            background:
              value === SecondarySideEnum.BUY
                ? theme.color["primary-main"]
                : theme.color["astra-pink"],
            textTransform: "uppercase",
          })}
        >
          {value === SecondarySideEnum.BUY ? "BUY" : "SELL"}
        </Chip>
      ),
      headerProps: {
        style: {
          width: 78,
        },
      },
    },
    {
      title: "COMPANY",
      key: "companyName",
      render: (value, rowData) => (
        <Box display="flex" alignItems="center" gap="8px">
          <AppLogo src={rowData.logoUrl ?? undefined} size={39} />
          <Typography
            level="h5"
            variant="text-ellipsis"
            title={value?.toString()}
          >
            {value?.toString()}
          </Typography>
        </Box>
      ),
    },
  ];

  if (type === TYPE_INDICATION.OPEN) {
    const openColumns: IColumn<IIndicationItem>[] = [
      {
        title: "STATUS",
        key: "indicationStatus",
        render: (value) => (
          <Typography
            level="body1-500"
            variant="text-ellipsis"
            title={value?.toString()}
          >
            {value?.toString()}
          </Typography>
        ),
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
        title: "NOTIONAL",
        key: "notional",
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
        title: "SHARE PRICE",
        key: "sharePrice",
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
      {
        title: "VS LRV",
        key: "vsLRV",
        render: (value) => {
          return (
            <Typography
              level="body1-500"
              variant="text-ellipsis"
              color="text-secondary"
              title={
                value !== "0"
                  ? `${formatNumber(Number(value), false, 1)}%`
                  : "0%"
              }
            >
              {value !== "0"
                ? `${formatNumber(Number(value), false, 1)}%`
                : "0%"}
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
              title={formatValue}
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
              title={formatValue}
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
    ];

    columns.push(...openColumns);
  } else {
    const closedColumns: IColumn<IIndicationItem>[] = [
      {
        title: "NOTIONAL",
        key: "notional",
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
        title: "SHARE PRICE",
        key: "sharePrice",
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
      {
        title: "NET",
        // Random key
        key: "buyCom",
        render: (_, rowData) => {
          const { side, buyFee, sellFee, notional } = rowData ?? {};
          const formatValue = getNet(side, {
            notional: notional,
            fee: side === SecondarySideEnum.BUY ? buyFee : sellFee,
          });

          return (
            <Typography
              level="body1-500"
              variant="text-ellipsis"
              color="text-secondary"
              title={`$${formatValue}`}
            >
              ${formatValue}
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
    ];

    columns.push(...closedColumns);
  }

  return columns;
};
