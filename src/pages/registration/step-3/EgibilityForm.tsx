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
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ErrorRegister } from "src/components/common/ErrorRegister";
import FormItem from "src/components/common/form/FormItem";
import { EGIBILITY_QUESTIONS } from "src/constants/questions";
import PAGES from "src/constants/router";
import { UserInformationService } from "src/services/UserInformationService";
import { EligibilityFormData, IField } from "src/shared/types";
import { useAppStore } from "src/store/appStore";

interface EgibilityFormProps {
  isAnswerError: boolean;
}

const ELIGIBILITY_FIELDS: Array<IField<EligibilityFormData>> =
  EGIBILITY_QUESTIONS.map((item) => ({
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

const EgibilityForm: React.FC<EgibilityFormProps> = ({ isAnswerError }) => {
  const navigate = useNavigate();
  const {
    reset,
    formState: { isValid },
  } = useFormContext();
  const setLoading = useAppStore((state) => state.setLoading);

  useEffect(() => {
    const getStepDetail = async () => {
      try {
        setLoading(true);
        const res = await UserInformationService.getStepDetail(3);
        reset(res.data.data?.eligibility);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    getStepDetail();
  }, [reset, setLoading]);

  const Top = () => (
    <Box sx={{ mb: 24 }}>
      <Typography level="h4" sx={{ mb: 24 }}>
        Eligibility
      </Typography>
      <Typography level="body1">
        We would like to make sure you have the necessary knowledge to use our
        application before we give you access. Please take this quick test.
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
        onClick={() => navigate(PAGES.REGISTRATION.STEP_2)}
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
        {ELIGIBILITY_FIELDS.map((field, index) => (
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
      {isAnswerError && <ErrorRegister />}
      <Footer />
    </>
  );
};

export default EgibilityForm;
