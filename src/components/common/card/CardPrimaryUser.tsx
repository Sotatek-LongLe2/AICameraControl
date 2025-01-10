import {
  Box,
  BoxProps,
  Card,
  CardContent,
  Divider,
  Stack,
  styled,
  Typography,
} from "@mui/joy";
import {
  RiCloseLine,
  RiFileTransferLine,
  RiLockPasswordLine,
  RiRocket2Line,
  RiRocketLine,
  RiSurveyLine,
} from "@remixicon/react";
import dayjs from "dayjs";
import React, { useMemo, useState } from "react";
import { DateFormat } from "src/constants/enum";
import { StageAdmin } from "src/constants/enumBE";
import { FUNDING_ROUNDs } from "src/constants/options";
import { number2USD } from "src/helpers/formatNumber";
import { IPrimaryItem } from "src/services/UserPrimaryService.types";
import { useAuthStore } from "src/store/authStore";
import { colors } from "src/styles/colors";
import Countdown from "../CountDown";
import { AppLogo } from "src/components/base/AppLogo";
import TextWithTooltip from "../TextWithTooltip";

interface CardPrimaryUserProps {
  company: IPrimaryItem;
  onClick?: () => void;
  showBorder?: boolean;
  showBanner?: boolean;
  showStatus?: boolean;
  showAllInfor?: boolean;
}

const LabelCard = styled(Typography)(() => ({
  color: colors["secondary-light"],
  whiteSpace: "nowrap",
  fontSize: "13px",
  lineHeight: "20px",
}));

const ValueCard = styled(Typography)(() => ({
  color: colors["text-primary"],
  fontSize: "15px",
  lineHeight: "22px",
  fontWeight: 500,
}));

interface InfoItemProps extends BoxProps {
  label: string;
  value: string | number;
  typeAccess?: string;
  isShowInfor: boolean;
}

const InfoItem = ({
  label,
  value,
  typeAccess,
  isShowInfor,
  ...props
}: InfoItemProps) => {
  const formatValue = useMemo(
    () => (isNaN(Number(value)) ? value : `$${number2USD(Number(value))}`),
    [value]
  );

  return (
    <Box {...props}>
      <LabelCard>{label}</LabelCard>
      {isShowInfor ? (
        <>
          {typeAccess === "partial" ? (
            <ValueCard
              sx={{
                color: "transparent",
                textShadow: `0 0 10px ${colors["text-primary"]}`,
              }}
              title={formatValue.toString()}
            >
              {formatValue}
            </ValueCard>
          ) : (
            <ValueCard variant="text-ellipsis" title={formatValue.toString()}>
              {formatValue}
            </ValueCard>
          )}
        </>
      ) : (
        <ValueCard>-</ValueCard>
      )}
    </Box>
  );
};

const STATUS_DISPLAY: Record<
  StageAdmin,
  { icon: React.ReactNode; background: string; label: string }
> = {
  "launch date": {
    icon: <RiRocketLine />,
    background: colors["secondary-dark"],
    label: "Going Live",
  },
  "marketing period": {
    icon: <RiSurveyLine />,
    background: colors["primary-main"],
    label: "Marketing Period",
  },
  "books open": {
    icon: <RiRocket2Line />,
    background: colors["success-main"],
    label: "Books Open",
  },
  "books closed": {
    icon: <RiLockPasswordLine />,
    background: colors["error-600"],
    label: "Books Closed",
  },
  "allocation and Signing": {
    icon: <RiFileTransferLine />,
    background: colors["_#D11DAA"],
    label: "Allocation and Signing",
  },
  closed: {
    icon: <RiCloseLine />,
    background: colors["error-600"],
    label: "Closed",
  },
};

const CardPrimaryUser: React.FC<CardPrimaryUserProps> = ({
  company,
  onClick,
  showBorder,
  showBanner,
  showStatus,
  showAllInfor,
}) => {
  const {
    logoUrl,
    name,
    placeHolderName,
    industry,
    fundingRound,
    dealSize,
    valuationPre,
    offerPrice,
    minimumSize,
    stage,
    launchDate,
    booksOpen,
    booksClose,
    closeDate,
  } = company;
  const typeAccess = useAuthStore((state) => state.typeAccess);
  const [currentStage, setCurrentStage] = useState<StageAdmin>(stage);

  const getStageTimes = () => {
    switch (currentStage) {
      case StageAdmin.LAUNCH_DATE:
        return { startTime: launchDate, endTime: launchDate };
      case StageAdmin.MARKETING_PERIOD:
        return { startTime: launchDate, endTime: booksOpen };
      case StageAdmin.BOOKS_OPEN:
        return { startTime: booksOpen, endTime: booksClose };
      case StageAdmin.BOOKS_CLOSED:
        return null;
      default:
        return null;
    }
  };

  const onFinishCountDown = () => {
    console.log("finish count");
    if (currentStage === StageAdmin.LAUNCH_DATE) {
      setCurrentStage(StageAdmin.MARKETING_PERIOD);
    } else if (currentStage === StageAdmin.MARKETING_PERIOD) {
      setCurrentStage(StageAdmin.BOOKS_OPEN);
    } else if (currentStage === StageAdmin.BOOKS_OPEN) {
      setCurrentStage(StageAdmin.BOOKS_CLOSED);
    } else if (currentStage === StageAdmin.BOOKS_CLOSED) {
      setCurrentStage(StageAdmin.ALLOCATION_SIGNING);
    }
  };

  const stageTimes = getStageTimes();

  const isHiddenInfor = useMemo(
    () => stage === StageAdmin.LAUNCH_DATE && !showAllInfor,
    [showAllInfor, stage]
  );
  return (
    <Card
      sx={{
        border: showBorder ? 1 : 0,
        borderColor: colors.divider,
        borderRadius: "2px",
      }}
      onClick={onClick}
    >
      {showBanner && (
        <CardContent
          sx={(theme) => ({
            background: theme.color["secondary-light"],
            p: 0,
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
            backgroundImage: isHiddenInfor
              ? `url('${company.placeholderBannerUrl}')`
              : `url('${company.bannerUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          })}
        >
          <Box sx={{ height: 137 }} />
        </CardContent>
      )}
      <CardContent sx={{ px: 11, py: 18.5 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Stack
            direction="row"
            spacing={2}
            width="100%"
            overflow="hidden"
            alignItems="center"
            sx={{
              gap: "8px",
            }}
          >
            <AppLogo
              src={isHiddenInfor ? "/icon/primary-icon.svg" : logoUrl}
              size={73}
              sx={{
                objectPosition: "center",
              }}
            />
            <Stack flex={1} overflow="hidden">
              <TextWithTooltip
                text={
                  <Typography level="h5" sx={{ fontFamily: "Jost" }}>
                    {isHiddenInfor ? placeHolderName : name}
                  </Typography>
                }
                tooltip={`${isHiddenInfor} ? ${placeHolderName} : ${name}`}
              />
              <TextWithTooltip
                text={
                  <Typography
                    level="body1"
                    sx={{
                      color: colors["text-secondary"],
                      maxWidth: "100%",
                    }}
                  >
                    {industry}
                  </Typography>
                }
                tooltip={`${industry}`}
              />
              <Typography
                variant="text-ellipsis"
                level="body2-500"
                sx={{
                  color: colors["text-primary"],
                  maxWidth: "100%",
                  textTransform: "uppercase",
                }}
              >
                {FUNDING_ROUNDs[fundingRound ?? 0].label}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>

      <Divider />
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <InfoItem
            label="Deal Size"
            value={dealSize}
            typeAccess={typeAccess}
            isShowInfor={!isHiddenInfor}
            maxWidth={57}
          />
          <InfoItem
            label="Valuation Pre"
            value={valuationPre}
            typeAccess={typeAccess}
            isShowInfor={!isHiddenInfor}
            maxWidth={81}
          />
          <InfoItem
            label="Offer Price"
            value={offerPrice}
            typeAccess={typeAccess}
            isShowInfor={!isHiddenInfor}
            maxWidth={67}
          />
          <InfoItem
            label="Min. Size"
            value={minimumSize}
            typeAccess={typeAccess}
            isShowInfor={!isHiddenInfor}
            maxWidth={56}
          />
        </Box>
      </CardContent>
      {showStatus && stage && stage !== StageAdmin.CLOSED && (
        <CardContent
          sx={{
            background: STATUS_DISPLAY[currentStage].background,
            borderBottomLeftRadius: 2,
            borderBottomRightRadius: 2,
            py: 12,
            px: 20,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
            }}
          >
            {STATUS_DISPLAY[currentStage].icon}
            <Typography
              level="body1"
              fontWeight={500}
              sx={{ mr: currentStage !== StageAdmin.LAUNCH_DATE ? "auto" : 0 }}
            >
              {STATUS_DISPLAY[currentStage].label}
            </Typography>
            {!stageTimes ||
            dayjs().isAfter(
              dayjs(closeDate, DateFormat["DD/MM/YYYY HH:mm:ss"])
            ) ? (
              <></>
            ) : (
              <Countdown
                startTime={stageTimes.startTime}
                endTime={stageTimes.endTime}
                onFinishCountDown={onFinishCountDown}
              />
            )}
          </Box>
        </CardContent>
      )}
    </Card>
  );
};

CardPrimaryUser.displayName = "CardPrimaryUser";
export default CardPrimaryUser;
