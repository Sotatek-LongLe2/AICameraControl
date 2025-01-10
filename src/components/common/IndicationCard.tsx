import {
  Box,
  Card,
  CardContent,
  CardProps,
  Chip,
  Divider,
  Stack,
  styled,
  Typography,
} from "@mui/joy";
import { RiDraftLine, RiFlashlightLine, RiTimerLine } from "@remixicon/react";
import React, { memo } from "react";
import { IconPriceDown, IconPriceUp } from "src/assets/icon";
import { SecondarySideEnum } from "src/constants/enumBE";
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

const LabelCard = styled(Typography)(() => ({
  color: colors["secondary-light"],
  whiteSpace: "nowrap",
  lineHeight: "20px",
}));

const ValueCard = styled(Typography)(() => ({
  color: colors["text-primary"],
  fontSize: "15px",
  lineHeight: "22px",
}));

interface IndicationCardProps extends CardProps {
  indication: ISecondaryItem;
  onClick?: () => void;
}

const InfoItem = ({
  label,
  value,
  typeAccess,
}: {
  label: string;
  value: string | number;
  typeAccess?: string;
}) => (
  <Box>
    <LabelCard>{label}</LabelCard>
    <ValueCard
      sx={
        typeAccess === "partial"
          ? {
              color: "transparent",
              textShadow: `0 0 10px ${colors["text-primary"]}`,
            }
          : {}
      }
    >
      {value}
    </ValueCard>
  </Box>
);

const statusMap = {
  new_listing: {
    icon: <RiFlashlightLine color={colors["astra-accent-color"]} />,
    text: "New Listing",
    color: colors["astra-accent-color"],
  },
  accepting_offer: {
    icon: <RiTimerLine color={colors["astra-pink"]} />,
    text: "Accepting Backup Offers",
    color: colors["astra-pink"],
  },
  price_change: {
    icon: <IconPriceUp />,
    text: "Price change",
    color: colors["astra-pink"],
  },
  price_drop: {
    icon: <IconPriceDown />,
    text: "Price drop",
    color: colors["success-main"],
  },
  under_contracted: {
    icon: <RiDraftLine color={colors["astra-main"]} />,
    text: "Under Contract",
    color: colors["astra-main"],
  },
};

const StatusIcon = ({ status }: { status: keyof typeof statusMap }) => {
  const { icon, text, color } = statusMap[status] || {
    icon: "",
    text: "",
    color: colors["text-primary"],
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "3px",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px 20px",
      }}
    >
      {icon}
      <Typography
        level="body1"
        sx={{
          fontWeight: "500",
          color: color,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

const IndicationCard: React.FC<IndicationCardProps> = memo(
  ({ indication, onClick }) => {
    const typeAccess = useAuthStore((state) => state.typeAccess);

    return (
      <Card
        sx={{
          borderRadius: "2px",
          cursor: onClick ? "pointer" : "default",
        }}
        onClick={onClick}
      >
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{
                gap: "8px",
              }}
            >
              <AppLogo src={indication.companyLogo} size={50} />
              <Stack>
                <TextWithTooltip
                  text={
                    <Typography level="h5">{indication.companyName}</Typography>
                  }
                  tooltip={indication.companyName}
                  sx={{ maxWidth: 200 }}
                />
                <TextWithTooltip
                  text={
                    <Typography
                      level="body1"
                      sx={{
                        color: colors["text-secondary"],
                      }}
                    >
                      {indication.country}, {indication.industry}
                    </Typography>
                  }
                  tooltip={`${indication.country}, ${indication.industry}`}
                  sx={{ maxWidth: 200 }}
                />
              </Stack>
            </Stack>
            <Stack alignItems="flex-end" gap={"4px"}>
              <Chip
                size="sm"
                sx={(theme) => ({
                  background:
                    indication.side === SecondarySideEnum.BUY
                      ? theme.color["primary-main"]
                      : theme.color["astra-pink"],
                  textTransform: "uppercase",
                })}
              >
                {indication.side === SecondarySideEnum.BUY ? "BUY" : "SELL"}
              </Chip>
              <Typography
                level="body1"
                sx={
                  typeAccess === "partial"
                    ? {
                        color: "transparent",
                        textShadow: `0 0 10px ${colors["text-primary"]}`,
                      }
                    : {
                        fontWeight: "500",
                        color: colors["text-primary"],
                      }
                }
              >
                {number2USD(indication.notional)
                  ? `$${number2USD(indication.notional)}`
                  : ""}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>

        <Divider />
        <CardContent>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 6 }}
          >
            <InfoItem
              label="Share"
              value={
                number2USD(indication.sharePrice)
                  ? `$${number2USD(indication.sharePrice)}`
                  : indication.sharePrice
                  ? indication.sharePrice
                  : ""
              }
              typeAccess={typeAccess}
            />
            <InfoItem
              label="VS LRV"
              value={
                indication.vsLRV !== "0"
                  ? `${formatNumber(Number(indication.vsLRV), false, 1)}%`
                  : "0%"
              }
              typeAccess={typeAccess}
            />
            <InfoItem
              label="Valuation"
              value={
                number2USD(indication.valuation)
                  ? `$${number2USD(indication.valuation)}`
                  : indication.valuation
                  ? indication.valuation
                  : ""
              }
              typeAccess={typeAccess}
            />
            <InfoItem
              label="Fee"
              value={
                indication.fee
                  ? `${
                      typeAccess === "full"
                        ? number2Percentage(indication.fee)
                        : indication.fee
                    }`
                  : ""
              }
              typeAccess={typeAccess}
            />
            <InfoItem
              label="Min. Size"
              value={
                number2USD(indication.minSize)
                  ? `$${number2USD(indication.minSize)}`
                  : indication.minSize
                  ? indication.minSize
                  : ""
              }
              typeAccess={typeAccess}
            />
          </Box>
        </CardContent>

        <Divider />
        <StatusIcon status={indication.stage} />
      </Card>
    );
  }
);

export default IndicationCard;
