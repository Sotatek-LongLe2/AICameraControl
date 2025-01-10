import PAGES from "src/constants/router";
import { IProgress } from "src/store/userStore";
import { unstable_batchedUpdates } from "react-dom"; // or 'react-native'
import { useAuthStore } from "src/store/authStore";

const validateStep = (progress: IProgress) => {
  const { riskDisclosureSigned, phoneVerified, step } = progress ?? {};

  unstable_batchedUpdates(() => {
    useAuthStore.getState().setIsLogined(true);
    // STEP = 5, 6: Partial access
    useAuthStore
      .getState()
      .setPartialAccess(step === 5 || step === 6 ? "partial" : "undefined");
  });

  if (!riskDisclosureSigned) {
    return PAGES.RISK_DISCLOSURE;
  }

  if (!phoneVerified) {
    return PAGES.VERIFY_PHONE;
  }

  if (Number.isInteger(step) && step !== 6) {
    // Step 6+1: No redirect to page step 7
    const targetPage =
      PAGES.REGISTRATION[
        ("STEP_" + (step + 1)) as keyof typeof PAGES.REGISTRATION
      ];
    return targetPage;
  }

  return;
};

export default validateStep;
