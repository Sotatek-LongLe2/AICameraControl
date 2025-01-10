import { Box } from "@mui/joy";
import { RiCheckLine } from "@remixicon/react";
import { colors } from "src/styles/colors";

interface IconToastSuccessProps {
  icon?: false | React.ReactElement;
}

export const IconToastSuccess = ({ icon: Icon }: IconToastSuccessProps) => {
  return Icon ? (
    Icon
  ) : (
    <Box
      sx={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        backgroundColor: colors["success-main"],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <RiCheckLine size={16} color="white" />
    </Box>
  );
};
