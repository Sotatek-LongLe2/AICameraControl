import { Box, Button, Checkbox, styled, Typography } from "@mui/joy";
import { RiArrowRightLine } from "@remixicon/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoAstra } from "src/assets/icon";
import PAGES from "src/constants/router";
import { UserService } from "src/services/UserService";
import { useUserStore } from "src/store/userStore";
import { colors } from "src/styles/colors";
import RiskAndWarning from "./RiskAndWarning";
import TermsAndConditions from "./TermAndCondition";
import PrivacyPolicy from "./PrivacyPolicy";

const TextDetail = styled(Typography)(() => ({
  color: colors["text-secondary"],
}));

export default function RiskDisclosurePage() {
  const navigate = useNavigate();
  const [isRiskAndWaringChecked, setIsRiskAndWaringChecked] = useState(true);
  const [isTermAndConditionChecked, setIsTermAndConditionChecked] =
    useState(true);
  const [isPrivacyPolicyChecked, setIsPrivacyPolicyChecked] = useState(true);
  const updateProgress = useUserStore((s) => s.updateProgress);

  const handleRiskContinue = async () => {
    try {
      const res = await UserService.signRiskDisclosure();
      if (res.data.statusCode === 201) {
        updateProgress({
          riskDisclosureSigned: 1,
        });
        navigate(PAGES.VERIFY_PHONE);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <Box
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          borderRadius: "6px",
          maxWidth: "608px",
          margin: "auto",
          padding: "48px 0",
          [theme.breakpoints.down("laptop")]: {
            backgroundColor: colors.paper,
            padding: "48px 12px 12px 12px",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <LogoAstra width={60} height={53} />
          <Typography
            level="h3"
            sx={{
              fontWeight: 500,
              color: colors["text-primary"],
              marginTop: "24px",
            }}
          >
            Register to Astra
          </Typography>
          <TextDetail
            level="body1"
            sx={{
              marginTop: "4px",
            }}
          >
            Please take a few minutes to fill in your details.
          </TextDetail>
        </Box>

        {/* Risk and Warning */}
        <RiskAndWarning />
        <Checkbox
          label={"I understand"}
          checked={isRiskAndWaringChecked}
          onChange={() => setIsRiskAndWaringChecked(!isRiskAndWaringChecked)}
          sx={{ ml: 9, mt: 7 }}
        />
        {/* Terms and Conditions */}
        <TermsAndConditions />
        <Checkbox
          label={"I understand"}
          checked={isTermAndConditionChecked}
          onChange={() =>
            setIsTermAndConditionChecked(!isTermAndConditionChecked)
          }
          sx={{ ml: 9, mt: 7 }}
        />
        {/* Privacy Policy */}
        <PrivacyPolicy />
        <Checkbox
          label={"I understand"}
          checked={isPrivacyPolicyChecked}
          onChange={() => setIsPrivacyPolicyChecked(!isPrivacyPolicyChecked)}
          sx={{ ml: 9, mt: 7 }}
        />

        <Box
          sx={(theme) => ({
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mt: 24,
            [theme.breakpoints.down("laptop")]: {
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "27px",
            },
          })}
        >
          <Button
            variant="solid"
            endDecorator={<RiArrowRightLine />}
            onClick={handleRiskContinue}
            disabled={
              !isRiskAndWaringChecked ||
              !isTermAndConditionChecked ||
              !isPrivacyPolicyChecked
            }
            sx={(theme) => ({
              [theme.breakpoints.down("laptop")]: {
                width: "100%",
              },
            })}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </>
  );
}
