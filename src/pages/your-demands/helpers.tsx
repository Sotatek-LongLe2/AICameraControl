import {
  Box,
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
  RiExternalLinkLine,
  RiMoreLine,
} from "@remixicon/react";
import dayjs from "dayjs";
import { generatePath } from "react-router-dom";
import { AppLogo } from "src/components/base/AppLogo";
import { IColumn } from "src/components/base/AppTable";
import PAGES from "src/constants/router";
import { number2USD } from "src/helpers/formatNumber";
import { IDemandItem, TYPE_DEMAND } from "src/services/UserService.types";
import { colors } from "src/styles/colors";
import { shadow } from "src/styles/shadow";

const alignRightStyle: React.CSSProperties = {
  textAlign: "end",
  paddingLeft: 0,
  paddingRight: 24,
};

interface IGetIndicationColumns {
  type: TYPE_DEMAND;
  onRemoveDemand?: (rowData?: IDemandItem) => void;
}

export const getIndicationColumns = ({
  onRemoveDemand,
  type,
}: IGetIndicationColumns) => {
  const columns: IColumn<IDemandItem>[] = [
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
      title: "COMPANY",
      key: "name",
      render: (value, rowData) => (
        <Box display="flex">
          <Box
            display="flex"
            alignItems="center"
            gap="8px"
            overflow="hidden"
            sx={{ cursor: "pointer" }}
            onClick={() =>
              window.navigate(
                generatePath(PAGES.PRIMARY.DETAIL, {
                  companyID: String(rowData.primaryId),
                })
              )
            }
            title={value?.toString()}
          >
            <AppLogo src={rowData.logoUrl ?? undefined} size={39} />
            <Typography level="h5" variant="text-ellipsis">
              {value?.toString()}
            </Typography>
            <RiExternalLinkLine
              color="white"
              style={{
                flexShrink: 0,
              }}
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
  ];

  if (type === TYPE_DEMAND.PENDING) {
    const pendingColumns: IColumn<IDemandItem>[] = [
      {
        title: "NOTIONAL",
        key: "demand",
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

    columns.push(...pendingColumns);
  } else {
    const executedColumns: IColumn<IDemandItem>[] = [
      {
        title: "ALLOCATION",
        key: "allocation",
        render: (value) => {
          const formatValue = Number(value)
            ? number2USD((value || "")?.toString())
            : 0;

          return (
            <Typography
              level="body1-500"
              variant="text-ellipsis"
              title={formatValue ? `$${formatValue}` : ""}
            >
              {formatValue ? `$${formatValue}` : ""}
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
    ];

    columns.push(...executedColumns);
  }

  columns.push({
    title: "",
    // Random key display
    key: "userId",
    render: (_, rowData) =>
      type === TYPE_DEMAND.PENDING ? (
        <Dropdown>
          <MenuButton
            slots={{ root: IconButton }}
            slotProps={{
              root: { color: "white", style: { paddingRight: "13px" } },
            }}
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
            }}
          >
            <MenuItem
              sx={{
                padding: "7px 20px",
                color: colors["primary-main"],
                minWidth: 239,

                "&&:hover": {
                  color: colors["primary-main"],
                  bgcolor: colors["primary-opacity-light"],
                },
              }}
              onClick={() =>
                window.navigate(
                  generatePath(PAGES.PRIMARY_PLACE_DEMAND, {
                    companyID: rowData.primaryId.toString(),
                  })
                )
              }
            >
              <Box display="flex" alignItems="center" gap="8px">
                <RiEditLine />
                <Typography level="body1">Amend Demand</Typography>
              </Box>
            </MenuItem>
            <MenuItem
              sx={{
                padding: "7px 20px",
                color: colors["astra-pink"],
                minWidth: 239,

                "&&:hover": {
                  color: colors["astra-pink"],
                  backgroundColor: colors["error-opacity-light"],
                },
              }}
              onClick={() => onRemoveDemand?.(rowData)}
            >
              <Box display="flex" alignItems="center" gap="8px">
                <RiDeleteBinLine />
                <Typography level="body1">Remove Demand</Typography>
              </Box>
            </MenuItem>
          </Menu>
        </Dropdown>
      ) : null,
    headerProps: {
      style: {
        width: 56,
      },
    },
    rowProps: {
      style: {
        ...alignRightStyle,
        padding: 0,
      },
    },
  });

  return columns;
};
