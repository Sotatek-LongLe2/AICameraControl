import { Card, CardContent, Typography } from "@mui/joy";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormWrapper from "src/components/common/form/FormWrapper";
import { AdminSecondaryService } from "src/services/AdminSecondaryService";
import { useAppStore } from "src/store/appStore";
import IndicationForm, { SecondaryIndicationFormData } from "../IndicationForm";

const EditSecondaryIndication = () => {
  const setLoading = useAppStore((state) => state.setLoading);
  const [errorSharePriceCode, setErrorSharePriceCode] = useState<string | null>(
    null
  );
  const params = useParams();
  const [defaultValues, setDefaultValues] =
    useState<SecondaryIndicationFormData>();
  const id = Number(params.id);

  const handleSubmit = async (data: SecondaryIndicationFormData) => {
    try {
      setLoading(true);
      const res = await AdminSecondaryService.createOrUpdateSecondIndication({
        ...data,
        id: Number(data.id),
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
        toast.success("Indication edited");
        window.history.back();
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

  const fetchIoiDetail = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await AdminSecondaryService.getSecondaryById({
        secondaryId: Number(id),
      });

      const newValues: SecondaryIndicationFormData = {
        id: id,
        userId: data.data.userId,
        companyId: data.data.companyId,
        side: data.data.side.toString(),
        notional: data.data.notional,
        sharePrice: data.data.sharePrice,
        valuation: data.data.valuation,
        fee: data.data.fee,
        minSize: data.data.minSize,
        securityType: data.data.securityType.toString(),
        ownershipStructure: data.data.ownershipStructure.toString(),
        jurisdiction: data.data.jurisdiction,
        docLanguage: data.data.docLanguage || "",
        premiumDiscount: data.data.premiumDiscount,
      };

      setDefaultValues(newValues);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [id, setLoading]);

  useEffect(() => {
    fetchIoiDetail();
  }, [fetchIoiDetail, id]);

  return (
    <Card sx={{ width: 772 }}>
      <CardContent>
        <Typography level="h4" sx={{ mb: 28 }}>
          Edit Indication #{id}
        </Typography>
        <FormWrapper onSubmit={handleSubmit}>
          <IndicationForm
            defaultValues={defaultValues}
            errorSharePriceCode={errorSharePriceCode}
            setErrorSharePriceCode={setErrorSharePriceCode}
          />
        </FormWrapper>
      </CardContent>
    </Card>
  );
};

export default EditSecondaryIndication;
