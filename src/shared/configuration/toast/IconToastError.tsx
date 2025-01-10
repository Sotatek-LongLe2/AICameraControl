import { Box } from "@mui/joy";
import { RiCloseFill } from "@remixicon/react";
import { colors } from "src/styles/colors";

interface IconToastErrorProps {
  icon?: false | React.ReactElement;
}

export const IconToastError = ({ icon: Icon }: IconToastErrorProps) => {
  return Icon ? (
    Icon
  ) : (
    <Box
      sx={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        backgroundColor: colors["error-main"],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <RiCloseFill
        size={16}
      />
    </Box>
  );
};
