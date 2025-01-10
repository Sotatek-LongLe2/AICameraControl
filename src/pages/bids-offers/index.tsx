import { Box, Tab, TabList, TabPanel, Tabs, Typography } from "@mui/joy";
import { TYPE_BIDS_OFFERS } from "src/services/UserService.types";
import { TableBidsOffers } from "./TableBidsOffers";

export const BidsOffers = () => {
  return (
    <Box>
      <Typography level="h4">Bids and Offers</Typography>

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
            <TableBidsOffers type={TYPE_BIDS_OFFERS.OPEN} />
          </TabPanel>
          <TabPanel value={1} sx={{ padding: 0 }}>
            <TableBidsOffers type={TYPE_BIDS_OFFERS.CLOSED} />
          </TabPanel>
        </Box>
      </Tabs>
    </Box>
  );
};
