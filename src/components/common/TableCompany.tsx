import { Box, Chip, Typography } from "@mui/joy";
import { createSearchParams, useNavigate } from "react-router-dom";
import AppTable, { IColumn } from "src/components/base/AppTable";
import { SecondarySideEnum } from "src/constants/enumBE";
import PAGES from "src/constants/router";
import {
  formatNumber,
  number2USD,
  number2Percentage,
} from "src/helpers/formatNumber";
import { ISecondaryItem } from "src/services/UserSecondaryService.types";
import { useAuthStore } from "src/store/authStore";
import { colors } from "src/styles/colors";
import { AppLogo } from "../base/AppLogo";
import TextWithTooltip from "./TextWithTooltip";

interface TableCompanyProps {
  data: ISecondaryItem[] | null;
  loadMore?: () => void;
}

const TableCompany: React.FC<TableCompanyProps> = ({ data, loadMore }) => {
  const navigate = useNavigate();
  const typeAccess = useAuthStore((state) => state.typeAccess);
  const handleNavigateToSecondaryDetail = (indication: ISecondaryItem) => {
    navigate({
      pathname: PAGES.SECONDARY_DETAIL,
      search: createSearchParams({
        companyId: String(indication.companyId),
        side: String(indication.side),
      }).toString(),
    });
  };

  const columns: Array<IColumn<ISecondaryItem>> = [
    {
      title: "Side",
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
          width: "102px",
        },
      },
    },
    {
      title: "Company",
      key: "companyName",
      render: (value, item) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 8 }}>
          <AppLogo src={item.companyLogo} size={39} />
          <TextWithTooltip
            text={
              <Typography variant="text-ellipsis">
                <Typography level="h5">{value} </Typography>
                <Typography
                  level="body2"
                  sx={(theme) => ({ color: theme.color["text-secondary"] })}
                >
                  {item.country}, {item.industry}
                </Typography>
              </Typography>
            }
            tooltip={`${value} ${item.country}, ${item.industry}`}
          />
        </Box>
      ),
    },
    {
      title: "Notional",
      key: "notional",
      render: (value) => (
        <Typography
          level="body1-500"
          sx={
            typeAccess === "partial"
              ? {
                  color: "transparent",
                  textShadow: `0 0 10px ${colors["text-primary"]}`,
                }
              : {}
          }
        >
          {value
            ? isNaN(Number(value))
              ? value
              : `$${number2USD(Number(value))}`
            : ""}
        </Typography>
      ),
      headerProps: {
        style: {
          width: "142px",
          textAlign: "right",
        },
      },
      rowProps: {
        style: {
          textAlign: "right",
          color: colors["text-primary"],
        },
      },
    },
    {
      title: "Share price",
      key: "sharePrice",
      render: (value) => (
        <Typography
          level="body1-500"
          sx={
            typeAccess === "partial"
              ? {
                  color: "transparent",
                  textShadow: `0 0 10px ${colors["text-primary"]}`,
                }
              : {}
          }
        >
          {value
            ? isNaN(Number(value))
              ? value
              : `$${number2USD(Number(value))}`
            : ""}
        </Typography>
      ),
      headerProps: {
        style: {
          width: "134px",
          textAlign: "right",
        },
      },
      rowProps: {
        style: {
          textAlign: "right",
          color: colors["text-primary"],
        },
      },
    },
    {
      title: "VS LRV",
      key: "vsLRV",
      render: (_, rowData) => (
        <Typography
          level="body1-500"
          sx={
            typeAccess === "partial"
              ? {
                  color: "transparent",
                  textShadow: `0 0 10px ${colors["text-primary"]}`,
                }
              : {}
          }
        >
          {rowData.vsLRV !== "0"
            ? isNaN(Number(rowData.vsLRV))
              ? rowData.vsLRV
              : `${formatNumber(Number(rowData.vsLRV), false, 1)}%`
            : "0%"}
        </Typography>
      ),
      headerProps: {
        style: {
          width: "96px",
          textAlign: "right",
        },
      },
      rowProps: {
        style: {
          textAlign: "right",
          color: colors["text-secondary"],
          fontSize: "15px",
        },
      },
    },
    {
      title: "Valuation",
      key: "valuation",
      render: (value) => (
        <Typography
          level="body1"
          sx={
            typeAccess === "partial"
              ? {
                  color: "transparent",
                  textShadow: `0 0 10px ${colors["text-primary"]}`,
                }
              : {}
          }
        >
          {value
            ? isNaN(Number(value))
              ? value
              : `$${number2USD(Number(value))}`
            : ""}
        </Typography>
      ),
      headerProps: {
        style: {
          width: "122px",
          textAlign: "right",
        },
      },
      rowProps: {
        style: {
          textAlign: "right",
          color: colors["text-secondary"],
        },
      },
    },
    {
      title: "Fee",
      key: "fee",
      render: (value) => (
        <Typography
          level="body1"
          sx={
            typeAccess === "partial"
              ? {
                  color: "transparent",
                  textShadow: `0 0 10px ${colors["text-primary"]}`,
                }
              : {}
          }
        >
          {value
            ? `${typeAccess === "full" ? number2Percentage(value) : value}`
            : ""}
        </Typography>
      ),
      headerProps: {
        style: {
          width: "73px",
          textAlign: "right",
          fontSize: "15px",
        },
      },
      rowProps: {
        style: {
          textAlign: "right",
          color: colors["text-secondary"],
          fontSize: "15px",
        },
      },
    },
    {
      title: "MIN. SIZE",
      key: "minSize",
      render: (value) => (
        <Typography
          level="body1"
          sx={
            typeAccess === "partial"
              ? {
                  color: "transparent",
                  textShadow: `0 0 10px ${colors["text-primary"]}`,
                }
              : {}
          }
        >
          {value
            ? isNaN(Number(value))
              ? value
              : `$${number2USD(Number(value))}`
            : ""}
        </Typography>
      ),
      headerProps: {
        style: {
          width: "110px",
          textAlign: "right",
          fontSize: "15px",
        },
      },
      rowProps: {
        style: {
          textAlign: "right",
          color: colors["text-primary"],
        },
      },
    },
  ];

  return (
    <AppTable
      stickyHeader
      containerProps={{
        maxHeight: "calc(100vh - 175px - 42px - 42px - 24px)",
      }}
      sx={{
        minWidth: "1000px",
      }}
      columns={columns}
      data={data}
      onRowClick={(item) => handleNavigateToSecondaryDetail(item)}
      loadMore={loadMore}
    />
  );
};

export default TableCompany;
