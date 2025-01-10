import { Button, Grid, Stack, TabList, TabPanel, Typography } from "@mui/joy";
import Tab from "@mui/joy/Tab";
import Tabs from "@mui/joy/Tabs";
import { RiAddLine, RiSendPlaneLine } from "@remixicon/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IAdminCompanyItem,
  IAdminUserItem,
} from "src/services/AdminSecondaryService.types.ts";
import { useSharedLists } from "src/shared/hooks/useSharedLists.ts";
import { PAGES_ADMIN } from "../../constants/router.ts";
import { colors } from "../../styles/colors.ts";
import ActiveTable from "./ActiveTable.tsx";
import { InvitedTab } from "./AdminCustomerList.const.ts";
import InvitedTable from "./InvitedTable.tsx";
import RemovedTable from "./RemovedTable.tsx";

export interface ITabUserCustomerProps {
  handleTabChange?: (newValue: number) => void;
  listUser: IAdminUserItem[];
  listCompany: IAdminCompanyItem[];
  activeTab: number;
}

export default function AdminUserCustomerList() {
  const {
    listUser,
    listAdminCompany,
    refetch: refetchDataFilter,
  } = useSharedLists();
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const [activeTab, setActiveTab] = useState(() => {
    return parseInt(params.get("tab") || "0");
  });

  const handleTabChange = (newValue: number) => {
    setActiveTab(newValue);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("tab", newValue.toString());
    window.history.pushState({}, "", newUrl);
  };

  return (
    <Stack height="calc(100vh - 88px)">
      <Grid
        container
        sx={{ backgroundColor: "transparent", justifyContent: "space-between" }}
      >
        <Typography level="h4" sx={{ mb: 28 }}>
          Customers
        </Typography>
        <Grid container>
          <Button
            type="submit"
            variant="solid"
            sx={{ height: "42px" }}
            endDecorator={<RiAddLine />}
            onClick={() => navigate(PAGES_ADMIN.CUSTOMERS.CREATE)}
          >
            Create Account
          </Button>
          <Button
            type="submit"
            variant="solid"
            sx={{ height: "42px", marginLeft: "18px" }}
            endDecorator={<RiSendPlaneLine />}
            onClick={() => navigate(PAGES_ADMIN.CUSTOMERS.INVITE)}
          >
            Send Invitation Code
          </Button>
        </Grid>
      </Grid>
      <Tabs
        aria-label="Admin Primary"
        defaultValue={0}
        sx={{ backgroundColor: "transparent" }}
        value={activeTab}
        onChange={(_, newValue) => handleTabChange(newValue as number)}
      >
        <TabList disableUnderline>
          {["Active", "Invited", "Removed"].map((label) => (
            <Tab
              key={label}
              sx={{
                color: "white",
                borderBottom: `1px solid ${colors.divider}`,
                fontSize: "17px",
                lineHeight: "26px",
                fontWeight: 500,
                fontFamily: "Jost",
                "&.Mui-selected": {
                  color: colors["primary-main"],
                  backgroundColor: "transparent",
                },
              }}
            >
              {label}
            </Tab>
          ))}
        </TabList>

        <TabPanel
          value={InvitedTab.ACTIVE}
          sx={{ padding: 0, flex: 1, overflow: "hidden" }}
        >
          <ActiveTable
            listUser={listUser}
            listCompany={listAdminCompany}
            activeTab={activeTab}
            refetchDataFilter={refetchDataFilter}
          />
        </TabPanel>
        <TabPanel
          value={InvitedTab.INVITED}
          sx={{ padding: 0, flex: 1, overflow: "hidden" }}
        >
          <InvitedTable />
        </TabPanel>
        <TabPanel
          value={InvitedTab.REMOVED}
          sx={{ padding: 0, flex: 1, overflow: "hidden" }}
        >
          <RemovedTable
            listUser={listUser}
            listCompany={listAdminCompany}
            activeTab={activeTab}
          />
        </TabPanel>
      </Tabs>
    </Stack>
  );
}
