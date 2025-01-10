import { Box, Tab, TabList, TabPanel, Tabs, Typography } from "@mui/joy";
import { TableIndications } from "./TableIndications";
import { TYPE_INDICATION } from "src/services/UserService.types";

export const Indications = () => {
  return (
    <Box>
      <Typography level="h4">Indications</Typography>

      <Tabs
        aria-label="Your Indications"
        defaultValue={0}
        sx={{
          marginTop: "24px",
          background: "transparent",
        }}
      >
        <TabList disableUnderline>
          <Tab>Open</Tab>
          <Tab>Closed</Tab>
        </TabList>
        <Box borderRadius="6px">
          <TabPanel value={0} sx={{ padding: 0 }}>
            <TableIndications type={TYPE_INDICATION.OPEN} />
          </TabPanel>
          <TabPanel value={1} sx={{ padding: 0 }}>
            <TableIndications type={TYPE_INDICATION.CLOSED} />
          </TabPanel>
        </Box>
      </Tabs>
    </Box>
  );
};
