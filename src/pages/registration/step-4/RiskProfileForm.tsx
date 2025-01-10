import {
  Box,
  Button,
  FormControl,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/joy";
import { RiArrowLeftLine, RiArrowRightLine } from "@remixicon/react";
import React, { useCallback, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ErrorRegister } from "src/components/common/ErrorRegister";
import FormItem from "src/components/common/form/FormItem";
import { RISK_PROFILE_QUESTIONS } from "src/constants/questions";
import PAGES from "src/constants/router";
import { UserInformationService } from "src/services/UserInformationService";
import { IField, RiskProfileFormData } from "src/shared/types";
import { useAppStore } from "src/store/appStore";

interface RiskProfileFormProps {
  isError: boolean;
}

const RISK_PROFILE_FIELDS: Array<IField<RiskProfileFormData>> =
  RISK_PROFILE_QUESTIONS.map((item) => ({
    name: item.name,
    label: item.question,
    size: {
      mobile: 12,
      laptop: 12,
    },
    rules: {
      required: true,
    },
    renderItem: (field) => (
      <FormControl>
        <RadioGroup {...field} value={field.value || ""}>
          {item.answers.map((answer, index) => (
            <Radio key={index} value={answer.value} label={answer.label} />
          ))}
        </RadioGroup>
      </FormControl>
    ),
  }));

const RiskProfileForm: React.FC<RiskProfileFormProps> = ({ isError }) => {
  const navigate = useNavigate();
  const {
    reset,
    formState: { isValid },
  } = useFormContext();
  const setLoading = useAppStore((state) => state.setLoading);

  const convertToStringObject = useCallback((obj: Record<string, number>) => {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, String(value)])
    );
  }, []);

  useEffect(() => {
    const getStepDetail = async () => {
      try {
        setLoading(true);
        const res = await UserInformationService.getStepDetail(4);
        const riskProfile = res.data.data?.riskProfile as Record<
          string,
          number
        >;
        reset(convertToStringObject(riskProfile));
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    getStepDetail();
  }, [convertToStringObject, reset, setLoading]);

  const Top = () => (
    <Box sx={{ mb: 24 }}>
      <Typography level="h4" sx={{ mb: 24 }}>
        Risk Profile
      </Typography>
      <Typography level="body1">
        This questionnaire is required by the SFC. We will use it to determine
        how much of your portfolio you can invest through Astra.
      </Typography>
    </Box>
  );

  const Footer = () => (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        mt: 24,
      }}
    >
      <Button
        variant="outlined"
        onClick={() => navigate(PAGES.REGISTRATION.STEP_3)}
        startDecorator={<RiArrowLeftLine />}
      >
        Go Back
      </Button>
      <Button
        type="submit"
        disabled={!isValid}
        endDecorator={<RiArrowRightLine />}
      >
        Continue
      </Button>
    </Box>
  );

  return (
    <>
      <Top />
      <Grid container spacing={16}>
        {RISK_PROFILE_FIELDS.map((field, index) => (
          <Grid
            key={index}
            mobile={field.size?.mobile}
            laptop={field.size?.laptop}
          >
            <FormItem
              name={field.name as string}
              label={field.label}
              labelStyle={{ fontSize: 18, fontWeight: 500, fontFamily: "Jost" }}
              rules={field.rules}
            >
              {(fieldProps) => field.renderItem(fieldProps)}
            </FormItem>
          </Grid>
        ))}
      </Grid>
      {isError && <ErrorRegister />}
      <Footer />
    </>
  );
};

export default RiskProfileForm;
