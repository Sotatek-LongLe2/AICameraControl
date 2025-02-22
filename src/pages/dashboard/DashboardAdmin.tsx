import { Box, Grid, Typography } from "@mui/joy";
import { colors } from "src/styles/colors";

const DashboardAdmin = () => {
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
          Dashboard Admin
        </Typography>
      </Grid>
    </Box>
  );
};

export default DashboardAdmin;
