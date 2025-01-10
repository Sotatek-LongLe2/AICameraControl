import {
  Box,
  Button,
  Card,
  IconButton,
  Option,
  Select,
  SelectStaticProps,
  Typography,
} from "@mui/joy";
import { AppSearchBox } from "src/components/base/AppSearchBox";
import { colors } from "src/styles/colors";
import { number2USD } from "src/helpers/formatNumber";
import {
  RiCloseLine,
  RiArrowRightLine,
  RiFolderOpenLine,
  RiNotificationLine,
  RiNotificationOffLine,
} from "@remixicon/react";
import AppTable, { IColumn } from "src/components/base/AppTable";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ICountryItem,
  IIndustryItem,
  IReqGetWatchlist,
  IWatchlistItem,
} from "src/services/WatchlistService.types";
import { useAppStore } from "src/store/appStore";
import { useDebounceValue } from "usehooks-ts";
import dayjs from "dayjs";
import useWatchlist from "src/shared/hooks/useWatch";
import { WatchlistService } from "src/services/WatchlistService";
import { useMedia } from "src/shared/hooks/useMedia";
import { AppLogo } from "src/components/base/AppLogo";
import TextWithTooltip from "src/components/common/TextWithTooltip";

const ButtonWatch = ({
  id,
  onSuccess,
  isMobile,
}: {
  id: number;
  onSuccess: () => void;
  isMobile?: boolean;
}) => {
  const { changeWatchlist, isLoading } = useWatchlist({
    id,
    defaultValue: false,
    onSuccess,
  });
  return (
    <Button
      variant="soft"
      startDecorator={<RiNotificationLine />}
      onClick={() => changeWatchlist(true)}
      loading={isLoading}
      sx={{
        ...(isMobile && {
          maxWidth: "48px",
          height: "36px",
          "& > span": {
            marginRight: "0 !important",
          },
        }),
      }}
    >
      {isMobile ? "" : "Watch"}
    </Button>
  );
};

const ButtonStopWatch = ({
  id,
  onSuccess,
  isMobile,
}: {
  id: number;
  onSuccess: () => void;
  isMobile?: boolean;
}) => {
  const { changeWatchlist, isLoading } = useWatchlist({
    id,
    defaultValue: false,
    onSuccess,
  });
  return (
    <Button
      variant="outlined"
      color="error-main"
      size="md"
      startDecorator={
        <RiNotificationOffLine size={16} color={colors["astra-pink"]} />
      }
      onClick={() => changeWatchlist(false)}
      loading={isLoading}
      sx={{
        whiteSpace: "nowrap",
        maxWidth: "153px",
        ...(isMobile && {
          maxWidth: "48px",
          height: "36px",
          "& > span": {
            marginRight: "0 !important",
          },
        }),
      }}
    >
      {isMobile ? "" : "Stop Watching"}
    </Button>
  );
};

const WatchlistPage = () => {
  const setLoading = useAppStore((state) => state.setLoading);
  const { isMobile } = useMedia();

  const [dataWatching, setDataWatching] = useState<IWatchlistItem[]>([]);
  const [dataUnWatch, setDataUnWatch] = useState<IWatchlistItem[]>([]);

  const [totalUnWatch, setTotalUnWatch] = useState(0);

  const [debouncedValue, updateDebounceValue] = useDebounceValue("", 500);
  const [listCountry, setListCountry] = useState<ICountryItem[]>([]);
  const [listIndustry, setListIndustry] = useState<IIndustryItem[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const handleChangeSearchKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateDebounceValue(e.target.value);
  };
  const action: SelectStaticProps["action"] = useRef(null);

  const getListCountry = async () => {
    const { data } = await WatchlistService.getWatchlistCountry({
      limit: 1000,
      page: 1,
    });
    setListCountry(data.data);
  };

  const getListIndustry = async () => {
    const { data } = await WatchlistService.getWatchlistIndustry({
      limit: 1000,
      page: 1,
    });
    setListIndustry(data.data);
  };

  const fetchWatchlist = useCallback(async () => {
    try {
      setLoading(true);
      const params: IReqGetWatchlist = {
        page: 1,
        limit: 1000,
        country: selectedCountry || "",
        industry: selectedIndustry || "",
        search: debouncedValue.trim() || "",
      };
      const res = await WatchlistService.getWatchlist(params);
      if (res.data) {
        setDataUnWatch(res.data.data);
        setTotalUnWatch(res.data.count);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [debouncedValue, selectedCountry, selectedIndustry, setLoading]);

  const fetchWatchlistWatching = useCallback(async () => {
    try {
      setLoading(true);
      const params: IReqGetWatchlist = {
        page: 1,
        limit: 1000,
        country: "",
        industry: "",
        search: "",
      };
      const res = await WatchlistService.getWatchlistWatching(params);
      if (res.data) {
        setDataWatching(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  const fetchInitialData = useCallback(async () => {
    try {
      setLoading(true);
      await Promise.all([
        getListCountry(),
        getListIndustry(),
        fetchWatchlist(),
        fetchWatchlistWatching(),
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [fetchWatchlist, fetchWatchlistWatching, setLoading]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const handleWatchSuccess = useCallback(() => {
    fetchWatchlist();
    fetchWatchlistWatching();
    getListCountry();
    getListIndustry();
  }, [fetchWatchlist, fetchWatchlistWatching]);

  const columnsWatchlist: Array<IColumn<IWatchlistItem>> = [
    {
      title: "COMPANY",
      key: "name",
      render: (_, rowData) => (
        <Box
          sx={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            whiteSpace: "nowrap",
          }}
        >
          <AppLogo src={rowData.logoUrl} size={39} />
          <TextWithTooltip
            text={
              <Typography variant="text-ellipsis">
                <Typography level="h5" color="text-primary">
                  {rowData.name}{" "}
                </Typography>
                <Typography level="body2" color="text-secondary">
                  {rowData.country}, {rowData.industry}
                </Typography>
              </Typography>
            }
            tooltip={`${rowData.name} ${rowData.country}, ${rowData.industry}`}
          />
        </Box>
      ),
      headerProps: { style: { width: isMobile ? "409px" : "auto" } },
    },
    {
      title: "LAST ROUND",
      key: "lastRound",
      headerProps: { style: { width: "160px", textAlign: "right" } },
      rowProps: { style: { textAlign: "right" } },
      render: (_, rowData) => (
        <Typography level="body1" color="text-secondary">
          {rowData.lastRound}
        </Typography>
      ),
    },
    {
      title: "LRV",
      key: "lrv",
      headerProps: { style: { width: "140px", textAlign: "right" } },
      rowProps: { style: { textAlign: "right" } },
      render: (_, rowData) => (
        <Typography level="body1" color="text-secondary">
          {rowData.lrv ? `$${number2USD(rowData.lrv)}` : ""}
        </Typography>
      ),
    },
    {
      title: "LRV DATE",
      key: "lrvDate",
      headerProps: { style: { width: "160px", textAlign: "right" } },
      rowProps: { style: { textAlign: "right" } },

      render: (_, rowData) => (
        <Typography level="body1" color="text-primary">
          {rowData.lrvDate ? dayjs(rowData.lrvDate).format("MMM. D, YYYY") : ""}
        </Typography>
      ),
    },
    {
      title: "",
      key: "id",
      render: (_, rowData) => (
        <ButtonStopWatch id={rowData.id} onSuccess={handleWatchSuccess} />
      ),
      headerProps: { style: { width: "197px" } },
      rowProps: { style: { textAlign: "center" } },
    },
  ];

  const columnsAddCompany: Array<IColumn<IWatchlistItem>> = [
    {
      title: "COMPANY",
      key: "name",
      render: (_, rowData) => (
        <Box
          sx={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            whiteSpace: "nowrap",
          }}
        >
          <AppLogo src={rowData.logoUrl} size={39} />
          <TextWithTooltip
            text={
              <Typography variant="text-ellipsis">
                <Typography level="h5" color="text-primary">
                  {rowData.name}
                </Typography>{" "}
                <Typography level="body2" color="text-secondary">
                  {rowData.country}, {rowData.industry}
                </Typography>
              </Typography>
            }
            tooltip={`${rowData.name} ${rowData.country}, ${rowData.industry}`}
          />
        </Box>
      ),
      headerProps: { style: { width: isMobile ? "409px" : "auto" } },
    },
    {
      title: "LAST ROUND",
      key: "lastRound",
      headerProps: { style: { width: "160px", textAlign: "right" } },
      rowProps: { style: { textAlign: "right" } },
      render: (_, rowData) => (
        <Typography level="body1" color="text-secondary">
          {rowData.lastRound || ""}
        </Typography>
      ),
    },
    {
      title: "LRV",
      key: "lrv",
      headerProps: { style: { width: "140px", textAlign: "right" } },
      rowProps: { style: { textAlign: "right" } },
      render: (_, rowData) => (
        <Typography level="body1" color="text-secondary">
          {rowData.lrv ? `$${number2USD(rowData.lrv)}` : ""}
        </Typography>
      ),
    },
    {
      title: "LRV DATE",
      key: "lrvDate",
      headerProps: { style: { width: "140px", textAlign: "right" } },
      rowProps: { style: { textAlign: "right" } },
      render: (_, rowData) => (
        <Typography level="body1" color="text-primary">
          {rowData.lrvDate ? dayjs(rowData.lrvDate).format("MMM. D, YYYY") : ""}
        </Typography>
      ),
    },
    {
      title: "",
      key: "id",
      render: (_, rowData) => (
        <ButtonWatch id={rowData.id} onSuccess={handleWatchSuccess} />
      ),
      headerProps: { style: { width: "163px" } },
      rowProps: { style: { textAlign: "center" } },
    },
  ];

  return (
    <Box>
      <Typography level="h4">Watching</Typography>
      <Card sx={{ marginTop: "24px" }}>
        {!isMobile ? (
          <AppTable
            stickyHeader
            columns={columnsWatchlist}
            data={dataWatching}
            containerProps={{
              maxHeight: "500px",
            }}
          />
        ) : (
          <Box
            sx={{
              borderRadius: "6px",
              backgroundColor: colors["table-header"],
            }}
          >
            <Box
              sx={{
                backgroundColor: colors["table-header"],
                padding: "16px 12px",
                borderTopLeftRadius: "6px",
                borderTopRightRadius: "6px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "13px",
                  lineHeight: "24px",
                  fontWeight: "500",
                  color: colors["text-primary"],
                }}
              >
                COMPANY
              </Typography>
            </Box>
            <Box
              sx={{
                maxHeight: "200px",
                backgroundColor: colors["paper"],
                overflowY: "auto",
                borderBottomLeftRadius: "6px",
                borderBottomRightRadius: "6px",
              }}
            >
              {dataWatching.length > 0 ? (
                <>
                  {dataWatching?.map((item) => (
                    <Box
                      key={item.id}
                      sx={{
                        padding: "5.5px 24px 5.5px 12px",
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "24px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          width: "100%",
                        }}
                      >
                        <AppLogo src={item.logoUrl} size={39} />

                        <Typography variant="text-ellipsis">
                          <Typography level="h5" color="text-primary">
                            {item.name}
                          </Typography>{" "}
                          <Typography level="body2" color="text-secondary">
                            {item.country}, {item.industry}
                          </Typography>
                        </Typography>
                      </Box>
                      <ButtonStopWatch
                        id={item.id}
                        onSuccess={handleWatchSuccess}
                        isMobile
                      />
                    </Box>
                  ))}
                </>
              ) : (
                <Box sx={{ textAlign: "center", padding: "60px 0" }}>
                  <RiFolderOpenLine size={42} />
                  <Typography level="body1">No data</Typography>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Card>
      <Typography level="h4" marginTop={"24px"}>
        Add more companies
      </Typography>
      <Box
        sx={{
          backgroundColor: colors["paper"],
          width: "100%",
          padding: "20px 12px",
          borderRadius: "6px",
          marginTop: "24px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
          gap: "12px",
        }}
      >
        <Box>
          <AppSearchBox onChange={handleChangeSearchKey} />
        </Box>
        <Select
          action={action}
          value={selectedCountry}
          placeholder="Country"
          disabled={listCountry.length === 0}
          {...(selectedCountry && {
            endDecorator: (
              <IconButton
                size="sm"
                variant="plain"
                color="neutral"
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
                onClick={() => {
                  setSelectedCountry(null);
                  action.current?.focusVisible();
                }}
              >
                <RiCloseLine />
              </IconButton>
            ),
            indicator: null,
          })}
          sx={{
            height: "42px",
          }}
        >
          {listCountry.map((item, index) => (
            <Option
              value={item.country}
              key={index}
              onClick={() => {
                setSelectedCountry(item.country);
              }}
            >
              {item.country}
            </Option>
          ))}
        </Select>
        <Select
          action={action}
          placeholder="Industry"
          value={selectedIndustry}
          disabled={listIndustry.length === 0}
          {...(selectedIndustry && {
            endDecorator: (
              <IconButton
                size="sm"
                variant="plain"
                color="neutral"
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
                onClick={() => {
                  setSelectedIndustry(null);
                  action.current?.focusVisible();
                }}
              >
                <RiCloseLine />
              </IconButton>
            ),
            indicator: null,
          })}
          sx={{
            height: "42px",
          }}
        >
          {listIndustry.map((item) => (
            <Option
              value={item.industry}
              key={item.industry}
              onClick={() => {
                setSelectedIndustry(item.industry);
              }}
            >
              {item.industry}
            </Option>
          ))}
        </Select>
      </Box>
      <Box marginTop={"24px"}>
        <Box>
          {totalUnWatch === 0 && debouncedValue.trim() ? (
            <Box
              sx={{
                borderRadius: "2px",
                backgroundColor: colors["paper"],
                padding: "16px 24px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Typography level="h4" color="primary-main">
                  Request a company to be added
                </Typography>
                <RiArrowRightLine color={colors["primary-main"]} />
              </Box>
              <Typography level="body1">
                We could not find a company named{" "}
                <Typography color="primary-main">
                  {`"${debouncedValue.trim()}"`}
                </Typography>{" "}
                in our database. Please tell us about it by email at{" "}
                <Typography color="primary-main">
                  sales@launchpoint.hk
                </Typography>{" "}
                and we will consider adding it.{" "}
              </Typography>
            </Box>
          ) : (
            <Card>
              {!isMobile ? (
                <AppTable
                  stickyHeader
                  columns={columnsAddCompany}
                  data={dataUnWatch}
                  containerProps={{
                    maxHeight: "500px",
                  }}
                />
              ) : (
                <Box
                  sx={{
                    borderRadius: "6px",
                    backgroundColor: colors["table-header"],
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: colors["table-header"],
                      padding: "16px 12px",
                      borderTopLeftRadius: "6px",
                      borderTopRightRadius: "6px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "13px",
                        lineHeight: "24px",
                        fontWeight: "500",
                        color: colors["text-primary"],
                      }}
                    >
                      COMPANY
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      maxHeight: "300px",
                      overflowY: "auto",
                      borderBottomLeftRadius: "6px",
                      borderBottomRightRadius: "6px",
                      backgroundColor: colors["paper"],
                    }}
                  >
                    {dataUnWatch.length > 0 ? (
                      <>
                        {dataUnWatch?.map((item) => (
                          <Box
                            key={item.id}
                            sx={{
                              padding: "5.5px 24px 5.5px 12px",
                              display: "flex",
                              justifyContent: "space-between",
                              gap: "24px",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                gap: "8px",
                                alignItems: "center",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                width: "100%",
                              }}
                            >
                              <AppLogo src={item.logoUrl} size={39} />

                              <Typography variant="text-ellipsis">
                                <Typography level="h5" color="text-primary">
                                  {item.name}
                                </Typography>{" "}
                                <Typography
                                  level="body2"
                                  color="text-secondary"
                                >
                                  {item.country}, {item.industry}
                                </Typography>
                              </Typography>
                            </Box>
                            <ButtonWatch
                              id={item.id}
                              onSuccess={handleWatchSuccess}
                              isMobile
                            />
                          </Box>
                        ))}
                      </>
                    ) : (
                      <Box sx={{ textAlign: "center", padding: "60px 0" }}>
                        <RiFolderOpenLine size={42} />
                        <Typography level="body1">No data</Typography>
                      </Box>
                    )}
                  </Box>
                </Box>
              )}
            </Card>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default WatchlistPage;
