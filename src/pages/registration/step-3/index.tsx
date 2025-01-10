import { Box } from "@mui/joy";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormWrapper from "src/components/common/form/FormWrapper";
import FormWithStep from "src/components/common/FormWithStep";
import TopDisplay from "src/components/layout/TopDisplay";
import PAGES from "src/constants/router";
import { UserInformationService } from "src/services/UserInformationService";
import { EligibilityFormData } from "src/shared/types";
import EgibilityForm from "./EgibilityForm";
import { useUserStore } from "src/store/userStore";
import { useAppStore } from "src/store/appStore";

const Step3 = () => {
  const navigate = useNavigate();
  const { progress, updateProgress } = useUserStore();
  const [isAnswerError, setIsAnswerError] = useState(false);
  const setLoading = useAppStore((state) => state.setLoading);

  const handleSubmit = async (data: EligibilityFormData) => {
    try {
      if (!progress) return;
      if (progress.step < 2) return;
      setIsAnswerError(false);
      setLoading(true);
      const res = await UserInformationService.saveEligibility({
        data,
      });
      if (res.data.statusCode === 200) {
        updateProgress({
          step: progress.step > 3 ? progress.step : 3,
        });
        navigate(PAGES.REGISTRATION.STEP_4);
      }
    } catch (error) {
      console.log("ERROR: ", error);
      setIsAnswerError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <FormWithStep currentStep={3}>
      <Box sx={{ display: { mobile: "block", laptop: "none" } }}>
        <TopDisplay />
      </Box>
      <FormWrapper onSubmit={handleSubmit} mode="onChange">
        <EgibilityForm isAnswerError={isAnswerError} />
      </FormWrapper>
    </FormWithStep>
  );
};

export default Step3;
