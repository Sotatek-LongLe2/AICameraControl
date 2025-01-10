import { Box, Typography } from "@mui/joy";
import dayjs from "dayjs";
import { generatePath } from "react-router-dom";
import { AppInputNumber } from "src/components/base/AppInputNumber";
import { AppLink } from "src/components/base/AppLink";
import { IColumn } from "src/components/base/AppTable";
import { PAGES_ADMIN } from "src/constants/router";
import { number2USD } from "src/helpers/formatNumber";
import { IAdminPrimaryOrderItem } from "src/services/AdminPrimaryService.types";
import { colors } from "src/styles/colors";

interface IGetPrimaryOrderColumns {
  isEditable?: boolean;
  afterCloseStage?: boolean;
  isValidAllocation?: (id: number, newValue: string | number) => boolean;
  handleChangeAllocation?: (id: number, newValue: string) => void;
}

const alignRightStyle: React.CSSProperties = {
  textAlign: "end",
  paddingLeft: 0,
  paddingRight: 24,
};

export const getPrimaryOrderColumns = ({
  isEditable,
  isValidAllocation,
  afterCloseStage,
  handleChangeAllocation,
}: IGetPrimaryOrderColumns): Array<IColumn<IAdminPrimaryOrderItem>> => {
  const columns: Array<IColumn<IAdminPrimaryOrderItem>> = [
    {
      title: "DATE",
      key: "updatedAt",
      render: (value) => (
        <Typography
          level="body1"
          sx={{ color: colors["text-primary"] }}
          fontWeight="500"
        >
          {value ? dayjs(value).format("DD/MM/YY") : undefined}
        </Typography>
      ),
      headerProps: {
        style: {
          width: "90px",
        },
      },
    },
    {
      title: "ID",
      key: "id",
      headerProps: {
        style: {
          width: "70px",
        },
      },
      render: (value) => (
        <Typography
          level="body1"
          sx={{ color: colors["text-primary"] }}
          fontWeight="500"
        >
          #{value?.toString()}
        </Typography>
      ),
    },
    {
      title: "CUSTOMER",
      key: "firstName",
      render: (_, rowData) => (
        <AppLink
          href=""
          onClick={(e) => {
            e.preventDefault();
            window.navigate(
              generatePath(PAGES_ADMIN.CUSTOMERS.VIEW, {
                id: rowData.userId.toString(),
              })
            );
          }}
          textProps={{ variant: "text-ellipsis", color: "primary-main" }}
        >
          {rowData.firstName} {rowData.lastName}
        </AppLink>
      ),
      headerProps: {
        style: {},
      },
    },
  ];

  if (afterCloseStage)
    columns.push(
      isEditable
        ? {
            title: "ALLOCATION",
            key: "allocation",
            render: (value, rowData) => (
              <Box display="flex" justifyContent="flex-end" width="100%">
                <AppInputNumber
                  wrapperProps={{
                    sx: { width: "100%" },
                  }}
                  slotProps={{
                    input: {
                      sx: { textAlign: "right", width: "100%" },
                    },
                  }}
                  defaultValue={value?.toString()}
                  isAllowed={(values) =>
                    !!isValidAllocation?.(rowData.id, values.floatValue ?? 0)
                  }
                  onValueChange={(values) => {
                    const newValue = String(values.floatValue || "");

                    rowData.allocation = newValue;
                    handleChangeAllocation?.(rowData.id, newValue);
                  }}
                />
              </Box>
            ),
            headerProps: {
              style: {
                ...alignRightStyle,
              },
            },
            rowProps: {
              style: {
                ...alignRightStyle,
              },
            },
          }
        : {
            title: "ALLOCATION",
            key: "allocation",
            render: (value) => (
              <Typography
                level="body1"
                sx={{ color: colors["text-primary"] }}
                fontWeight="500"
              >
                ${number2USD(Number(value))}
              </Typography>
            ),
            headerProps: {
              style: {
                ...alignRightStyle,
              },
            },
            rowProps: {
              style: { ...alignRightStyle },
            },
          }
    );

  columns.push({
    title: "DEMAND",
    key: "demand",
    render: (value) => (
      <Typography
        level="body1"
        sx={{ color: colors["text-primary"] }}
        fontWeight="500"
      >
        {number2USD(value?.toString())}
      </Typography>
    ),
    headerProps: {
      style: {
        width: "93px",
        ...alignRightStyle,
      },
    },
    rowProps: {
      style: {
        ...alignRightStyle,
      },
    },
  });

  if (!afterCloseStage)
    columns.push({
      title: "SHARE",
      key: "share",
      render: (value) => {
        return (
          <Typography
            level="body1"
            sx={{ color: colors["text-primary"] }}
            fontWeight="500"
          >
            {Math.round((Number(value) || 0) * 100)}%
          </Typography>
        );
      },
      headerProps: {
        style: {
          width: "111px",
          ...alignRightStyle,
        },
      },
      rowProps: {
        style: {
          ...alignRightStyle,
        },
      },
    });

  return columns;
};
