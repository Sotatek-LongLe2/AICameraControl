import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Stack,
  styled,
  Tab,
  tabClasses,
  TabList,
  Tabs,
  Typography,
} from "@mui/joy";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiBuilding4Line,
  RiMapPinLine,
} from "@remixicon/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import { AppLogo } from "src/components/base/AppLogo";
import AccessNotificationCard from "src/components/common/AccessNotificationCard";
import TextWithTooltip from "src/components/common/TextWithTooltip";
import {
  SecondarySideEnum,
  SecondaryStageEnum,
  SecondaryStatus,
} from "src/constants/enumBE";
import PAGES from "src/constants/router";
import {
  formatNumber,
  number2Percentage,
  number2USD,
} from "src/helpers/formatNumber";
import { UserActivityService } from "src/services/UserActivityService";
import { UserSecondaryService } from "src/services/UserSecondaryService";
import {
  ICompany,
  ISecondaryDetail,
} from "src/services/UserSecondaryService.types";
import { useMedia } from "src/shared/hooks/useMedia";
import { useAppStore } from "src/store/appStore";
import { useAuthStore } from "src/store/authStore";
import { colors } from "src/styles/colors";

const LabelCard = styled(Typography)(() => ({
  color: colors["secondary-light"],
  fontSize: "13px",
  lineHeight: "20px",
}));

const ValueCard = styled(Typography)(() => ({
  color: colors["text-primary"],
  fontSize: "15px",
  lineHeight: "22px",
  fontWeight: 500,
}));

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

interface SecondaryDetailInformationProps {
  data: ISecondaryDetail;
  userOrderId?: number;
  onNavigateToEntry: (hasAddEdit: boolean) => void;
}

const SecondaryDetailInformation: React.FC<SecondaryDetailInformationProps> = ({
  data,
  userOrderId,
  onNavigateToEntry,
}) => {
  const { isMobile } = useMedia();
  const typeAccess = useAuthStore((state) => state.typeAccess);
  const hasMakeOrBid =
    data.status !== SecondaryStatus.EXECUTED && userOrderId === undefined;
  const hasEdit =
    userOrderId !== undefined &&
    ![SecondaryStageEnum.UNDER_CONTRACTED].includes(data.stage);
  const sideBuy = data.side === SecondarySideEnum.BUY;

  return (
    <Card sx={{ width: "100%", maxWidth: 772, flexShrink: 0 }}>
      <CardContent sx={{ p: 0 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            px: 20,
            py: 16,
            flexDirection: { mobile: "column", laptop: "row" },
            alignItems: { mobile: "flex-start", laptop: "center" },
            gap: 16,
          }}
        >
          <Stack
            direction="row"
            spacing={16}
            alignItems="center"
            sx={(theme) => ({
              [theme.breakpoints.down("laptop")]: {
                width: "100%",
              },
            })}
          >
            <AppLogo src={data.companyLogo} size={isMobile ? 67 : 145} />
            <Stack
              sx={(theme) => ({
                [theme.breakpoints.down("laptop")]: {
                  width: "100%",
                  flexDirection: "row-reverse",
                  justifyContent: "space-between",
                  alignItems: "center",
                },
              })}
            >
              <Chip
                sx={(theme) => ({
                  background:
                    data.side === SecondarySideEnum.BUY
                      ? theme.color["primary-main"]
                      : theme.color["astra-pink"],
                  textTransform: "uppercase",
                  color: theme.color["text-primary"],
                  [theme.breakpoints.down("laptop")]: {
                    height: 24,
                  },
                })}
              >
                {data.side === SecondarySideEnum.BUY ? "BUY" : "SELL"}
              </Chip>
              <TextWithTooltip
                text={
                  <Typography level="h4" sx={{ fontFamily: "Jost" }}>
                    {data.companyName}
                  </Typography>
                }
                tooltip={data.companyName}
                sx={{ maxWidth: { mobile: 200, laptop: 350 } }}
              />
              <Typography
                level="h5"
                sx={(theme) => ({
                  fontFamily: "Jost",
                  color: theme.color["primary-main"],
                  [theme.breakpoints.down("laptop")]: {
                    display: "none",
                  },
                })}
              >
                {data.websiteUrl}
              </Typography>
            </Stack>
          </Stack>
          <Button
            variant="solid"
            disabled={typeAccess !== "full"}
            onClick={() => onNavigateToEntry(hasMakeOrBid || hasEdit)}
            endDecorator={<RiArrowRightLine />}
            sx={(theme) => ({
              height: 42,
              [theme.breakpoints.down("laptop")]: {
                width: "100%",
              },
            })}
          >
            {hasMakeOrBid
              ? sideBuy
                ? "Make An Offer"
                : "Bid"
              : hasEdit
              ? `Edit Your ${sideBuy ? "Offer" : "Bid"}`
              : `View Your ${sideBuy ? "Offer" : "Bid"}`}
          </Button>
        </Stack>
        <Divider />
        <Box
          sx={{
            px: { mobile: 16, laptop: 48 },
            py: { mobile: 16, laptop: 32 },
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { mobile: "column", laptop: "row" },
              gap: 24,
            }}
          >
            <Box
              sx={{ display: "flex", flex: 1, alignItems: "center", gap: 2 }}
            >
              <RiMapPinLine />
              <Typography level="body1">{data.country}</Typography>
            </Box>
            <Box
              sx={{ display: "flex", flex: 1, alignItems: "center", gap: 2 }}
            >
              <RiBuilding4Line />
              <Typography level="body1">{data.industry}</Typography>
            </Box>
          </Box>
          <Typography level="body1-500">{data.description}</Typography>
          <Grid container spacing={16}>
            <Grid mobile={4} laptop={2}>
              <InfoItem
                label="Notional"
                value={
                  data.notional
                    ? isNaN(Number(data.notional))
                      ? data.notional
                      : `$${number2USD(Number(data.notional))}`
                    : ""
                }
                typeAccess={typeAccess}
              />
            </Grid>
            <Grid mobile={4} laptop={2}>
              <InfoItem
                label="Share Price"
                value={
                  data.sharePrice
                    ? isNaN(Number(data.sharePrice))
                      ? data.sharePrice
                      : `$${number2USD(Number(data.sharePrice))}`
                    : ""
                }
                typeAccess={typeAccess}
              />
            </Grid>
            <Grid mobile={4} laptop={2}>
              <InfoItem
                label="VS LRV"
                value={
                  data.vsLRV !== "0"
                    ? `${formatNumber(Number(data.vsLRV), false, 1)}%`
                    : "0%"
                }
                typeAccess={typeAccess}
              />
            </Grid>
            <Grid mobile={4} laptop={2}>
              <InfoItem
                label="Valuation"
                value={
                  data.valuation
                    ? isNaN(Number(data.valuation))
                      ? data.valuation
                      : `$${number2USD(Number(data.valuation))}`
                    : ""
                }
                typeAccess={typeAccess}
              />
            </Grid>
            <Grid mobile={4} laptop={2}>
              <InfoItem
                label="Fee"
                value={
                  data.fee
                    ? ` ${
                        typeAccess === "full"
                          ? number2Percentage(data.fee)
                          : data.fee
                      }`
                    : ""
                }
                typeAccess={typeAccess}
              />
            </Grid>
            <Grid mobile={4} laptop={2}>
              <InfoItem
                label="Min. Size"
                value={
                  data.minSize
                    ? isNaN(Number(data.minSize))
                      ? data.minSize
                      : `$${number2USD(Number(data.minSize))}`
                    : ""
                }
                typeAccess={typeAccess}
              />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

const SecondaryDetailPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const side = searchParams.get("side");
  const [listCompanies, setListCompanies] = useState<ICompany[]>([]);
  const [secondaryDetail, setSecondaryDetail] = useState<ISecondaryDetail>();
  const { setLoading } = useAppStore();
  const [userOrderId, setUserOrderId] = useState<number>();
  const companyId = useMemo(
    () => Number(searchParams.get("companyId")),
    [searchParams]
  );
  const tabsRef = useRef<Map<number, HTMLElement | null>>(new Map());
  const typeAccess = useAuthStore((state) => state.typeAccess);

  const saveUserActivity = useCallback(async () => {
    try {
      if (!companyId || !side) return;
      await UserActivityService.accessCompany({
        companyId,
      });
    } catch (error) {
      toast.error(String(error));
    }
  }, [companyId, side]);

  const handleNavigateToSecondaryEntry = (hasEdit: boolean) => {
    if (!companyId && !side) return;
    if (hasEdit) {
      navigate({
        pathname: PAGES.SECONDARY_ENTRY,
        search: createSearchParams({
          companyId: String(companyId),
          side: String(side),
        }).toString(),
      });
    } else {
      // TODO: View bid/offer user account
      navigate(PAGES.BIDS_AND_OFFERS.INDEX);
    }
  };

  const fetchAllDetail = useCallback(async () => {
    if (!side) return;
    try {
      setLoading(true);
      // get companies and secondary
      const [{ data: listCompaniesData }, secondaryRes] = await Promise.all([
        UserSecondaryService.listCompanies({
          page: 1,
          limit: 1000,
          side: side === "0" ? SecondarySideEnum.BUY : SecondarySideEnum.SELL,
        }),
        UserSecondaryService.getDetail({
          side: side === "0" ? SecondarySideEnum.BUY : SecondarySideEnum.SELL,
          companyId,
        }),
      ]);

      setListCompanies(listCompaniesData.data);

      if (secondaryRes.data.statusCode === 200) {
        const secondaryData = secondaryRes.data.data;
        setSecondaryDetail(secondaryData);

        // get user order
        if (typeAccess === "full") {
          const orderRes = await UserSecondaryService.getOrder({
            secondaryId: secondaryData.id,
          });

          if (orderRes.data.statusCode === 200) {
            setUserOrderId(orderRes.data.data.id);
          } else {
            setUserOrderId(undefined);
          }
        }
      }
    } catch (error) {
      console.log("error", error);
      setUserOrderId(undefined);
    } finally {
      setLoading(false);
    }
  }, [companyId, setLoading, side, typeAccess]);

  useEffect(() => {
    fetchAllDetail();
  }, [fetchAllDetail]);

  useEffect(() => {
    saveUserActivity();
  }, [saveUserActivity]);

  useEffect(() => {
    const activeTab = tabsRef.current.get(companyId);
    if (activeTab) {
      activeTab.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [companyId, listCompanies]);

  if (!secondaryDetail) return <></>;

  return (
    <>
      <AccessNotificationCard />
      <Box
        sx={{
          display: "flex",
          justifyContent: { laptop: "center" },
          flexDirection: { mobile: "column", laptop: "row" },
        }}
      >
        <Box flex={1} overflow="hidden">
          <Box>
            <Link
              onClick={(e) => {
                e.preventDefault();
                navigate({
                  pathname: PAGES.SECONDARY,
                  search: createSearchParams({
                    side: String(side || 0),
                  }).toString(),
                });
              }}
              sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                color: theme.color["primary-main"],
                gap: 4,
                fontSize: 17,
                fontFamily: "Jost",
                fontWeight: 500,
                mb: 24,
              })}
            >
              <RiArrowLeftLine />
              Back To List
            </Link>
            <Tabs
              orientation="vertical"
              value={companyId}
              onChange={(_, value) => {
                navigate({
                  pathname: PAGES.SECONDARY_DETAIL,
                  search: createSearchParams({
                    companyId: String(value),
                    side: String(secondaryDetail.side),
                  }).toString(),
                });
              }}
              sx={(theme) => ({
                background: "transparent",
                maxHeight: 360,
                [theme.breakpoints.down("laptop")]: {
                  display: "none",
                },
              })}
            >
              <TabList
                disableUnderline
                sx={(theme) => ({
                  flex: 1,
                  overflow: "auto",
                  scrollSnapType: "x mandatory",
                  "&::-webkit-scrollbar": { display: "none" },
                  [`&& .${tabClasses.root}`]: {
                    bgcolor: "transparent",
                    "&:hover": {
                      bgcolor: "transparent",
                    },
                    [`&.${tabClasses.selected}`]: {
                      color: theme.color["primary-main"],
                      "*": {
                        color: theme.color["primary-main"],
                      },
                    },
                  },
                })}
              >
                {listCompanies.map((company) => (
                  <Tab
                    key={company.companyId}
                    sx={{
                      justifyContent: "flex-end",
                    }}
                    value={company.companyId}
                    title={company.companyName}
                    ref={(el) => tabsRef.current.set(company.companyId, el)}
                  >
                    <Typography variant="text-ellipsis" level="body1-500">
                      {company.companyName}
                    </Typography>
                  </Tab>
                ))}
              </TabList>
            </Tabs>
          </Box>
        </Box>
        <SecondaryDetailInformation
          data={secondaryDetail}
          userOrderId={userOrderId}
          onNavigateToEntry={handleNavigateToSecondaryEntry}
        />
        <Box display={{ mobile: "none", laptop: "block" }} flex={1} />
      </Box>
    </>
  );
};

export default SecondaryDetailPage;
