import { Box } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import FormWrapper from "src/components/common/form/FormWrapper";
import FormWithStep from "src/components/common/FormWithStep";
import TopDisplay from "src/components/layout/TopDisplay";
import PAGES from "src/constants/router";
import { UserInformationService } from "src/services/UserInformationService";
import { FinanceFormData } from "src/shared/types";
import FinanceForm from "./FinanceForm";
import { useUserStore } from "src/store/userStore";
import { useAppStore } from "src/store/appStore";

const Step2 = () => {
  const navigate = useNavigate();
  const { progress, updateProgress } = useUserStore();
  const setLoading = useAppStore((state) => state.setLoading);

  const handleSubmit = async (data: FinanceFormData) => {
    try {
      if (!progress) return;
      if (progress.step < 1) return;
      setLoading(true);
      const res = await UserInformationService.saveFinance({
        data: {
          ...data,
          isLiabilities: Number(data.isLiabilities),
        },
      });
      if (res.data.statusCode === 200) {
        updateProgress({
          step: progress.step > 2 ? progress.step : 2,
        });
        navigate(PAGES.REGISTRATION.STEP_3);
      }
    } catch (error) {
      console.log("ERROR: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWithStep currentStep={2}>
      <Box sx={{ display: { mobile: "block", laptop: "none" } }}>
        <TopDisplay />
      </Box>
      <FormWrapper onSubmit={handleSubmit}>
        <FinanceForm />
      </FormWrapper>
    </FormWithStep>
  );
};

export default Step2;
