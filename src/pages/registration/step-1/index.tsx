import { Box } from "@mui/joy";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import FormWrapper from "src/components/common/form/FormWrapper";
import FormWithStep from "src/components/common/FormWithStep";
import TopDisplay from "src/components/layout/TopDisplay";
import PAGES from "src/constants/router";
import { UserInformationService } from "src/services/UserInformationService";
import { PersonalDetailFormData } from "src/shared/types";
import PersonalDetailsForm from "./PersonalDetailsForm";
import { useUserStore } from "src/store/userStore";
import { useAppStore } from "src/store/appStore";

const Step1 = () => {
  const navigate = useNavigate();
  const { progress, updateProgress } = useUserStore();
  const setLoading = useAppStore((state) => state.setLoading);

  const handleSubmit = async (data: PersonalDetailFormData) => {
    try {
      if (!progress) return;
      setLoading(true);

      const res = await UserInformationService.saveIdentity({
        ...data,
        dateOfBirth: dayjs(data.dateOfBirth).format("DD/MM/YYYY"),
      });
      if (res.data.statusCode === 200) {
        updateProgress({
          step: progress.step > 1 ? progress.step : 1,
        });
        navigate(PAGES.REGISTRATION.STEP_2);
      }
    } catch (error) {
      console.log("ERROR: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWithStep currentStep={1}>
      <Box sx={{ display: { mobile: "block", laptop: "none" } }}>
        <TopDisplay />
      </Box>
      <FormWrapper onSubmit={handleSubmit}>
        <PersonalDetailsForm />
      </FormWrapper>
    </FormWithStep>
  );
};

export default Step1;
