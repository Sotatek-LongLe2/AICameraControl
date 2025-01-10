import {
  Box,
  Button,
  List,
  ListItem,
  Step,
  stepClasses,
  StepIndicator,
  stepIndicatorClasses,
  Stepper,
  Tab,
  tabClasses,
  TabList,
  TabPanel,
  Tabs,
  Typography,
} from "@mui/joy";
import { RiArrowRightLine, RiNotificationLine } from "@remixicon/react";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AccessNotificationCard from "src/components/common/AccessNotificationCard";
import CardPrimaryUser from "src/components/common/card/CardPrimaryUser";
import { DateFormat } from "src/constants/enum";
import { PrimaryTab, StageAdmin } from "src/constants/enumBE";
import PAGES from "src/constants/router";
import { UserActivityService } from "src/services/UserActivityService";
import { UserPrimaryService } from "src/services/UserPrimaryService";
import { IDoc, IPrimaryItem } from "src/services/UserPrimaryService.types";
import { useAppStore } from "src/store/appStore";
import { AuthState, useAuthStore } from "src/store/authStore";
import { colors } from "src/styles/colors";
import { downloadFileFromBlob } from "src/utils/files";

const stages = [
  {
    label: "Launch",
    time: "launchDate",
    stage: StageAdmin.LAUNCH_DATE,
  },
  {
    label: "Books Open",
    time: "booksOpen",
    stage: StageAdmin.BOOKS_OPEN,
  },
  {
    label: "Books Close",
    time: "booksClose",
    stage: StageAdmin.BOOKS_CLOSED,
  },
  {
    label: "Allocation",
    time: "allocationStartDate",
    stage: StageAdmin.ALLOCATION_SIGNING,
  },
  {
    label: "Closing",
    time: "closeDate",
    stage: StageAdmin.ALLOCATION_SIGNING,
  },
];

const PrimaryItem = ({
  company,
  showAllInfor,
}: {
  company: IPrimaryItem;
  showAllInfor?: boolean;
}) => (
  <Box
    sx={(theme) => ({
      display: "flex",
      justifyContent: "flex-end",
      background: theme.color["secondary-light"],
      p: { mobile: 0, laptop: 32 },
      borderRadius: 2,
      backgroundImage: `url('${company.bannerUrl}')`,
      minHeight: { laptop: "304px" },
      alignItems: "center",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    })}
  >
    <Box sx={{ width: { mobile: "100%", laptop: 369 } }}>
      <CardPrimaryUser
        company={company}
        showStatus
        showAllInfor={showAllInfor}
      />
    </Box>
  </Box>
);

const PrimaryDetail = () => {
  const { companyID } = useParams();
  const navigate = useNavigate();
  const typeAccess = useAuthStore((state) => state.typeAccess);
  const setLoading = useAppStore((state) => state.setLoading);
  const [primaryDetail, setPrimaryDetail] = useState<IPrimaryItem>();
  const [isPlaceDemand, setIsPlaceDemand] = useState(false);
  const [statusTrack, setStatusTrack] = useState(false);
  const [loadingTrack, setLoadingTrack] = useState(false);

  const handleTrackPrimary = useCallback(async () => {
    if (!companyID) return;
    try {
      setLoadingTrack(true);
      const res = await UserPrimaryService.trackPrimary(
        Number(companyID),
        !statusTrack
      );
      if (res.data.statusCode === 201) {
        setStatusTrack(!statusTrack);
        toast.success(
          !statusTrack ? "Track successfully" : "Untrack successfully"
        );
      }
    } catch (error) {
      toast.error(String(error));
    } finally {
      setLoadingTrack(false);
    }
  }, [companyID, setLoadingTrack, statusTrack]);

  const handleNavigateToPlaceDemand = () => {
    if (!companyID) return;
    if (isPlaceDemand && primaryDetail?.stage !== StageAdmin.BOOKS_OPEN) {
      navigate(PAGES.YOUR_DEMANDS.INDEX);
      return;
    }
    navigate(
      generatePath(PAGES.PRIMARY_PLACE_DEMAND, {
        companyID,
      })
    );
  };

  useEffect(() => {
    const fetchPrimaryDetail = async () => {
      try {
        if (!companyID) return;
        setLoading(true);
        const res = await UserPrimaryService.getOrderDetail(Number(companyID));
        if (res.data.statusCode === 200) {
          setPrimaryDetail(res.data.data);
        }
        const watchRes = await UserPrimaryService.getWatchPrimaryByPrimaryId(
          Number(companyID)
        );
        if (watchRes.data.statusCode === 200) {
          setStatusTrack(watchRes.data.data.isWatching);
        }
        if (typeAccess === "full") {
          const orderRes = await UserPrimaryService.getOrderByPrimaryId(
            Number(companyID)
          );
          if (orderRes.data.data.order?.id) {
            setIsPlaceDemand(true);
          }
        }
      } catch (error) {
        toast.error(String(error));
      } finally {
        setLoading(false);
      }
    };

    fetchPrimaryDetail();
  }, [companyID, setLoading, typeAccess]);

  return (
    <>
      <AccessNotificationCard />
      <PrimaryDetailCore
        isPlaceDemand={isPlaceDemand}
        onClickDemand={handleNavigateToPlaceDemand}
        typeAccess={typeAccess}
        onClickWatch={handleTrackPrimary}
        primaryDetail={primaryDetail}
        statusTrack={statusTrack}
        loadingTrack={loadingTrack}
      />
    </>
  );
};

export interface IPrimaryDetail extends Omit<IPrimaryItem, "docs"> {
  docs: { fullPath: string; filePath: string }[] | string;
}

interface PrimaryDetailCoreProps {
  primaryDetail?: IPrimaryItem;
  typeAccess: AuthState["typeAccess"];
  onClickDemand?: () => void;
  onClickWatch?: () => void;
  isPlaceDemand: boolean;
  showAllInfor?: boolean;
  isPreview?: boolean;
  statusTrack?: boolean;
  loadingTrack?: boolean;
}

const PrimaryDetailCore = ({
  primaryDetail,
  typeAccess,
  isPlaceDemand,
  onClickDemand,
  onClickWatch,
  showAllInfor,
  isPreview,
  statusTrack,
  loadingTrack,
}: PrimaryDetailCoreProps) => {
  const [selectedTab, setSelectedTab] = useState<PrimaryTab>(
    PrimaryTab.INTRODUCTION
  );

  const saveUserActivity = useCallback(async () => {
    try {
      if (!primaryDetail) return;
      await UserActivityService.accessPrimary({
        tabName: selectedTab,
        primaryId: primaryDetail.id,
      });
    } catch (error) {
      toast.error(String(error));
    }
  }, [primaryDetail, selectedTab]);

  const currentStage = useMemo(() => {
    const isGoingLive =
      primaryDetail?.launchDate && dayjs().isBefore(primaryDetail?.launchDate);
    if (isGoingLive) return -1;

    // stage null means it was closed
    if (!primaryDetail?.stage || primaryDetail.stage === StageAdmin.CLOSED)
      return 5;

    if (primaryDetail.stage === StageAdmin.MARKETING_PERIOD) return 0;

    return stages.findIndex((item) => item.stage === primaryDetail.stage);
  }, [primaryDetail?.launchDate, primaryDetail?.stage]);

  const isAbleToPlaceDemand = useMemo(() => {
    if (typeAccess !== "full") {
      return false;
    } else {
      if (!isPlaceDemand && primaryDetail?.stage !== StageAdmin.BOOKS_OPEN) {
        return false;
      }
    }
    return true;
  }, [isPlaceDemand, primaryDetail, typeAccess]);

  const handleDownload = useCallback(
    async (doc: IDoc) => {
      if (isPreview) return;

      try {
        const res = await UserPrimaryService.getDocument(
          { id: Number(doc.id) },
          { responseType: "blob" }
        );

        downloadFileFromBlob(res.data, doc.fileName);
      } catch (e) {
        toast.error(String(e));
      }
    },
    [isPreview]
  );

  useEffect(() => {
    if (isPreview) return;

    saveUserActivity();
  }, [isPreview, saveUserActivity]);

  return (
    <>
      {primaryDetail && (
        <Box>
          <PrimaryItem company={primaryDetail} showAllInfor={showAllInfor} />
          <Box
            sx={(theme) => ({
              p: { mobile: 0, laptop: 30 },
              background: theme.color.paper,
            })}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                flexDirection: { mobile: "column-reverse", laptop: "row" },
                gap: { mobile: 32, laptop: 10 },
                justifyContent: "space-between",
                alignItems: { mobile: "flex-start", laptop: "center" },
                py: { mobile: 24, laptop: 0 },
              }}
            >
              <Box
                sx={{
                  flex: 2,
                  width: "100%",
                  maxWidth: 720,
                  overflowX: { mobile: "auto", laptop: "visible" },
                  "&::-webkit-scrollbar": { display: "none" },
                }}
              >
                <Stepper
                  sx={(theme) => ({
                    width: 720,
                    "--Stepper-verticalGap": "20px",
                    "--StepIndicator-size": "20px",
                    "--Step-gap": "10px",
                    "--Step-connectorInset": "8px",
                    "--Step-connectorRadius": "20px",
                    "--Step-connectorThickness": "3px",
                    "--Step-connectorBg": colors["primary-opacity-light"],
                    [`& .${stepClasses.active}`]: {
                      [`& .${stepIndicatorClasses.root}`]: {
                        border: `5px solid ${theme.color["primary-main"]}`,
                      },
                    },
                    [`& .${stepClasses.completed}`]: {
                      [`& .${stepIndicatorClasses.root}`]: {
                        border: `5px solid ${theme.color["primary-main"]}`,
                      },
                      "&::after": { bgcolor: theme.color["primary-main"] },
                    },
                    [`& .${stepIndicatorClasses.root}`]: {
                      border: `3px solid ${colors["primary-opacity-light"]}`,
                    },
                  })}
                >
                  {stages.map((item, index) => (
                    <Step
                      key={index}
                      active={currentStage === index}
                      completed={currentStage > index}
                      indicator={<StepIndicator />}
                    >
                      <Box>
                        <Typography level="body1" fontWeight={500}>
                          {item.label}
                        </Typography>
                        <Typography level="body2">
                          {dayjs(
                            primaryDetail[
                              item.time as keyof IPrimaryItem
                            ] as string
                          ).format(DateFormat["MMM. DD, YYYY"])}
                        </Typography>
                      </Box>
                    </Step>
                  ))}
                </Stepper>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { mobile: "column", laptop: "row" },
                  gap: 16,
                  flex: 1,
                  width: "100%",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={onClickWatch}
                  startDecorator={<RiNotificationLine />}
                  disabled={typeAccess === "partial" || !onClickWatch}
                  loading={loadingTrack}
                  sx={(theme) => ({
                    flex: 1,
                    border: 0,
                    background: theme.color["primary-opacity-light"],
                    color: theme.color["primary-main"],
                    maxWidth: { mobile: "100%", laptop: "auto", pc: "177px" },
                  })}
                >
                  {statusTrack ? "Untrack" : "Track"}
                </Button>
                <Button
                  type="submit"
                  variant="solid"
                  disabled={
                    typeAccess !== "full" ||
                    !isAbleToPlaceDemand ||
                    !onClickDemand
                  }
                  onClick={onClickDemand}
                  endDecorator={<RiArrowRightLine />}
                  sx={{ width: { mobile: "100%", laptop: "auto" }, height: 42 }}
                >
                  {isPlaceDemand
                    ? primaryDetail.stage === StageAdmin.BOOKS_OPEN
                      ? "Amend Detail"
                      : isAbleToPlaceDemand
                      ? "View Demand"
                      : "Place Demand"
                    : "Place Demand"}
                </Button>
              </Box>
            </Box>
          </Box>
          <Box
            sx={(theme) => ({
              background: theme.color.paper,
              px: { mobile: 0, laptop: 30 },
              borderRadius: "4px",
              overflow: "hidden",
            })}
          >
            <Tabs
              aria-label="Pipeline"
              value={selectedTab}
              onChange={(_, value) => setSelectedTab(value as PrimaryTab)}
              sx={(theme) => ({
                background: theme.color.paper,
                maxWidth: "680px",
              })}
            >
              <TabList
                sx={(theme) => ({
                  pt: 1,
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
                    },
                  },
                })}
              >
                <Tab
                  value={PrimaryTab.INTRODUCTION}
                  sx={{
                    flex: "none",
                    scrollSnapAlign: "start",
                    fontSize: 17,
                    lineHeight: "26px",
                    fontFamily: "Jost",
                    fontWeight: 500,
                  }}
                >
                  Introduction
                </Tab>
                <Tab
                  value={PrimaryTab.SOLUTION}
                  sx={{
                    flex: "none",
                    scrollSnapAlign: "start",
                    fontSize: 17,
                    lineHeight: "26px",
                    fontFamily: "Jost",
                    fontWeight: 500,
                  }}
                >
                  Solution
                </Tab>
                <Tab
                  value={PrimaryTab.DEAL_TERMS}
                  disabled={typeAccess !== "full"}
                  sx={(theme) => ({
                    flex: "none",
                    scrollSnapAlign: "start",
                    fontSize: 17,
                    lineHeight: "26px",
                    fontFamily: "Jost",
                    fontWeight: 500,
                    "&.Mui-disabled": {
                      color: theme.color["text-disabled"],
                    },
                  })}
                >
                  Deal Terms
                </Tab>
                <Tab
                  value={PrimaryTab.DATAROOM}
                  disabled={typeAccess !== "full"}
                  sx={(theme) => ({
                    flex: "none",
                    scrollSnapAlign: "start",
                    fontSize: 17,
                    lineHeight: "26px",
                    fontFamily: "Jost",
                    fontWeight: 500,
                    "&.Mui-disabled": {
                      color: theme.color["text-disabled"],
                    },
                  })}
                >
                  Dataroom
                </Tab>
              </TabList>
              <Box
                sx={(theme) => ({
                  background: theme.color.paper,
                })}
              >
                <TabPanel value={PrimaryTab.INTRODUCTION}>
                  <Box
                    sx={(theme) => ({
                      ...theme.typography.body1,
                      color: theme.color["text-primary"],
                    })}
                    dangerouslySetInnerHTML={{
                      __html: primaryDetail.introduction ?? "",
                    }}
                  />
                </TabPanel>
                <TabPanel value={PrimaryTab.SOLUTION}>
                  <Box
                    sx={(theme) => ({
                      ...theme.typography.body1,
                      color: theme.color["text-primary"],
                    })}
                    dangerouslySetInnerHTML={{
                      __html: primaryDetail.solution ?? "",
                    }}
                  />
                </TabPanel>
                <TabPanel value={PrimaryTab.DEAL_TERMS}>
                  {typeof primaryDetail.dealTerms === "string" ? (
                    <Typography level="body1">
                      {primaryDetail.dealTerms}
                    </Typography>
                  ) : (
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 12 }}
                    >
                      {primaryDetail.dealTerms?.map((item) => (
                        <Box key={item.index}>
                          <Typography
                            fontSize={13}
                            sx={(theme) => ({
                              color: theme.color["secondary-light"],
                            })}
                          >
                            {item.name}
                          </Typography>
                          <Typography level="body1" fontWeight={500}>
                            {item.value}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  )}
                </TabPanel>
                <TabPanel value={PrimaryTab.DATAROOM}>
                  {typeof primaryDetail.docs === "string" ? (
                    <Typography level="body1">{primaryDetail.docs}</Typography>
                  ) : (
                    <List marker="decimal">
                      {primaryDetail.docs.map((item, index) => (
                        <ListItem
                          key={index}
                          sx={{ color: colors["primary-main"] }}
                        >
                          <Typography
                            level="body1"
                            variant="text-ellipsis"
                            fontWeight={500}
                            sx={{
                              fontFamily: "Jost",
                              cursor: isPreview ? "default" : "pointer",
                            }}
                            onClick={() => handleDownload(item)}
                            color="primary-main"
                          >
                            {item.fileName ?? item.filePath}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  )}
                </TabPanel>
              </Box>
            </Tabs>
          </Box>
        </Box>
      )}
    </>
  );
};

PrimaryDetail.Core = PrimaryDetailCore;

export default PrimaryDetail;
