import { Box, Card, Grid, Typography } from "@mui/joy";
import { RiFolderOpenLine } from "@remixicon/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import AccessNotificationCard from "src/components/common/AccessNotificationCard";
import IndicationCard from "src/components/common/IndicationCard";
import SecondaryFilter from "src/components/common/SecondaryFilter";
import TableCompany from "src/components/common/TableCompany";
import { SecondarySideEnum } from "src/constants/enumBE";
import PAGES from "src/constants/router";
import { UserSecondaryService } from "src/services/UserSecondaryService";
import { ISecondaryItem } from "src/services/UserSecondaryService.types";
import { useDevice } from "src/shared/hooks/useDevice";
import { useIntersectionObserver } from "src/shared/hooks/useIntersectionObserver";
import { useMedia } from "src/shared/hooks/useMedia";
import { useAppStore } from "src/store/appStore";
import {
  ISecondaryFilterParams,
  SEC_ITEM_PER_PAGE,
  useSecondaryStore,
} from "src/store/secondaryStore";
import { colors } from "src/styles/colors";

const Secondary = () => {
  const navigate = useNavigate();
  const { displayView, onNextPage, resetFilter } = useSecondaryStore();
  const { loading, setLoading } = useAppStore();
  const [hasMore, setHasMore] = useState(false);
  const { isDesktop } = useMedia();
  const { deviceLaptop } = useDevice();
  const [secondaryData, setSecondaryData] = useState<ISecondaryItem[] | null>(
    null
  );
  const [searchParams] = useSearchParams();

  const side = useMemo(
    () =>
      Number(searchParams.get("side")) === 1
        ? SecondarySideEnum.SELL
        : SecondarySideEnum.BUY,
    [searchParams]
  );

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    onNextPage();
  }, [hasMore, loading, onNextPage]);

  const { setEl } = useIntersectionObserver({ loadMore });

  const handleNavigateToSecondaryDetail = (indication: ISecondaryItem) => {
    navigate({
      pathname: PAGES.SECONDARY_DETAIL,
      search: createSearchParams({
        companyId: String(indication.companyId),
        side: String(indication.side),
      }).toString(),
    });
  };

  const handleChangeFilter = useCallback(
    async (data: ISecondaryFilterParams) => {
      try {
        setLoading(true);
        const res = await UserSecondaryService.listSecondary({
          ...data,
          side,
        });
        if (res.data.statusCode === 200) {
          setSecondaryData((prev) =>
            data.page > 1 ? [...(prev ?? []), ...res.data.data] : res.data.data
          );
          setHasMore(data.page < Math.ceil(res.data.count / SEC_ITEM_PER_PAGE));
        }
      } catch (error) {
        toast.error(String(error));
      } finally {
        setLoading(false);
      }
    },
    [setLoading, side]
  );

  useEffect(() => {
    return () => {
      resetFilter();
    };
  }, [resetFilter]);

  return (
    <div>
      <AccessNotificationCard />
      <SecondaryFilter onChangeFilter={handleChangeFilter} />
      {displayView === "list" && isDesktop ? (
        <Card sx={{ overflow: "auto" }}>
          <TableCompany data={secondaryData} loadMore={loadMore} />
        </Card>
      ) : (
        <>
          {secondaryData?.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                padding: "60px 0",
                gap: "7px",
                background: colors["paper"],
              }}
            >
              <RiFolderOpenLine size={42} />
              <Typography level="body1">No data</Typography>
            </Box>
          ) : (
            <Grid container spacing={16} sx={{ flexGrow: 1 }}>
              {(secondaryData ?? []).map((indication, index, array) => (
                <Grid
                  key={index}
                  mobile={12}
                  laptop={deviceLaptop ? 4 : 6}
                  ref={(el) => {
                    if (index !== array.length - 1) return;
                    setEl(el);
                  }}
                >
                  <IndicationCard
                    indication={indication}
                    onClick={() => handleNavigateToSecondaryDetail(indication)}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </div>
  );
};

export default Secondary;
