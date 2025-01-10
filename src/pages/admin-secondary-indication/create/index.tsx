import { Card, CardContent, Typography } from "@mui/joy";
import FormWrapper from "src/components/common/form/FormWrapper";
import IndicationForm, { SecondaryIndicationFormData } from "../IndicationForm";
import { AdminSecondaryService } from "src/services/AdminSecondaryService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PAGES_ADMIN } from "src/constants/router";
import { useAppStore } from "src/store/appStore";
import { useState } from "react";

const defaultValue = {
  userId: "",
  companyId: "",
  side: "0",
  notional: "",
  sharePrice: "",
  valuation: "",
  fee: "",
  minSize: "",
  securityType: "",
  ownershipStructure: "",
  jurisdiction: "",
  docLanguage: "",
  premiumDiscount: "-",
};

const CreateSecondaryIndication = () => {
  const navigate = useNavigate();
  const setLoading = useAppStore((state) => state.setLoading);
  const [errorSharePriceCode, setErrorSharePriceCode] = useState<string | null>(
    null
  );

  const handleSubmit = async (data: SecondaryIndicationFormData) => {
    try {
      setLoading(true);
      const res = await AdminSecondaryService.createOrUpdateSecondIndication({
        ...data,
        userId: Number(data.userId),
        companyId: Number(data.companyId),
        side: Number(data.side),
        securityType: Number(data.securityType),
        ownershipStructure: Number(data.ownershipStructure),
        minSize: Number(data.minSize.replace(/,/g, "")).toString(),
        sharePrice: Number(data.sharePrice.replace(/,/g, "")).toString(),
        valuation: Number(data.valuation.replace(/,/g, "")).toString(),
        fee: Number(data.fee.replace(/,/g, "")).toString(),
        notional: Number(data.notional.replace(/,/g, "")).toString(),
        premiumDiscount: data.premiumDiscount
          ? Number(data.premiumDiscount.replace(/,/g, "")).toString()
          : data.premiumDiscount,
      });
      if (res.data.statusCode === 201) {
        toast.success("Indication created");
        navigate(PAGES_ADMIN.SECONDARY.INDEX + `?side=${data.side}`);
      }
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = error as any;

      if (err.response.data.field === "sharePrice") {
        setErrorSharePriceCode(err.response.data.code);
      } else {
        setErrorSharePriceCode(null);
        toast.error(
          `${
            typeof err?.response?.data?.message === "string"
              ? err?.response?.data?.message
              : err?.response?.data?.message[0]
          }`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ width: 772 }}>
      <CardContent>
        <Typography level="h4" sx={{ mb: 28 }}>
          Create Indication
        </Typography>
        <FormWrapper onSubmit={handleSubmit} defaultValues={defaultValue}>
          <IndicationForm
            errorSharePriceCode={errorSharePriceCode}
            setErrorSharePriceCode={setErrorSharePriceCode}
          />
        </FormWrapper>
      </CardContent>
    </Card>
  );
};

export default CreateSecondaryIndication;
