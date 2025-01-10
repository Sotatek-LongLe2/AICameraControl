import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/joy";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCheckLine,
} from "@remixicon/react";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AppInputNumber } from "src/components/base/AppInputNumber";
import CardPrimaryUser from "src/components/common/card/CardPrimaryUser";
import FormItem from "src/components/common/form/FormItem";
import FormWrapper from "src/components/common/form/FormWrapper";
import { DemandPage } from "src/constants/enumBE";
import { Message } from "src/constants/message";
import PAGES from "src/constants/router";
import { number2USD } from "src/helpers/formatNumber";
import { UserActivityService } from "src/services/UserActivityService";
import { UserPrimaryService } from "src/services/UserPrimaryService";
import { IPrimaryItem } from "src/services/UserPrimaryService.types";
import { useAppStore } from "src/store/appStore";
import { useAuthStore } from "src/store/authStore";
import { usePrimaryStore } from "src/store/primaryStore";

interface DemandFormData {
  notional: string;
}

const NotionalForm = ({
  company,
  notional,
}: {
  company: IPrimaryItem;
  notional: string;
}) => {
  const { reset } = useFormContext();

  useEffect(() => {
    reset({ notional });
  }, [notional, reset]);

  return (
    <Grid container>
      <Grid mobile={12} laptop={6}>
        <FormItem
          name="notional"
          label="Notional"
          rules={{
            required: Message.REQUIRED,
            min: {
              value: company.minimumSize,
              message: `The notional must be equal or higher than $${number2USD(
                company.minimumSize
              )}`,
            },
            max: {
              value: company.dealSize,
              message: `The notional must be equal or lower than $${number2USD(
                company.dealSize
              )}`,
            },
          }}
        >
          {({ onChange, ...field }) => (
            <AppInputNumber
              {...field}
              fullWidth
              sx={{ background: "transparent" }}
              startDecorator="$"
              maxLength={20}
              allowNegative={false}
              onValueChange={(value) => {
                onChange(value.floatValue);
              }}
            />
          )}
        </FormItem>
      </Grid>
    </Grid>
  );
};

const PlaceDemand = () => {
  const { companyID } = useParams();
  const navigate = useNavigate();
  const typeAccess = useAuthStore((state) => state.typeAccess);
  const setLoading = useAppStore((state) => state.setLoading);
  const { order, setOrder } = usePrimaryStore();
  const [primaryDetail, setPrimaryDetail] = useState<IPrimaryItem>();
  const [notional, setNotional] = useState("");
  const [isConfirm, setIsConfirm] = useState(false);

  const navigateToPrimaryDetail = () => {
    if (!companyID) return;
    navigate(
      generatePath(PAGES.PRIMARY.DETAIL, {
        companyID: companyID,
      })
    );
  };

  const saveUserActivity = useCallback(async () => {
    try {
      if (!primaryDetail) return;
      await UserActivityService.accessDemand({
        pageName: isConfirm
          ? DemandPage.DEMAND_CONFIRMATION
          : DemandPage.PLACE_DEMAND,
        primaryId: primaryDetail.id,
        ...(notional && isConfirm ? { demand: String(notional) } : {}),
      });
    } catch (error) {
      console.log("error", error);
    }
  }, [isConfirm, notional, primaryDetail]);

  const handleSubmit = (data: DemandFormData) => {
    if (!companyID) return;
    setNotional(data.notional);
    setIsConfirm(true);
  };

  const handleConfirmDemand = async () => {
    try {
      if (!companyID) return;
      setLoading(true);
      if (order) {
        const res = await UserPrimaryService.updateOrder({
          id: order.id,
          demand: String(notional),
        });
        if (res.data.statusCode === 200) {
          navigate(
            generatePath(PAGES.PRIMARY_DEMAND_CONFIRMATION, {
              companyID: companyID,
            })
          );
        }
      } else {
        const res = await UserPrimaryService.createOrder({
          primaryId: Number(companyID),
          demand: String(notional),
        });
        if (res.data.statusCode === 201) {
          navigate(
            generatePath(PAGES.PRIMARY_DEMAND_CONFIRMATION, {
              companyID: companyID,
            })
          );
        }
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
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
        const orderRes = await UserPrimaryService.getOrderByPrimaryId(
          Number(companyID)
        );
        if (orderRes.data.data.order?.id) {
          setNotional(orderRes.data.data.order.demand);
          setOrder(orderRes.data.data.order);
        } else {
          setOrder(undefined);
        }
      } catch (error) {
        toast.error(String(error));
      } finally {
        setLoading(false);
      }
    };

    fetchPrimaryDetail();
  }, [companyID, setLoading, setNotional, setOrder]);

  useEffect(() => {
    saveUserActivity();
  }, [saveUserActivity]);

  return (
    <>
      {typeAccess === "full" && primaryDetail && (
        <Card sx={{ width: "100%", maxWidth: 772, m: "auto" }}>
          <CardContent>
            {isConfirm ? (
              <>
                <Typography level="h4" sx={{ mb: 20 }}>
                  Demand - Confirmation
                </Typography>
                <Typography level="body1" sx={{ mb: 20 }}>
                  Please double check the details of your demand before
                  confirming. Placing a demand on Astra is non binding. A sales
                  representative will contact you to process your request.
                </Typography>
              </>
            ) : (
              <Typography level="h4" sx={{ mb: 28 }}>
                Place Demand
              </Typography>
            )}
            <Box>
              <Typography level="h5" sx={{ mb: 20 }}>
                Company
              </Typography>
              <Box sx={{ width: { mobile: "100%", laptop: "50%" } }}>
                <CardPrimaryUser company={primaryDetail} showBorder />
              </Box>
            </Box>

            {isConfirm ? (
              <>
                <Box mt={"20px"}>
                  <Typography level="h5">Your Demand</Typography>
                  <Typography
                    level="subtitle2"
                    sx={(theme) => ({
                      color: theme.color["secondary-light"],
                      marginTop: "12px",
                    })}
                  >
                    Notional
                  </Typography>
                  <Typography level="body1">
                    ${number2USD(Number(notional))}
                  </Typography>
                </Box>
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
                    onClick={() => setIsConfirm(false)}
                    startDecorator={<RiArrowLeftLine />}
                    sx={{ maxWidth: { laptop: "177px" }, whiteSpace: "nowrap" }}
                  >
                    Amend Details
                  </Button>
                  <Button
                    variant="solid"
                    onClick={handleConfirmDemand}
                    endDecorator={<RiCheckLine />}
                    sx={{ maxWidth: { laptop: "196px" }, whiteSpace: "nowrap" }}
                  >
                    Confirm Demand
                  </Button>
                </Box>
              </>
            ) : (
              <Box mt={28}>
                <Typography
                  level="h5"
                  sx={{
                    marginBottom: "20px",
                  }}
                >
                  Your Demand
                </Typography>
                <FormWrapper onSubmit={handleSubmit}>
                  <NotionalForm company={primaryDetail} notional={notional} />
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: { mobile: "column", laptop: "row" },
                      justifyContent: "space-between",
                      gap: 12,
                      mt: 65,
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={navigateToPrimaryDetail}
                      startDecorator={<RiArrowLeftLine />}
                      sx={{
                        maxWidth: { laptop: "132px" },
                        whiteSpace: "nowrap",
                      }}
                    >
                      Go Back
                    </Button>
                    <Button
                      type="submit"
                      variant="solid"
                      endDecorator={<RiArrowRightLine />}
                      sx={{
                        maxWidth: { laptop: "136px" },
                        whiteSpace: "nowrap",
                      }}
                    >
                      Continue
                    </Button>
                  </Box>
                </FormWrapper>
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default PlaceDemand;
