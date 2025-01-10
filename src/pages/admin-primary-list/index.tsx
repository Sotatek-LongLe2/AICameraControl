import { Box, Button, Grid, TabList, TabPanel, Typography } from "@mui/joy";
import Tab from "@mui/joy/Tab";
import Tabs from "@mui/joy/Tabs";
import { RiAddLine } from "@remixicon/react";
import { PAGES_ADMIN } from "src/constants/router.ts";
import { colors } from "../../styles/colors.ts";
import { PrimaryTable } from "./PrimaryTable.tsx";

export default function AdminPrimaryList() {
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
          Primary
        </Typography>
        <Button
          type="submit"
          variant="solid"
          sx={{ height: "42px" }}
          startDecorator={<RiAddLine />}
          onClick={() => {
            window.navigate(PAGES_ADMIN.PRIMARY.ADD);
          }}
        >
          Add New
        </Button>
      </Grid>
      <Tabs
        aria-label="Admin Primary"
        defaultValue={0}
        sx={{ backgroundColor: "transparent" }}
      >
        <TabList disableUnderline>
          <Tab>Active</Tab>
          <Tab>Closed</Tab>
        </TabList>
        <TabPanel value={0} sx={{ padding: 0 }}>
          <PrimaryTable isActiveTable />
        </TabPanel>
        <TabPanel value={1} sx={{ padding: 0 }}>
          <PrimaryTable />
        </TabPanel>
      </Tabs>
    </Box>
  );
}
