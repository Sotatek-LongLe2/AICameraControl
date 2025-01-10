import { Box, Typography } from "@mui/joy";
import { colors } from "src/styles/colors";
import { RiEmotionNormalLine } from "@remixicon/react";

export const ErrorRegister = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      my: 16,
    }}
  >
    <RiEmotionNormalLine size={57} color={colors["astra-pink"]} />
    <Typography
      level="h5"
      fontFamily="Jost"
      fontWeight={500}
      sx={{ color: colors["astra-pink"] }}
    >
      Some of your answers seem off. Why don’t you look back and change them if
      needed?
    </Typography>
  </Box>
);
