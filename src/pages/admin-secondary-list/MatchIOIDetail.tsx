import {
  Box,
  Button,
  Dropdown,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  styled,
  Typography,
} from "@mui/joy";
import { RiExternalLinkLine } from "@remixicon/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AppButtonStatusBuySell } from "src/components/base/AppButtonStatusBuySell";
import { AppLogo } from "src/components/base/AppLogo";
import { OWNERSHIP_STRUCTURE, SECURITY_TYPE } from "src/constants/dropdowns";
import { Role, SecondarySideEnum } from "src/constants/enumBE";
import { PAGES_ADMIN } from "src/constants/router";
import { formatNumber, number2USD } from "src/helpers/formatNumber";
import hexToRGBA from "src/helpers/hexToRGB";
import { AdminSecondaryService } from "src/services/AdminSecondaryService";
import {
  IListAdminsItem,
  IListOrderItem,
  IOIDetail,
} from "src/services/AdminSecondaryService.types";
import { useAppStore } from "src/store/appStore";
import { useUserStore } from "src/store/userStore";
import { colors } from "src/styles/colors";
import _ from "lodash";
import TextWithTooltip from "src/components/common/TextWithTooltip";

const TextLabel = styled(Typography)({
  color: colors["secondary-light"],
});

const TextValue = styled(Typography)({
  color: colors["text-primary"],
});

const MatchIOIDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const setLoading = useAppStore((state) => state.setLoading);
  const [dataIOIDetail, setDataIOIDetail] = useState<IOIDetail>();
  const [dataListOrder, setDataListOrder] = useState<IListOrderItem[]>([]);
  const [dataListAdmins, setDataListAdmins] = useState<IListAdminsItem[]>([]);
  const userInfo = useUserStore((state) => state.userInfo);

  const fetchIoiDetail = useCallback(async () => {
    const { data } = await AdminSecondaryService.getIOIDetail({
      id: Number(id),
    });
    setDataIOIDetail(data.data);
  }, [id]);

  const fetchListOrder = useCallback(async () => {
    const { data } = await AdminSecondaryService.getListOrder({
      secondaryId: Number(id),
    });
    setDataListOrder(data.data);
  }, [id, setDataListOrder]);

  const fetchListAdmins = useCallback(async () => {
    const { data } = await AdminSecondaryService.getListAdmins({
      page: 1,
      limit: 100,
    });
    setDataListAdmins(data.data);
  }, []);

  const fetchInitialData = useCallback(async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchIoiDetail(),
        fetchListOrder(),
        fetchListAdmins(),
      ]);
    } catch (error) {
      toast.error(String(error));
    } finally {
      setLoading(false);
    }
  }, [fetchIoiDetail, fetchListAdmins, fetchListOrder, setLoading]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const sortedDataListOrder = useMemo(() => {
    if (!dataIOIDetail || dataListOrder.length === 0) return dataListOrder;

    return _.orderBy(
      dataListOrder,
      [
        (item) => parseFloat(item.sharePrice),
        (item) => parseFloat(item.notional),
        "id",
      ],
      [
        dataIOIDetail.side === SecondarySideEnum.BUY ? "asc" : "desc",
        "desc",
        "asc",
      ]
    );
  }, [dataIOIDetail, dataListOrder]);

  useEffect(() => {
    if (!_.isEqual(dataListOrder, sortedDataListOrder)) {
      setDataListOrder(sortedDataListOrder);
    }
  }, [sortedDataListOrder, dataListOrder]);

  const handleOnPutAssignTo = useCallback(
    async ({
      secondaryId,
      orderId,
      adminId,
    }: {
      secondaryId: number;
      orderId: number;
      adminId: number;
    }): Promise<void> => {
      try {
        setLoading(true);
        await AdminSecondaryService.putAssignTo({
          secondaryId,
          orderId,
          adminId,
        });

        toast.success("IOI matched");
        navigate(
          PAGES_ADMIN.SECONDARY.INDEX + `?tab=1&side=${dataIOIDetail?.side}`
        );
      } catch (error: any) {
        toast.error("Assign failed", error.response.data.message);
      } finally {
        setLoading(false);
      }
    },
    [dataIOIDetail?.side, navigate, setLoading]
  );

  if (!dataIOIDetail) return null;

  return (
    <Box
      sx={{
        background: colors["paper"],
        padding: "20px",
      }}
    >
      <Typography level="h4">Match IOI #{id}</Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginTop: "28px",
        }}
      >
        <AppLogo src={dataIOIDetail.company.logoUrl || ""} size={50} />
        <Typography>{dataIOIDetail.company.name}</Typography>
        <AppButtonStatusBuySell side={dataIOIDetail?.side} />
      </Box>
      <Box flex={1} overflow="auto" pb={10}>
        <Box
          sx={{
            display: "flex",
            gap: "12px",
            marginTop: "28px",
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              border: `1px solid ${
                dataIOIDetail.side === SecondarySideEnum.BUY
                  ? colors["astra-main"]
                  : colors["astra-pink"]
              }`,
              width: "220px",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                borderBottom: `1px solid ${colors["secondary-opacity-main"]}`,
              }}
            >
              <Box padding={"20px"}>
                <Typography
                  level="subtitle2"
                  sx={{
                    color: colors["secondary-light"],
                  }}
                >
                  {dataIOIDetail.side === SecondarySideEnum.BUY
                    ? "Buyer"
                    : "Seller"}
                </Typography>
                <Box
                  onClick={() => {
                    window.navigate(
                      generatePath(PAGES_ADMIN.CUSTOMERS.VIEW, {
                        id: dataIOIDetail.userId.toString(),
                      })
                    );
                  }}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    level="h5"
                    sx={{
                      color: colors["primary-main"],
                    }}
                    variant="text-ellipsis"
                    title={`${dataIOIDetail.user.firstName} ${dataIOIDetail.user.lastName}`}
                  >
                    {dataIOIDetail.user.firstName} {dataIOIDetail.user.lastName}
                  </Typography>
                  <RiExternalLinkLine
                    color={colors["primary-main"]}
                    style={{
                      flexShrink: 0,
                    }}
                  />
                </Box>
              </Box>
            </Box>

            <Box padding={"20px"}>
              <Box>
                <Typography
                  level="subtitle2"
                  sx={{
                    color: colors["secondary-light"],
                  }}
                >
                  Notional
                </Typography>
                <Typography level="body1-500">
                  $
                  {formatNumber(
                    Number(dataIOIDetail.notional.replace(/,/g, "")),
                    true
                  )}
                </Typography>
              </Box>
              <Box marginTop={"16px"}>
                <Typography
                  level="subtitle2"
                  sx={{
                    color: colors["secondary-light"],
                  }}
                >
                  Share Price
                </Typography>
                <Typography level="body1-500">
                  $
                  {formatNumber(
                    Number(dataIOIDetail.sharePrice.replace(/,/g, "")),
                    true
                  )}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              width: 15,
              height: "1px",
              display: "block",
              background:
                dataIOIDetail.side === SecondarySideEnum.BUY
                  ? colors["astra-pink"]
                  : colors["astra-main"],
            }}
          />

          {dataListOrder.map((bidFrom) => (
            <Box
              sx={{
                border: `1px solid ${
                  dataIOIDetail.side === SecondarySideEnum.BUY
                    ? colors["astra-pink"]
                    : colors["astra-main"]
                }`,
                width: "220px",
                overflow: "hidden",
              }}
              key={bidFrom.id}
            >
              <Box
                sx={{
                  borderBottom: `1px solid ${colors["secondary-opacity-main"]}`,
                }}
              >
                <Box padding={"20px"}>
                  <Typography
                    level="subtitle2"
                    sx={{
                      color: colors["secondary-light"],
                    }}
                  >
                    {dataIOIDetail.side === SecondarySideEnum.BUY
                      ? "Offer From"
                      : "Bid From"}
                  </Typography>
                  <Box
                    onClick={() => {
                      window.navigate(
                        generatePath(PAGES_ADMIN.CUSTOMERS.VIEW, {
                          id: bidFrom.userId.toString(),
                        })
                      );
                    }}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      cursor: "pointer",
                    }}
                  >
                    <Typography
                      level="h5"
                      sx={{
                        color: colors["primary-main"],
                      }}
                      variant="text-ellipsis"
                      title={bidFrom.userName}
                    >
                      {bidFrom.userName}
                    </Typography>
                    <RiExternalLinkLine color={colors["primary-main"]} />
                  </Box>
                </Box>
              </Box>

              <Box padding={"20px"}>
                <Box>
                  <Typography
                    level="subtitle2"
                    sx={{
                      color: colors["secondary-light"],
                    }}
                  >
                    Notional
                  </Typography>
                  <Typography level="body1-500">
                    $
                    {formatNumber(
                      Number(bidFrom.notional.replace(/,/g, "")),
                      true
                    )}
                  </Typography>
                </Box>
                <Box marginTop={"16px"}>
                  <Typography
                    level="subtitle2"
                    sx={{
                      color: colors["secondary-light"],
                    }}
                  >
                    Share Price
                  </Typography>
                  <Typography level="body1-500" marginBottom={"16px"}>
                    $
                    {formatNumber(
                      Number(bidFrom.sharePrice.replace(/,/g, "")),
                      true
                    )}{" "}
                    <Typography
                      sx={{
                        color:
                          bidFrom.sharePriceGap < 0
                            ? colors["red-500"]
                            : bidFrom.sharePriceGap === 0
                            ? colors["text-primary"]
                            : "green",
                      }}
                    >
                      {Number(bidFrom.sharePriceGap) > 0 && "+"}
                      {formatNumber(bidFrom.sharePriceGap, false, 1)}%
                    </Typography>
                  </Typography>
                  <Box>
                    <Dropdown>
                      <MenuButton
                        slots={{ root: IconButton }}
                        slotProps={{
                          root: { variant: "plain", color: "neutral" },
                        }}
                        disabled={userInfo.role !== Role.SUPPER_ADMIN}
                        sx={{
                          width: "180px",
                        }}
                      >
                        <Button
                          variant="solid"
                          color="primary"
                          disabled={userInfo.role !== Role.SUPPER_ADMIN}
                          sx={{
                            minWidth: "180px",
                            position: "relative",
                          }}
                        >
                          Match IOI
                        </Button>
                      </MenuButton>
                      <Menu
                        sx={{
                          width: "180px",
                          borderRadius: "6px",
                          borderColor: colors.divider,
                          bgcolor: colors.paper,
                          maxHeight: 300,
                          boxShadow: `0px 6px 16px 0px ${colors["shadow-lg"]}`,
                          padding: 0,
                          "& .Mui-expanded": {
                            top: 20,
                          },
                        }}
                      >
                        <MenuItem
                          sx={{
                            borderRadius: "6px",
                            padding: "8px 20px",
                            color: colors["primary-main"],
                            "&&:hover": {
                              color: colors["primary-main"],
                              cursor: "inherit",
                              bgcolor: colors.paper,
                            },
                          }}
                        >
                          <Typography
                            level="body2"
                            sx={{
                              color: hexToRGBA(colors["text-primary"], 0.8),
                              fontWeight: 400,
                            }}
                          >
                            ASSIGN TO
                          </Typography>
                        </MenuItem>

                        {dataListAdmins.map((itemAdmin) => (
                          <MenuItem
                            key={itemAdmin.id}
                            sx={{
                              padding: "8px 20px",
                              color: colors["primary-main"],
                              borderRadius: 0,
                              "&&:hover": {
                                color: colors["primary-main"],
                                bgcolor: hexToRGBA(
                                  colors["primary-opacity-light"],
                                  0.16
                                ),
                                span: {
                                  color: colors["primary-main"],
                                },
                              },
                            }}
                            onClick={() =>
                              handleOnPutAssignTo({
                                secondaryId: Number(id),
                                orderId: bidFrom.id,
                                adminId: itemAdmin.id,
                              })
                            }
                          >
                            <TextWithTooltip
                              text={
                                <Typography
                                  level="body1"
                                  variant="text-ellipsis"
                                >
                                  {itemAdmin?.firstName} {itemAdmin?.lastName}
                                </Typography>
                              }
                              tooltip={`${itemAdmin?.firstName} ${itemAdmin?.lastName}`}
                            />
                          </MenuItem>
                        ))}
                      </Menu>
                    </Dropdown>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box marginTop={"18px"}>
        <Typography level="h4">IOI Details</Typography>
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            mt: "12px",
          }}
        >
          <Box width={"171px"}>
            <TextLabel level="subtitle2">VS LRV</TextLabel>
            <TextValue level="body1-500">
              {Number(dataIOIDetail.premiumDiscount)
                ? `${formatNumber(
                    Number(dataIOIDetail.premiumDiscount),
                    false,
                    1
                  )} %`
                : "N/A"}
            </TextValue>
          </Box>

          <Box width={"171px"}>
            <TextLabel level="subtitle2">Valuation</TextLabel>
            <TextValue level="body1-500">
              ${number2USD(dataIOIDetail.valuation.toString())}
            </TextValue>
          </Box>

          <Box width={"171px"}>
            <TextLabel level="subtitle2">Minimum Size</TextLabel>
            <TextValue level="body1-500">
              ${number2USD(dataIOIDetail.minSize.toString())}
            </TextValue>
          </Box>

          <Box width={"171px"}>
            <TextLabel level="subtitle2">Security Type</TextLabel>
            <TextValue level="body1-500">
              {SECURITY_TYPE.find(
                (item) => item.value === dataIOIDetail.securityType.toString()
              )?.label || ""}
            </TextValue>
          </Box>

          <Box width={"171px"}>
            <TextLabel level="subtitle2">Ownership Structure</TextLabel>
            <TextValue level="body1-500">
              {OWNERSHIP_STRUCTURE.find(
                (item) =>
                  item.value === dataIOIDetail.ownershipStructure.toString()
              )?.label || ""}
            </TextValue>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            marginTop: "16px",
          }}
        >
          <Box width={"171px"}>
            <TextLabel level="subtitle2">Jurisdiction</TextLabel>
            <TextValue level="body1-500">
              {dataIOIDetail.jurisdiction}
            </TextValue>
          </Box>

          <Box width={"171px"}>
            <TextLabel level="subtitle2">Documentation Language</TextLabel>
            <TextValue level="body1-500">{dataIOIDetail.docLanguage}</TextValue>
          </Box>

          <Box width={"171px"}>
            <TextLabel level="subtitle2">Fee</TextLabel>
            <TextValue level="body1-500">
              {formatNumber(
                Number(dataIOIDetail.fee.replace(/,/g, "")),
                false,
                1
              )}
              %
            </TextValue>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MatchIOIDetail;
