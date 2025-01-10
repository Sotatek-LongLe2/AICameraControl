import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  styled,
  Typography,
} from "@mui/joy";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCheckLine,
} from "@remixicon/react";
import { round } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AppInputNumber } from "src/components/base/AppInputNumber";
import { AppLogo } from "src/components/base/AppLogo";
import AppSection from "src/components/base/AppSection";
import FormItem from "src/components/common/form/FormItem";
import { OWNERSHIP_STRUCTURE, SECURITY_TYPE } from "src/constants/dropdowns";
import {
  BidOfferPage,
  BidOfferType,
  SecondarySideEnum,
} from "src/constants/enumBE";
import { Message } from "src/constants/message";
import PAGES from "src/constants/router";
import {
  formatNumber,
  number2USD,
  number2Percentage,
} from "src/helpers/formatNumber";
import { UserActivityService } from "src/services/UserActivityService";
import { UserSecondaryService } from "src/services/UserSecondaryService";
import { ISecondaryDetail } from "src/services/UserSecondaryService.types";
import { useAppStore } from "src/store/appStore";
import { useAuthStore } from "src/store/authStore";
import { SecondaryOrder, useSecondaryStore } from "src/store/secondaryStore";
import { colors } from "src/styles/colors";

interface EntryFormData {
  notional: string;
  sharePrice: string;
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
}));

const EntryInfo = ({ data }: { data: ISecondaryDetail }) => {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 8, mb: 16 }}>
        <AppLogo src={data.companyLogo} size={50} />
        <Typography level="h5" fontWeight={500} variant="text-ellipsis">
          {data.companyName}
        </Typography>
      </Box>
      <Grid container spacing={16} sx={{ mb: 28 }}>
        <Grid mobile={6} laptop={3}>
          <LabelCard>Notional</LabelCard>
          <ValueCard>
            {data.notional
              ? isNaN(Number(data.notional))
                ? data.notional
                : `$${number2USD(Number(data.notional))}`
              : ""}
          </ValueCard>
        </Grid>
        <Grid mobile={6} laptop={3}>
          <LabelCard>Share Price</LabelCard>
          <ValueCard>
            {data.sharePrice
              ? isNaN(Number(data.sharePrice))
                ? data.sharePrice
                : `$${number2USD(Number(data.sharePrice))}`
              : ""}
          </ValueCard>
        </Grid>
        <Grid mobile={6} laptop={3}>
          <LabelCard>VS LRV</LabelCard>
          <ValueCard>
            {data.vsLRV !== "0"
              ? `${formatNumber(Number(data.vsLRV), false, 1)}%`
              : "0%"}
          </ValueCard>
        </Grid>
        <Grid mobile={6} laptop={3}>
          <LabelCard>Valuation</LabelCard>
          <ValueCard>
            {data.valuation
              ? isNaN(Number(data.valuation))
                ? data.valuation
                : `$${number2USD(Number(data.valuation))}`
              : ""}
          </ValueCard>
        </Grid>
        <Grid mobile={6} laptop={3}>
          <LabelCard>Minimum Size</LabelCard>
          <ValueCard>
            {data.minSize
              ? isNaN(Number(data.minSize))
                ? data.minSize
                : `$${number2USD(Number(data.minSize))}`
              : ""}
          </ValueCard>
        </Grid>
        <Grid mobile={6} laptop={3}>
          <LabelCard>Security Type</LabelCard>
          <ValueCard>
            {SECURITY_TYPE.find(
              (item) => item.value === String(data.securityType)
            )?.label || ""}
          </ValueCard>
        </Grid>
        <Grid mobile={6} laptop={3}>
          <LabelCard>Ownership Structure</LabelCard>
          <ValueCard>
            {OWNERSHIP_STRUCTURE.find(
              (item) => item.value === String(data.ownershipStructure)
            )?.label || ""}
          </ValueCard>
        </Grid>
        <Grid mobile={6} laptop={3}>
          <LabelCard>Jurisdiction</LabelCard>
          <ValueCard>{data.jurisdiction}</ValueCard>
        </Grid>
        <Grid mobile={6} laptop={3}>
          <LabelCard>Documentation Language</LabelCard>
          <ValueCard>{data.docLanguage}</ValueCard>
        </Grid>
        <Grid mobile={6} laptop={3}>
          <LabelCard>Fee</LabelCard>
          <ValueCard>{data.fee ? number2Percentage(data.fee) : ""}</ValueCard>
        </Grid>
      </Grid>
    </>
  );
};

const EntryForm = ({
  data,
  navigateToSecondaryDetail,
}: {
  data: ISecondaryDetail;
  navigateToSecondaryDetail: () => void;
}) => {
  const { watch } = useFormContext<EntryFormData>();

  const watchAllFields = watch(["notional", "sharePrice"]);

  const isAnyFieldEmpty = watchAllFields.some((field) => isNaN(Number(field)));

  const sharePrice = watch("sharePrice");

  const discountToIOI = useMemo(() => {
    if (isNaN(Number(sharePrice))) return "-";
    const discount =
      ((Number(sharePrice) - Number(data.sharePrice)) /
        Number(data.sharePrice)) *
      100;
    return `${discount > 0 ? "+" : ""}${round(discount, 1)}%`;
  }, [data.sharePrice, sharePrice]);

  return (
    <>
      <Grid container spacing={20}>
        <Grid mobile={12} laptop={4}>
          <FormItem
            name="notional"
            label="Notional"
            rules={{
              required: Message.REQUIRED,
              maxLength: {
                value: 20,
                message: "This field cannot exceed 20 characters",
              },
              min: {
                value: data.minSize,
                message: `The amount must be equal or higher than $${number2USD(
                  data.minSize
                )}`,
              },
              max: {
                value: data.notional,
                message: `The amount must be equal or lower than $${number2USD(
                  data.notional
                )}`,
              },
            }}
          >
            {({ onChange, ...field }) => (
              <AppInputNumber
                {...field}
                allowNegative={false}
                onValueChange={(value) => {
                  if (
                    value.floatValue === undefined ||
                    value.floatValue === null
                  ) {
                    onChange("");
                  } else {
                    onChange(value.floatValue);
                  }
                }}
                startDecorator="$"
                maxLength={20}
              />
            )}
          </FormItem>
        </Grid>
        <Grid mobile={12} laptop={4}>
          <FormItem
            name="sharePrice"
            label="Share Price"
            rules={{
              required: Message.REQUIRED,
              maxLength: {
                value: 20,
                message: "This field cannot exceed 20 characters",
              },
            }}
          >
            {({ onChange, ...field }) => (
              <AppInputNumber
                {...field}
                allowNegative={false}
                onValueChange={(value) => {
                  if (
                    value.floatValue === undefined ||
                    value.floatValue === null
                  ) {
                    onChange("");
                  } else {
                    onChange(value.floatValue);
                  }
                }}
                startDecorator="$"
                maxLength={20}
              />
            )}
          </FormItem>
        </Grid>
        <Grid mobile={12} laptop={4}>
          <Box>
            <Typography sx={{ color: "#fff", fontSize: 13 }}>
              Premium discount to IOI
            </Typography>
            <Typography level="body1" sx={{ mt: 8 }}>
              {Number(discountToIOI) > 0 && "+"}
              {discountToIOI}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: { mobile: "column", laptop: "row" },
          justifyContent: "space-between",
          gap: 12,
          mt: 48,
        }}
      >
        <Button
          variant="outlined"
          onClick={navigateToSecondaryDetail}
          startDecorator={<RiArrowLeftLine />}
        >
          Go Back
        </Button>
        <Button
          type="submit"
          variant="solid"
          disabled={isAnyFieldEmpty}
          endDecorator={<RiArrowRightLine />}
        >
          Continue
        </Button>
      </Box>
    </>
  );
};

const EntryFormConfirmation = ({ order }: { order: SecondaryOrder }) => {
  return (
    <Grid container spacing={20}>
      <Grid mobile={6} laptop={3}>
        <Box>
          <LabelCard>Notional</LabelCard>
          <ValueCard>
            {!isNaN(order?.notional) ? `$${number2USD(order.notional)}` : ""}
          </ValueCard>
        </Box>
      </Grid>
      <Grid mobile={6} laptop={3}>
        <Box>
          <LabelCard>Share Price</LabelCard>
          <ValueCard>
            {!isNaN(order?.sharePrice)
              ? `$${number2USD(order.sharePrice)}`
              : ""}
          </ValueCard>
        </Box>
      </Grid>
      <Grid mobile={6} laptop={3}>
        <Box>
          <LabelCard>Premium discount to IOI</LabelCard>
          <ValueCard>
            {order
              ? `${Number(order.premiumDiscount) > 0 ? "+" : ""}${round(
                  order.premiumDiscount,
                  1
                )}%`
              : ""}
          </ValueCard>
        </Box>
      </Grid>
    </Grid>
  );
};

const SecondaryEntryPage = () => {
  const typeAccess = useAuthStore((state) => state.typeAccess);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const side = searchParams.get("side");
  const companyId = searchParams.get("companyId");

  const methods = useForm<EntryFormData>();
  const [secondaryDetail, setSecondaryDetail] = useState<ISecondaryDetail>();
  const { setLoading } = useAppStore();
  const { secondaryOrder, setSecondaryOrder } = useSecondaryStore();
  const [isConfirm, setIsComfirm] = useState(false);
  const [userOrderId, setUserOrderId] = useState<number>();

  const saveUserActivity = useCallback(async () => {
    try {
      if (!side || !secondaryDetail) return;
      await UserActivityService.accessBidOffer({
        pageName: isConfirm
          ? BidOfferPage.BID_OFFER_CONFIRMATION
          : BidOfferPage.PLACE_BID_OFFER,
        type: side === "0" ? BidOfferType.OFFER : BidOfferType.BID,
        secondaryId: secondaryDetail?.id as number,
        ...(secondaryOrder?.notional && isConfirm
          ? { notional: String(secondaryOrder.notional) }
          : {}),
        ...(secondaryOrder?.sharePrice && isConfirm
          ? { sharePrice: String(secondaryOrder.sharePrice) }
          : {}),
      });
    } catch (error) {
      toast.error(String(error));
    }
  }, [isConfirm, secondaryDetail, secondaryOrder, side]);

  const navigateToSecondaryDetail = () => {
    if (!side && !companyId) return;
    navigate(-1);
  };

  const handleBackToEntryForm = () => {
    setIsComfirm(false);
  };

  const handleSubmit = (data: EntryFormData) => {
    if (!side && !companyId && !secondaryDetail) return;
    setSecondaryOrder({
      notional: Number(data.notional),
      sharePrice: Number(data.sharePrice),
      premiumDiscount:
        ((Number(data.sharePrice) - Number(secondaryDetail?.sharePrice)) /
          Number(secondaryDetail?.sharePrice)) *
        100,
    });
    setIsComfirm(true);
  };

  const fetchDetails = useCallback(async () => {
    if (!side || !companyId) return;
    try {
      setLoading(true);
      const res = await UserSecondaryService.getDetail({
        side: side === "0" ? SecondarySideEnum.BUY : SecondarySideEnum.SELL,
        companyId: Number(companyId),
      });

      if (res.data.statusCode === 200) {
        const secondaryData = res.data.data;
        setSecondaryDetail(secondaryData);

        const orderRes = await UserSecondaryService.getOrder({
          secondaryId: secondaryData.id,
        });

        if (orderRes.data.statusCode === 200 && orderRes.data.data) {
          setSecondaryOrder({
            notional: Number(orderRes.data.data.notional),
            sharePrice: Number(orderRes.data.data.sharePrice),
            premiumDiscount: Number(orderRes.data.data.premiumDiscount),
          });
          setUserOrderId(orderRes.data.data.id);
          methods.setValue("notional", orderRes.data.data.notional);
          methods.setValue("sharePrice", orderRes.data.data.sharePrice);
        } else {
          setSecondaryOrder(undefined);
          setUserOrderId(undefined);
        }
      }
    } catch (error) {
      toast.error(String(error));
      setSecondaryOrder(undefined);
      setUserOrderId(undefined);
    } finally {
      setLoading(false);
    }
  }, [companyId, methods, setLoading, setSecondaryOrder, side]);

  const handleConfirmEntry = async () => {
    if (!secondaryDetail || !secondaryOrder) return;
    try {
      setLoading(true);
      const res = await UserSecondaryService.placeOrder({
        ...(userOrderId && { id: userOrderId }),
        secondaryId: secondaryDetail?.id as number,
        notional: String(secondaryOrder?.notional),
        sharePrice: String(secondaryOrder?.sharePrice),
        premiumDiscount: String(secondaryOrder?.premiumDiscount),
      });
      if (res.data.statusCode === 200) {
        navigate(PAGES.SECONDARY_ENTRY_CONFIRM);
      }
    } catch (error) {
      toast.error(String(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  useEffect(() => {
    saveUserActivity();
  }, [saveUserActivity]);

  if (typeAccess !== "full" || !secondaryDetail) return <></>;

  return (
    <Card sx={{ width: "100%", maxWidth: 772, m: "auto" }}>
      <CardContent>
        {isConfirm ? (
          <>
            <Typography level="h4" sx={{ mb: 20 }}>
              {secondaryDetail.side === SecondarySideEnum.BUY
                ? "Offer Entry"
                : "Bid Entry"}{" "}
              - Confirmation
            </Typography>
            <Typography level="body1" sx={{ mb: 20 }}>
              Please double check the details of your{" "}
              {secondaryDetail.side === SecondarySideEnum.BUY ? "offer" : "bid"}{" "}
              before confirming. Placing an{" "}
              {secondaryDetail.side === SecondarySideEnum.BUY ? "offer" : "bid"}{" "}
              on Astra is non binding. A sales representative will contact you
              to process your request.
            </Typography>
          </>
        ) : (
          <Typography level="h4" sx={{ mb: 24 }}>
            {secondaryDetail.side === SecondarySideEnum.BUY
              ? "Offer Entry"
              : "Bid Entry"}
          </Typography>
        )}
        <FormProvider {...methods}>
          <Box component="form" onSubmit={methods.handleSubmit(handleSubmit)}>
            <EntryInfo data={secondaryDetail} />
            {isConfirm ? (
              <AppSection
                title={
                  secondaryDetail.side === SecondarySideEnum.BUY
                    ? "Your Offer"
                    : "Your Bid"
                }
              >
                {secondaryOrder && (
                  <EntryFormConfirmation order={secondaryOrder} />
                )}
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: { mobile: "column", laptop: "row" },
                    justifyContent: "space-between",
                    gap: 12,
                    mt: 40,
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={handleBackToEntryForm}
                    startDecorator={<RiArrowLeftLine />}
                  >
                    Amend Details
                  </Button>
                  <Button
                    variant="solid"
                    onClick={handleConfirmEntry}
                    endDecorator={<RiCheckLine />}
                  >
                    Confirm
                  </Button>
                </Box>
              </AppSection>
            ) : (
              <AppSection
                title={
                  secondaryDetail.side === SecondarySideEnum.BUY
                    ? "Your Offer"
                    : "Your Bid"
                }
              >
                <EntryForm
                  data={secondaryDetail}
                  navigateToSecondaryDetail={navigateToSecondaryDetail}
                />
              </AppSection>
            )}
          </Box>
        </FormProvider>
      </CardContent>
    </Card>
  );
};
export default SecondaryEntryPage;
