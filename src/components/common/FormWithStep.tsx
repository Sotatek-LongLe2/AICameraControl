import { Card, CardContent, Divider } from "@mui/joy";
import { PropsWithChildren } from "react";
import StepSection from "./Step";

interface IProps {
  currentStep: number;
}

const STEPS = [
  {
    title: "Personal Details",
    description: "Email, phone, password",
  },
  {
    title: "Finance",
    description: "Your financial situation",
  },
  {
    title: "Eligibility",
    description: "Quick knowledge check",
  },
  {
    title: "Risk Profile",
    description: "SFC questionnaire",
  },
  {
    title: "Client Agreement",
    description: "E-sign on Docusign",
  },
  {
    title: "Documents",
    description: "Upload proof docs",
  },
];

const FormWithStep: React.FC<PropsWithChildren<IProps>> = ({
  currentStep,
  children,
}) => {
  return (
    <Card sx={{ display: "flex", flexDirection: "row" }}>
      {/* Step */}
      <CardContent
        sx={{ flex: 1, display: { mobile: "none", laptop: "block" } }}
      >
        <StepSection steps={STEPS} currentStep={currentStep} />
      </CardContent>
      <Divider
        orientation="vertical"
        sx={{ display: { mobile: "none", laptop: "block" } }}
      />
      {/* Form */}
      <CardContent sx={{ flex: 3 }}>{children}</CardContent>
    </Card>
  );
};

export default FormWithStep;
