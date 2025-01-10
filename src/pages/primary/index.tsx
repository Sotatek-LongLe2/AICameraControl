import { Box, Divider, Grid, Stack } from "@mui/joy";
import { useCallback, useEffect, useRef, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AppSection from "src/components/base/AppSection";
import AccessNotificationCard from "src/components/common/AccessNotificationCard";
import CardPrimaryUser from "src/components/common/card/CardPrimaryUser";
import { StageAdmin } from "src/constants/enumBE";
import PAGES from "src/constants/router";
import { UserPrimaryService } from "src/services/UserPrimaryService";
import {
  IPrimaryItem,
  IPrimaryListType1Res,
} from "src/services/UserPrimaryService.types";
import { useDevice } from "src/shared/hooks/useDevice";
import { useIntersectionObserver } from "src/shared/hooks/useIntersectionObserver";
import { useAppStore } from "src/store/appStore";

const ITEM_PER_PAGE = 12;

const PrimaryItem = ({
  company,
  onClick,
}: {
  company: IPrimaryItem;
  onClick?: () => void;
}) => (
  <Box
    sx={(theme) => ({
      display: "flex",
      justifyContent: "flex-end",
      background: theme.color["secondary-light"],
      p: { mobile: 0, laptop: 24 },
      borderRadius: 2,
      backgroundImage:
        company.stage === StageAdmin.LAUNCH_DATE
          ? `url('${company.placeholderBannerUrl}')`
          : `url('${company.bannerUrl}')`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
      cursor: onClick ? "pointer" : "inherit",
    })}
    onClick={onClick}
  >
    <Box
      sx={{
        width: { mobile: "100%", laptop: 369 },
      }}
    >
      <CardPrimaryUser company={company} showStatus />
    </Box>
  </Box>
);

const Primary = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef<HTMLDivElement | null>(null);
  const [onGoingPrimaryItems, setOnGoingPrimaryItems] = useState<
    IPrimaryItem[]
  >([]);
  const [comingNextPrimaryItems, setComingNextPrimaryItems] = useState<
    IPrimaryItem[]
  >([]);
  const [pastCampaignPrimaryItems, setPastCampaignPrimaryItems] = useState<
    IPrimaryItem[]
  >([]);
  const { setLoading } = useAppStore();
  const { deviceLaptop } = useDevice();

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setPage((prev) => prev + 1);
  }, [hasMore, isLoading]);

  const { setEl } = useIntersectionObserver({ loadMore });

  const handleNavigateToPrimaryDetail = (companyID: number) => {
    navigate(
      generatePath(PAGES.PRIMARY.DETAIL, {
        companyID: String(companyID),
      })
    );
  };

  useEffect(() => {
    const fetchOnGoingAndComingNextPrimary = async () => {
      try {
        setLoading(true);
        const res = await UserPrimaryService.listUserPrimaryOrders({ type: 0 });
        if (res.data.statusCode === 200) {
          setOnGoingPrimaryItems(
            (res.data.data as IPrimaryListType1Res).onGoing
          );
          setComingNextPrimaryItems(
            (res.data.data as IPrimaryListType1Res).commingNext
          );
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOnGoingAndComingNextPrimary();
  }, [setLoading]);

  useEffect(() => {
    const fetchPastCampaignPrimary = async () => {
      try {
        const res = await UserPrimaryService.listUserPrimaryOrders({
          type: 1,
          page,
          limit: ITEM_PER_PAGE,
        });
        if (res.data.statusCode === 200) {
          setPastCampaignPrimaryItems((prev) => {
            if (page === 1) {
              return res.data.data as IPrimaryItem[];
            } else {
              return [...prev, ...(res.data.data as IPrimaryItem[])];
            }
          });
          if (res.data.count) {
            setHasMore(page < Math.ceil(res.data.count / ITEM_PER_PAGE));
          }
        }
      } catch (error) {
        toast.error(String(error));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPastCampaignPrimary();
  }, [page]);

  return (
    <>
      <AccessNotificationCard />
      {onGoingPrimaryItems.length > 0 && (
        <AppSection
          title="On Going"
          sectionStyle={{ mb: 24 }}
          titleStyle={{ mb: 24, fontSize: 24 }}
        >
          <Stack spacing={24}>
            {onGoingPrimaryItems.map((item, index) => (
              <PrimaryItem
                key={index}
                company={item}
                onClick={() => handleNavigateToPrimaryDetail(item.id)}
              />
            ))}
          </Stack>
        </AppSection>
      )}

      {comingNextPrimaryItems.length > 0 && (
        <>
          <AppSection
            title="Coming Next"
            sectionStyle={{ mb: 46 }}
            titleStyle={{ mb: 24, fontSize: 24 }}
          >
            <Stack spacing={24}>
              {comingNextPrimaryItems.map((item, index) => (
                <PrimaryItem key={index} company={item} />
              ))}
            </Stack>
          </AppSection>
        </>
      )}

      {pastCampaignPrimaryItems.length > 0 && (
        <>
          <Divider />
          <AppSection
            title="Past Campaigns"
            sectionStyle={{ mb: 24 }}
            titleStyle={{ my: 24, fontSize: 24 }}
          >
            <Grid container spacing={16}>
              {pastCampaignPrimaryItems.map((item, index, array) => (
                <Grid
                  key={index}
                  mobile={12}
                  laptop={deviceLaptop ? 4 : 6}
                  ref={(el) => {
                    if (index !== array.length - 1) return;
                    setEl(el);
                  }}
                >
                  <Box key={index} sx={{ cursor: "pointer" }}>
                    <CardPrimaryUser
                      company={item}
                      showBanner
                      onClick={() => handleNavigateToPrimaryDetail(item.id)}
                    />
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Box ref={loader} sx={{ mt: 20, textAlign: "center" }}>
              {isLoading && "Loading more items..."}
            </Box>
          </AppSection>
        </>
      )}
    </>
  );
};

export default Primary;
