import { Box, Tab, TabList, TabPanel, Tabs, Typography } from "@mui/joy";
import { TableDemands } from "./TableDemands";
import { TYPE_DEMAND } from "src/services/UserService.types";

export const YourDemands = () => {
  return (
    <Box>
      <Typography level="h4">Your Demands</Typography>

      <Tabs
        aria-label="Your Demands"
        defaultValue={0}
        sx={{
          marginTop: "24px",
          background: "transparent",
        }}
      >
        <TabList disableUnderline>
          <Tab>Pending</Tab>
          <Tab>Executed</Tab>
        </TabList>
        <Box borderRadius="6px">
          <TabPanel value={0} sx={{ padding: 0 }}>
            <TableDemands type={TYPE_DEMAND.PENDING} />
          </TabPanel>
          <TabPanel value={1} sx={{ padding: 0 }}>
            <TableDemands type={TYPE_DEMAND.EXECUTED} />
          </TabPanel>
        </Box>
      </Tabs>
    </Box>
  );
};
