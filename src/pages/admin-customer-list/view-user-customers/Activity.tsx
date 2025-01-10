import { Box, Typography } from "@mui/joy";
import { RiBarChart2Line, RiTimer2Line, RiUser3Line } from "@remixicon/react";
import { AppLogo } from "src/components/base/AppLogo";
import { colors } from "src/styles/colors";
import ActivityItem from "./ActivityItem";
import { useCallback, useEffect, useRef, useState } from "react";
import { AdminUsersCustomersService } from "src/services/AdminUsersCustomersService";
import { useAppStore } from "src/store/appStore";
import { useParams } from "react-router-dom";
import {
  IItemTimeline,
  IMostlyViewItem,
  IUserOverview,
} from "src/services/AdminUsersCustomersService.type";
import TextWithTooltip from "src/components/common/TextWithTooltip";
import { toast } from "react-toastify";

const ITEM_PER_PAGE = 20;

const ActivityPage = () => {
  const params = useParams();
  const id = Number(params.id);
  const isLoading = useAppStore((state) => state.loading);
  const setLoading = useAppStore((state) => state.setLoading);

  const [dataTimeline, setDataTimeline] = useState<IItemTimeline[]>([]);
  const [mostlyView, setMostlyView] = useState<IMostlyViewItem[]>([]);
  const [userOverview, setUserOverview] = useState<IUserOverview>();

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const isDataLoading = useRef(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const fetchTimeline = useCallback(
    async (currentPage?: number) => {
      if (isDataLoading.current) return;
      try {
        isDataLoading.current = true;
        setLoading(true);
        const res = await AdminUsersCustomersService.getTimeline({
          page: currentPage || 1,
          limit: ITEM_PER_PAGE,
          userId: id,
        });
        if (res.data.statusCode === 200) {
          setDataTimeline((prev) =>
            currentPage === 1 ? res.data.data : [...prev, ...res.data.data]
          );
          setHasMore(res.data.data.length >= ITEM_PER_PAGE);
        }
      } catch (error) {
        toast.error(String(error));
      } finally {
        setLoading(false);
        isDataLoading.current = false;
      }
    },
    [id, setLoading]
  );

  const fetchUserOverview = useCallback(async () => {
    try {
      const res = await AdminUsersCustomersService.getUserOverview({
        userId: id,
      });
      if (res.data.statusCode === 200) {
        setMostlyView(res.data.data.mostlyView);
        setUserOverview(res.data.data.userOverview);
      }
    } catch (error) {
      toast.error(String(error));
    }
  }, [id]);

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    setPage((prevPage) => prevPage + 1);
  }, [hasMore, isLoading]);

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollHeight - scrollTop - clientHeight < 20) {
      loadMore();
    }
  }, [loadMore]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    fetchTimeline(page);
  }, [fetchTimeline, page]);

  useEffect(() => {
    fetchUserOverview();
  }, [fetchUserOverview]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 24,
        width: "100%",
      }}
    >
      <Box
        sx={{
          backgroundColor: colors["paper"],
          borderRadius: "6px",
          padding: 20,
          minWidth: "577px",
          maxHeight: "564px",
          flex: 1,
          position: "relative",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <RiTimer2Line />
          <Typography level="h5" color="text-primary">
            Activity Timeline
          </Typography>
        </Box>
        <Box mt={20}>
          {dataTimeline.length > 0 ? (
            <Box
              ref={scrollContainerRef}
              sx={{
                maxHeight: "480px",
                overflowY: "auto",
                paddingRight: "10px",
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: colors["divider"],
                  borderRadius: "6px",
                },
              }}
            >
              {dataTimeline.map((item) => (
                <ActivityItem key={item.id} data={item} />
              ))}
            </Box>
          ) : (
            <Typography
              level="h5"
              color="text-primary"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                left: 0,
                right: 0,
                top: "50%",
              }}
            >
              No data
            </Typography>
          )}
        </Box>
      </Box>
      <Box sx={{ minWidth: "371px" }}>
        <Box
          sx={{
            backgroundColor: colors["paper"],
            borderRadius: "6px",
            height: "354px",
            position: "relative",
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", gap: "16px", p: 20 }}
          >
            <RiBarChart2Line />
            <Typography level="h5" color="text-primary">
              Mostly Viewed
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              p: "0 20px 20px 12px",
              flex: 1,
              width: "100%",
            }}
          >
            {mostlyView.length > 0 ? (
              <>
                {mostlyView.map((item) => (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      width: "336px",
                    }}
                  >
                    <AppLogo size={39} src={item?.logoUrl} />
                    <TextWithTooltip
                      text={
                        <Typography variant="text-ellipsis">
                          <Typography level="h5" color="text-primary">
                            {item.name}
                          </Typography>{" "}
                          <Typography level="body2" color="text-secondary">
                            {item.country || ""}
                            {item.country ? "," : ""} {item.industry || ""}
                          </Typography>
                        </Typography>
                      }
                      tooltip={`${item.name} ${item.country || ""} ${
                        item.country ? "," : ""
                      } ${item.industry || ""}`}
                    />
                  </Box>
                ))}
              </>
            ) : (
              <Typography
                level="h5"
                color="text-primary"
                sx={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: "50%",
                }}
              >
                No data
              </Typography>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: colors["paper"],
            borderRadius: "6px",
            padding: 20,
            mt: 24,
            height: "186px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <RiUser3Line />
            <Typography level="h5" color="text-primary">
              User Overview
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              mt: 20,
            }}
          >
            <Typography level="body1-500" color="text-secondary">
              Indications created: {userOverview?.sumIndicationCreated}
            </Typography>
            <Typography level="body1-500" color="text-secondary">
              Demands: {userOverview?.demand}
            </Typography>
            <Typography level="body1-500" color="text-secondary">
              Bids & Offers: {userOverview?.sumBidAndOffer}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ActivityPage;
