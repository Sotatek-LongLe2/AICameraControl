import { Card, CardContent, Divider } from "@mui/joy";
import { PropsWithChildren } from "react";

interface IProps {
  currentStep: number;
}

const FormWithStep: React.FC<PropsWithChildren<IProps>> = ({ children }) => {
  return (
    <Card sx={{ display: "flex", flexDirection: "row" }}>
      {/* Step */}
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
