import { Grid, Typography } from "@mui/joy";

import { Stack } from "@mui/joy";

const CameraListPage = () => {
  return (
    <>
      <Stack height="calc(100vh - 51px)" gap={24}>
        <Grid
          container
          sx={{
            backgroundColor: "transparent",
            justifyContent: "space-between",
          }}
        >
          <Typography level="h4">Camera List</Typography>
        </Grid>
      </Stack>
    </>
  );
};

export default CameraListPage;
