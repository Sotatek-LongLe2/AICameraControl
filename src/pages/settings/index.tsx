import { Box, Tab, TabList, TabPanel, Tabs, Typography } from "@mui/joy";
import { colors } from "src/styles/colors";
import { shadow } from "src/styles/shadow";
import { PersonalDetail } from "./personal-detail";
import { UpdatePassword } from "./update-password";
import { useMedia } from "src/shared/hooks/useMedia";

const tabs = ["Personal Details", "Update Password"];

export const Settings = () => {
  const { isDesktop } = useMedia();

  return (
    <Box maxWidth={{ mobile: 366, laptop: "unset" }} marginX="auto">
      <Typography level="h4">Settings</Typography>

      <Tabs
        aria-label="User Settings"
        defaultValue={0}
        orientation={isDesktop ? "vertical" : "horizontal"}
        sx={{
          marginTop: "24px",
          background: "transparent",
          justifyContent: { laptop: "center" },
        }}
      >
        <TabList disableUnderline sx={{ flex: 1 }}>
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              variant="btn-medium"
              sx={{
                padding: "7px 22px",
                justifyContent: "flex-end",
              }}
            >
              {tab}
            </Tab>
          ))}
        </TabList>
        <Box
          bgcolor={colors.paper}
          boxShadow={shadow.xs}
          borderRadius="6px"
          maxWidth="772px"
          width="100%"
        >
          <TabPanel value={0} sx={{ padding: "20px" }}>
            <PersonalDetail />
          </TabPanel>
          <TabPanel value={1} sx={{ padding: "20px" }}>
            <UpdatePassword />
          </TabPanel>
        </Box>
        <Box display={{ mobile: "none", laptop: "block" }} flex={1} />
      </Tabs>
    </Box>
  );
};
