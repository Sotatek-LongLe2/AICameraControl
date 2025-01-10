import {
  Box,
  Step,
  stepClasses,
  StepIndicator,
  stepIndicatorClasses,
  Stepper,
  Typography,
} from "@mui/joy";
import React from "react";
import Check from "src/assets/check-line.svg";
// import { useUserStore } from "src/store/userStore";
import { colors } from "src/styles/colors";

interface StepItem {
  title: string;
  description: string;
}

interface IProps {
  steps: StepItem[];
  currentStep: number;
}

const StepSection: React.FC<IProps> = ({ steps, currentStep }) => {
  // const { progress } = useUserStore();
  return (
    <Stepper
      orientation="vertical"
      sx={(theme) => ({
        "--Stepper-verticalGap": "20px",
        "--StepIndicator-size": "20px",
        "--Step-gap": "10px",
        "--Step-connectorInset": "0.5px",
        "--Step-connectorRadius": "20px",
        "--Step-connectorThickness": "3px",
        "--Step-connectorBg": colors["primary-opacity-light"],

        [`& .${stepClasses.active}`]: {
          [`& .${stepIndicatorClasses.root}`]: {
            border: `5px solid ${colors["primary-main"]}`,
          },
        },
        [`& .${stepIndicatorClasses.root}`]: {
          border: `3px solid ${colors["primary-opacity-light"]}`,
        },
        [theme.breakpoints.down("laptop")]: {
          display: "none",
        },
      })}
    >
      {steps.map((step, index) => (
        <Step
          key={index}
          active={currentStep === index + 1}
          completed={currentStep < index + 1}
          indicator={
            <StepIndicator
              variant={currentStep <= index + 1 ? "soft" : "solid"}
              color={currentStep < index + 1 ? "neutral" : "primary"}
            >
              {currentStep <= index + 1 ? (
                ""
              ) : (
                <Box component="img" src={Check} alt="" />
              )}
              {/* Check progress from server */}
              {/* {progress && progress.step <= index ? (
                ""
              ) : (
                <Box component="img" src={Check} alt="" />
              )} */}
            </StepIndicator>
          }
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Box sx={{ opacity: currentStep < index + 1 ? 0.4 : 1 }}>
              <Typography level="h4" fontWeight={500}>
                0{index + 1}
              </Typography>
            </Box>
            <Box>
              <Typography level="body1-500">{step.title}</Typography>
              <Typography level="body2">{step.description}</Typography>
            </Box>
          </Box>
        </Step>
      ))}
    </Stepper>
  );
};

export default StepSection;
