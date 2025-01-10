import { Box, Button, Chip, Typography } from "@mui/joy";
import { RiExternalLinkLine } from "@remixicon/react";
import BigNumber from "bignumber.js";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { generatePath, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AppInputNumber } from "src/components/base/AppInputNumber";
import { AppLogo } from "src/components/base/AppLogo";
import { MessageError } from "src/components/common/MessageError";
import { SecondarySideEnum, SecondaryType } from "src/constants/enumBE";
import { PAGES_ADMIN } from "src/constants/router";
import { formatNumber } from "src/helpers/formatNumber";
import { AdminSecondaryService } from "src/services/AdminSecondaryService";
import {
  Buyer,
  IOIBuySellDetail,
} from "src/services/AdminSecondaryService.types";
import { useAppStore } from "src/store/appStore";
import { colors } from "src/styles/colors";

const defaultBuyer = {
  username: "",
  notional: "",
  net: 0,
  commission: "",
  id: 0,
};

const BuyerCard = ({
  buyer,
  side,
  isSecondCard,
}: {
  buyer: Buyer;
  side: SecondarySideEnum;
  isSecondCard?: boolean;
}) => {
  return (
    <Box
      sx={{
        border: `1px solid`,
        borderColor: `${
          side === SecondarySideEnum.BUY
            ? colors["primary-main"]
            : colors["astra-pink"]
        }`,
        width: "100%",
        height: "100%",
        marginTop: isSecondCard ? 12 : 29,
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
            {side === SecondarySideEnum.BUY ? "Buyer" : "Seller"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              cursor: "pointer",
            }}
            onClick={() => {
              window.navigate(
                generatePath(PAGES_ADMIN.CUSTOMERS.VIEW, {
                  id: buyer.id.toString(),
                })
              );
            }}
          >
            <Typography
              level="h5"
              variant="text-ellipsis"
              sx={{
                color: colors["primary-main"],
              }}
            >
              {buyer.username}
            </Typography>
            <RiExternalLinkLine
              color={colors["primary-main"]}
              style={{ flexShrink: 0 }}
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
            ${formatNumber(Number(buyer.notional), true)}
          </Typography>
        </Box>
        <Box marginTop={"16px"}>
          <Typography
            level="subtitle2"
            sx={{
              color: colors["secondary-light"],
            }}
          >
            Net
          </Typography>
          <Typography level="body1-500">
            ${formatNumber(Number(buyer.net), true)}
          </Typography>
        </Box>
        <Box marginTop={"16px"}>
          <Typography
            level="subtitle2"
            sx={{
              color: colors["secondary-light"],
            }}
          >
            Commission
          </Typography>
          <Typography level="body1-500">
            ${formatNumber(Number(buyer.commission), true)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export const ExecutionDetailPage = () => {
  const { id } = useParams();
  const { setLoading } = useAppStore();
  const [ioiDetail, setIoiDetail] = useState<IOIBuySellDetail>();

  const getSecondaryDetail = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const res = await AdminSecondaryService.getIOIBuySellDetail({
        ioiId: Number(id),
      });
      if (res.data.statusCode) {
        setIoiDetail(res.data.data);
      }
    } catch (error) {
      console.log("error", error);
      setIoiDetail(undefined);
    } finally {
      setLoading(false);
    }
  }, [id, setLoading]);

  useEffect(() => {
    getSecondaryDetail();
  }, [getSecondaryDetail]);

  const {
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    // setError,
    control,
  } = useForm();

  const onSubmit = async (data: any) => {
    if (!id) return;
    try {
      const res = await AdminSecondaryService.updateIOI({
        secondaryId: Number(id),
        type: SecondaryType.EXECUTED,
        notional: String(watchNotional),
        quantity: data.quantity,
        sharePrice: data.sharePrice,
        buyFee: data.buyerFee,
        sellFee: data.sellerFee,
        buyCom: watchBuyer.commission,
        sellCom: watchSeller.commission,
      });
      if (res.data.statusCode === 200) {
        toast.success("IOI executed");
        window.navigate(
          generatePath(
            PAGES_ADMIN.SECONDARY.INDEX + `?tab=3&side=${ioiDetail?.side}`
          )
        );
      }
    } catch (error) {
      toast.error(String(error));
    }
  };

  const watchQuantity = watch("quantity");
  const watchSharePrice = watch("sharePrice");
  const watchSellerFee = watch("sellerFee");
  const watchBuyerFee = watch("buyerFee");

  const watchNotional = useMemo(() => {
    if (watchQuantity && watchSharePrice) {
      const bigQuantity = BigNumber(watchQuantity.replace(/,/g, "") || 0);
      const bigSharePrice = BigNumber(watchSharePrice.replace(/,/g, "") || 0);
      return Number(bigQuantity.multipliedBy(bigSharePrice));
    } else {
      return 0;
    }
  }, [watchQuantity, watchSharePrice]);

  const watchBuyer: Buyer = useMemo(() => {
    if (watchBuyerFee && ioiDetail) {
      return {
        username: ioiDetail.buyer.username as string,
        notional: String(watchNotional),
        id: ioiDetail.buyer.id,
        net:
          watchNotional +
          (watchNotional * watchBuyerFee.replace(/,/g, "")) / 100,
        commission: String(
          (watchNotional * watchBuyerFee.replace(/,/g, "")) / 100
        ),
      };
    } else {
      return defaultBuyer;
    }
  }, [watchBuyerFee, ioiDetail, watchNotional]);

  const watchSeller: Buyer = useMemo(() => {
    if (watchSellerFee && ioiDetail) {
      return {
        username: ioiDetail.seller.username,
        notional: String(watchNotional),
        id: ioiDetail.seller.id,
        net:
          watchNotional -
          (watchNotional * watchSellerFee.replace(/,/g, "")) / 100,
        commission: String(
          (watchNotional * watchSellerFee.replace(/,/g, "")) / 100
        ),
      };
    } else {
      return defaultBuyer;
    }
  }, [ioiDetail, watchNotional, watchSellerFee]);

  const watchAllFields = watch([
    "quantity",
    "sharePrice",
    "sellerFee",
    "buyerFee",
  ]);

  const isAnyFieldEmpty = watchAllFields.some((field) => !field);

  useEffect(() => {
    if (!ioiDetail) return;
    reset({
      quantity: formatNumber(Number(ioiDetail.quantity), true, 16), // round up
      sharePrice: formatNumber(Number(ioiDetail.sharePrice), true, 16), // round up
      sellerFee: formatNumber(
        Number(ioiDetail.sellFee || ioiDetail.fee),
        false,
        2
      ),
      buyerFee: formatNumber(
        Number(ioiDetail.buyFee || ioiDetail.fee),
        false,
        2
      ),
    });
  }, [ioiDetail, reset]);

  if (!ioiDetail) return <></>;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        background: colors["paper"],
        padding: "20px",
      }}
    >
      <Typography level="h4">Execution details</Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginTop: "28px",
        }}
      >
        <AppLogo src={ioiDetail.companyLogo} size={50} />
        <Typography level="h5">{ioiDetail.companyName}</Typography>
        <Chip
          color={
            ioiDetail.side === SecondarySideEnum.BUY ? "primary" : "danger"
          }
        >
          {ioiDetail.side === SecondarySideEnum.BUY ? "BUY" : "SELL"}
        </Chip>
      </Box>
      <Typography
        level="h5"
        margin={"28px 0px"}
        sx={{
          color: colors["text-primary"],
        }}
      >
        Size
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: "20px",
          width: "100%",
        }}
      >
        <Box
          sx={{
            flex: 1,
            width: "100%",
            maxWidth: 297,
          }}
        >
          <Controller
            control={control}
            name="quantity"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, ...field } }) => (
              <AppInputNumber
                {...field}
                required
                onValueChange={(value) =>
                  onChange(value.floatValue?.toString())
                }
                label="Quantity"
                maxLength={20}
              />
            )}
          />
          {errors.quantity && (
            <MessageError>{String(errors.quantity.message)}</MessageError>
          )}
        </Box>
        <Box sx={{ flex: 1, width: "100%", maxWidth: 297 }}>
          <Controller
            control={control}
            name="sharePrice"
            rules={{
              required: true,
            }}
            render={({ field: { onChange, ...field } }) => (
              <AppInputNumber
                {...field}
                required
                onValueChange={(value) =>
                  onChange(value.floatValue?.toString())
                }
                startDecorator="$"
                label="Share Price"
                maxLength={10}
              />
            )}
          />
          {errors.sharePrice && (
            <MessageError>{String(errors.sharePrice.message)}</MessageError>
          )}
        </Box>
        <Box sx={{ flex: 1, width: "100%" }}>
          <Typography level="body2">Notional</Typography>
          <Typography level="body1" sx={{ mt: 5 }}>
            ${formatNumber(watchNotional, true, 16)}
          </Typography>
        </Box>
      </Box>
      <Typography
        level="h5"
        marginTop={"28px"}
        sx={{
          color: colors["text-primary"],
        }}
      >
        Fees
      </Typography>
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
            flex: 1,
            width: "100%",
            maxWidth: 220,
          }}
        >
          <Box>
            <Controller
              control={control}
              name={
                ioiDetail.side === SecondarySideEnum.BUY
                  ? "buyerFee"
                  : "sellerFee"
              }
              rules={{
                required: true,
              }}
              render={({ field: { onChange, ...field } }) => (
                <AppInputNumber
                  {...field}
                  required
                  onValueChange={(value) =>
                    onChange(value.floatValue?.toString())
                  }
                  endDecorator="%"
                  label={
                    ioiDetail.side === SecondarySideEnum.BUY
                      ? "Buyer Fee"
                      : "Seller Fee"
                  }
                  maxLength={3}
                />
              )}
            />
            {errors.sellerFee && (
              <MessageError>{String(errors.sellerFee.message)}</MessageError>
            )}
          </Box>
          <BuyerCard
            buyer={
              ioiDetail.side === SecondarySideEnum.BUY
                ? watchBuyer
                : watchSeller
            }
            side={
              ioiDetail.side === SecondarySideEnum.BUY
                ? SecondarySideEnum.BUY
                : SecondarySideEnum.SELL
            }
          />
        </Box>
        <Box
          component="img"
          src={"/icon/icon-crossbar.svg"}
          sx={{
            marginTop: "110px",
          }}
        />
        <Box
          sx={{
            flex: 1,
            width: "100%",
            maxWidth: 220,
          }}
        >
          <Box>
            <Controller
              control={control}
              name={
                ioiDetail.side === SecondarySideEnum.BUY
                  ? "sellerFee"
                  : "buyerFee"
              }
              rules={{
                required: true,
              }}
              render={({ field: { onChange, ...field } }) => (
                <AppInputNumber
                  {...field}
                  required
                  onValueChange={(value) =>
                    onChange(value.floatValue?.toString())
                  }
                  endDecorator="%"
                  label={
                    ioiDetail.side === SecondarySideEnum.BUY
                      ? "Seller Fee"
                      : "Buyer Fee"
                  }
                  maxLength={3}
                />
              )}
            />
            {errors.buyerFee && (
              <MessageError>{String(errors.buyerFee.message)}</MessageError>
            )}
            <Typography
              sx={{
                fontSize: "13px",
                lineHeight: "13px",
                color: colors["text-secondary"],
                marginTop: "4px",
              }}
            >
              Displayed Fee: {ioiDetail.fee}%
            </Typography>
          </Box>
          <BuyerCard
            buyer={
              ioiDetail.side === SecondarySideEnum.BUY
                ? watchSeller
                : watchBuyer
            }
            side={
              ioiDetail.side === SecondarySideEnum.BUY
                ? SecondarySideEnum.SELL
                : SecondarySideEnum.BUY
            }
            isSecondCard
          />
        </Box>
      </Box>

      <Box width={"100%"} display={"flex"} marginTop={"28px"} gap={"16px"}>
        <Button
          variant="outlined"
          color="astra-pink"
          onClick={() =>
            window.navigate(
              `${PAGES_ADMIN.SECONDARY.INDEX}?tab=2&side=${ioiDetail?.side}`
            )
          }
          sx={{
            width: "100%",
          }}
        >
          Cancel
        </Button>
        <Button
          variant="solid"
          color="primary"
          sx={{ width: "100%" }}
          type="submit"
          disabled={isAnyFieldEmpty}
        >
          Mark As Executed
        </Button>
      </Box>
    </Box>
  );
};
