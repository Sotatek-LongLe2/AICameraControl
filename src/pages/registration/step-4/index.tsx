import { Box } from "@mui/joy";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormWrapper from "src/components/common/form/FormWrapper";
import FormWithStep from "src/components/common/FormWithStep";
import TopDisplay from "src/components/layout/TopDisplay";
import PAGES from "src/constants/router";
import { UserInformationService } from "src/services/UserInformationService";
import { IReqSaveRiskProfile } from "src/services/UserInformationService.types";
import { RiskProfileFormData } from "src/shared/types";
import RiskProfileForm from "./RiskProfileForm";
import { useUserStore } from "src/store/userStore";
import { useAppStore } from "src/store/appStore";

const Step4 = () => {
  const navigate = useNavigate();
  const { progress, updateProgress } = useUserStore();
  const [isError, setIsError] = useState(false);
  const setLoading = useAppStore((state) => state.setLoading);

  const convertToIntObject = (obj: Record<string, string>) => {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, parseInt(value, 10)])
    );
  };

  const handleSubmit = async (data: RiskProfileFormData) => {
    try {
      if (!progress) return;
      if (progress.step < 3) return;
      setIsError(false);
      setLoading(true);
      const res = await UserInformationService.saveRiskProfile({
        data: {
          ...convertToIntObject(data),
        },
      } as IReqSaveRiskProfile);
      if (res.data.statusCode === 200) {
        updateProgress({
          step: progress.step > 4 ? progress.step : 4,
        });
        navigate(PAGES.REGISTRATION.STEP_5);
      }
    } catch (error) {
      console.log("ERROR: ", error);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <FormWithStep currentStep={4}>
      <Box sx={{ display: { mobile: "block", laptop: "none" } }}>
        <TopDisplay />
      </Box>
      <FormWrapper onSubmit={handleSubmit} mode="onChange">
        <RiskProfileForm isError={isError} />
      </FormWrapper>
    </FormWithStep>
  );
};

export default Step4;
