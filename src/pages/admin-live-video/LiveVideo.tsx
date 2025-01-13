import { Box, Grid, Typography } from "@mui/joy";
import { colors } from "src/styles/colors";

export type TErrorMessage = {
  discordToken: string;
};

export const LiveVideoPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: colors["body-bg"],
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid
        container
        sx={{ backgroundColor: "transparent", justifyContent: "space-between" }}
      >
        <Typography level="h4" sx={{ mb: 28 }}>
          Live Video
        </Typography>
      </Grid>
    </Box>
  );
};
