import { Box, Button, Typography } from "@mui/joy";
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiQuillPenLine,
} from "@remixicon/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormWithStep from "src/components/common/FormWithStep";
import TopDisplay from "src/components/layout/TopDisplay";
import { EventEnum } from "src/constants/enumBE";
import PAGES from "src/constants/router";
import { DocusignService } from "src/services/DocusignService";
import { UserInformationService } from "src/services/UserInformationService";
import { SocketContext } from "src/socket/SocketContext";
import { useAppStore } from "src/store/appStore";
import { useAuthStore } from "src/store/authStore";
import { useUserStore } from "src/store/userStore";

const Step5 = () => {
  const navigate = useNavigate();
  const { progress, updateProgress } = useUserStore();
  const [isSignedAgreement, setIsSignedAgreement] = useState(false);
  const setLoading = useAppStore((state) => state.setLoading);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const socket = useContext(SocketContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getStepDetail = async () => {
      try {
        setLoading(true);
        const res = await UserInformationService.getStepDetail(5);
        setIsSignedAgreement(
          res.data.data?.agreementSigned === 1 ? true : false
        );
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    getStepDetail();
  }, [setLoading]);

  useEffect(() => {
    socket?.on(EventEnum.SIGN_DOCS_COMPLETE, async (data) => {
      // data: { signed: boolean }
      setIsSignedAgreement(data.signed);
      await refreshToken();
    });

    return () => {
      socket?.off(EventEnum.SIGN_DOCS_COMPLETE);
    };
  }, [refreshToken, socket]);

  const handleSignAgreement = async () => {
    try {
      if (!progress) return;
      if (progress.step < 4) return;
      if (!isSignedAgreement) {
        setIsLoading(true);
        const res = await DocusignService.getDocusignLink();
        if (res.data.statusCode === 200) {
          setTimeout(() => {
            window.open(res.data.data.url, "_blank", "rel=noopener noreferrer");
          });
        } else {
          throw res;
        }
      }
    } catch (error) {
      console.log("ERROR: ", error);
      toast.error(String(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleNavigateToNextStep = () => {
    if (!progress) return;
    if (progress.step < 4) return;

    updateProgress({
      step: progress.step > 5 ? progress.step : 5,
    });
    navigate(PAGES.REGISTRATION.STEP_6);
  };

  const Top = () => (
    <Box sx={{ mb: 24 }}>
      <Typography level="h4" sx={{ mb: 24 }}>
        Client Agreement
      </Typography>
      <Typography level="body1">
        {isSignedAgreement
          ? "We have received your Client Agreement with your signature."
          : "Before accessing Astra, we require you to sign a client document using DocuSign. Please proceed using the link below. You will be redirected to the next step afterwards."}
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
        onClick={() => navigate(PAGES.REGISTRATION.STEP_4)}
        startDecorator={<RiArrowLeftLine />}
      >
        Go Back
      </Button>
      <Button
        onClick={handleNavigateToNextStep}
        disabled={!isSignedAgreement}
        endDecorator={<RiArrowRightLine />}
      >
        Continue
      </Button>
    </Box>
  );

  return (
    <FormWithStep currentStep={5}>
      <Box sx={{ display: { mobile: "block", laptop: "none" } }}>
        <TopDisplay />
      </Box>
      <Top />
      {!isSignedAgreement && (
        <Box sx={{ mb: 24 }}>
          <Button
            loading={isLoading}
            onClick={handleSignAgreement}
            endDecorator={<RiQuillPenLine />}
          >
            Sign Agreement on DocuSign
          </Button>
        </Box>
      )}
      <Footer />
    </FormWithStep>
  );
};

export default Step5;
