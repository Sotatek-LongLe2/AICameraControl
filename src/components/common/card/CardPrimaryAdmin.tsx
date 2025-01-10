import {
  Box,
  BoxProps,
  Card,
  CardContent,
  CardProps,
  Stack,
  styled,
  Typography,
} from "@mui/joy";
import React, { memo, useMemo } from "react";
import { AppLogo } from "src/components/base/AppLogo";
import { FUNDING_ROUNDs } from "src/constants/options";
import { number2USD } from "src/helpers/formatNumber";
import { IAdminPrimaryDetail } from "src/services/AdminPrimaryService.types";
import {
  getInforPrimaryByStatus,
  getStatusFromDate,
} from "src/shared/primaryStatus";
import { combineSx } from "src/shared/utils";
import { colors } from "src/styles/colors";
import theme from "src/styles/theme";
import TextWithTooltip from "../TextWithTooltip";

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
}));

interface CardPrimaryAdminProps extends CardProps {
  data?: IAdminPrimaryDetail;
  // onChangeStage?: (stage?: StageAdmin) => void;
}

interface InfoItemProps extends BoxProps {
  label: string;
  value: string;
}

const InfoItem = ({ label, value, ...props }: InfoItemProps) => (
  <Box {...props}>
    <LabelCard>{label}</LabelCard>
    <ValueCard variant="text-ellipsis" title={value}>
      {value}
    </ValueCard>
  </Box>
);

const CardPrimaryAdmin: React.FC<CardPrimaryAdminProps> = memo(
  ({ data, ...props }) => {
    const {
      logoUrl: logo,
      name,
      industry,
      dealSize,
      valuationPre,
      fundingRound,
      offerPrice,
      stage,
      minimumSize: minSize,
    } = data ?? {};

    const currentStatus = useMemo(() => {
      if (!data) return;

      const { stageDate } = getStatusFromDate(data);

      return getInforPrimaryByStatus(stage!, stageDate);
    }, [data, stage]);

    // const onEndStage = useCallback(
    //   (currentStage?: StageAdmin) => {
    //     if (!data) return;

    //     let newStage = currentStage;

    //     switch (currentStage) {
    //       case StageAdmin.LAUNCH_DATE:
    //         {
    //           newStage = StageAdmin.MARKETING_PERIOD;
    //         }
    //         break;
    //       case StageAdmin.MARKETING_PERIOD:
    //         {
    //           newStage = StageAdmin.BOOKS_OPEN;
    //         }
    //         break;
    //       case StageAdmin.BOOKS_OPEN:
    //         {
    //           newStage = StageAdmin.BOOKS_CLOSED;
    //         }
    //         break;
    //       case StageAdmin.BOOKS_CLOSED:
    //         {
    //           newStage = StageAdmin.ALLOCATION_SIGNING;
    //         }
    //         break;
    //     }

    //     setCurrentStage(newStage);
    //     onChangeStage?.(newStage);
    //   },
    //   [data, onChangeStage]
    // );

    // const stageDate = useMemo(() => {
    //   if (!currentStage || !data) return;
    //   switch (stage) {
    //     case StageAdmin.LAUNCH_DATE:
    //       return data.launchDate;
    //     case StageAdmin.MARKETING_PERIOD:
    //       return data.booksOpen;
    //     case StageAdmin.BOOKS_OPEN:
    //       return data.booksClose;
    //     case StageAdmin.BOOKS_CLOSED:
    //       return data.allocationStartDate;
    //     case StageAdmin.ALLOCATION_SIGNING:
    //       return data.closeDate;
    //   }
    // }, [currentStage, data, stage]);

    return (
      <Card
        {...props}
        sx={combineSx(
          {
            borderRadius: "2px",
            // https://jira.sotatek.com/browse/ASA-406
            minWidth: "369px",
          },
          props.sx
        )}
      >
        <CardContent
          sx={{
            padding: "18.5px 20px 18.5px 11px",
          }}
        >
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
                gap: "7px",
              }}
            >
              <AppLogo
                src={logo}
                size={73}
                sx={{
                  objectPosition: "center",
                }}
              />

              <Stack sx={{ "&&": { margin: 0 } }}>
                <Box maxWidth={258}>
                  <TextWithTooltip
                    text={<Typography level="h5">{name}</Typography>}
                    tooltip={name}
                  />
                </Box>
                <Box maxWidth={258}>
                  <TextWithTooltip
                    text={
                      <Typography
                        level="body1"
                        sx={{
                          color: colors["text-secondary"],
                        }}
                      >
                        {industry}
                      </Typography>
                    }
                    tooltip={industry}
                  />
                </Box>
                <Typography
                  level="body2"
                  variant="text-ellipsis"
                  maxWidth={258}
                  sx={{
                    textTransform: "uppercase",
                  }}
                >
                  {FUNDING_ROUNDs[fundingRound ?? 0].label}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>

        <CardContent
          sx={{
            padding: "19px 20px",
            borderTop: `1px solid ${theme.color.divider}`,
            borderBottom: `1px solid ${theme.color.divider}`,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <InfoItem
              label="Deal Size"
              value={`$${number2USD(dealSize)}`}
              maxWidth={57}
            />
            <InfoItem
              label="Valuation Pre"
              value={`$${number2USD(valuationPre)}`}
              maxWidth={81}
            />
            <InfoItem
              label="Offer Price"
              value={`$${number2USD(offerPrice)}`}
              maxWidth={67}
            />
            <InfoItem
              label="Min. Size"
              value={`$${number2USD(minSize)}`}
              maxWidth={56}
            />
          </Box>
        </CardContent>

        <CardContent sx={{ padding: "12px 20px" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" gap="3px" alignItems="center">
              {currentStatus?.Icon && <currentStatus.Icon />}
              <Typography level="body1" fontWeight="500">
                {currentStatus?.status}
              </Typography>
            </Box>

            {/* <CountDate
              date={stageDate}
              currentStage={currentStage}
              onEndStage={onEndStage}
            /> */}
          </Box>
        </CardContent>
      </Card>
    );
  }
);

CardPrimaryAdmin.displayName = "CardPrimaryAdmin";

export default CardPrimaryAdmin;
