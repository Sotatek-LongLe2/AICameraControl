import { Button, Grid, Stack, TabList, TabPanel, Typography } from "@mui/joy";
import Tab from "@mui/joy/Tab";
import Tabs from "@mui/joy/Tabs";
import { RiAddLine } from "@remixicon/react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PAGES_ADMIN } from "src/constants/router.ts";
import { colors } from "../../styles/colors.ts";
import AcceptingBackupOffersTable from "./AcceptingBackupOffersTable.tsx";
import ExecutedTable from "./ExecutedTable.tsx";
import NewListingsTable from "./NewListingsTable.tsx";
import TrashTable from "./TrashTable.tsx";
import UnderContractTable from "./UnderContractTable.tsx";
import {
  IAdminUserItem,
  IAdminCompanyItem,
} from "src/services/AdminSecondaryService.types.ts";
import { useAppStore } from "src/store/appStore.ts";
import { AdminSecondaryService } from "src/services/AdminSecondaryService.ts";
import { toast } from "react-toastify";

export interface ITabSecondaryProps {
  handleTabChange?: (newValue: number) => void;
  listUser: IAdminUserItem[];
  listCompany: IAdminCompanyItem[];
  activeSide: number;
  activeTab: number;
  handleSideChange: (newValue: number) => void;
}

export default function AdminSecondaryList() {
  const navigate = useNavigate();
  const setLoading = useAppStore((state) => state.setLoading);
  const [listUser, setListUser] = useState<IAdminUserItem[]>([]);
  const [listCompany, setListCompany] = useState<IAdminCompanyItem[]>([]);
  const params = new URLSearchParams(window.location.search);
  const [activeTab, setActiveTab] = useState(() => {
    return parseInt(params.get("tab") || "0");
  });
  const [activeSide, setActiveSide] = useState(() => {
    return Number(parseInt(params.get("side") || "0"));
  });

  const handleTabChange = (newValue: number) => {
    setActiveTab(newValue);
    handleSideChange(0);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("tab", newValue.toString());
    window.history.pushState({}, "", newUrl);
  };

  const handleSideChange = (newValue: number) => {
    setActiveSide(newValue);
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set("side", newValue.toString());
    window.history.pushState({}, "", newUrl);
  };

  const handleNavigateToCreateSecondaryIndication = () => {
    navigate(
      PAGES_ADMIN.SECONDARY.CREATE + `?tab=${activeTab}&side=${activeSide}`
    );
  };

  const loadListUser = useCallback(async () => {
    const { data } = await AdminSecondaryService.getListUser({
      limit: 1000,
      page: 1,
      type: 0, // the type = 0 is only in the list secondary
      screen: activeTab,
      side: activeSide,
    });
    setListUser(data.data);
  }, [activeSide, activeTab]);

  const loadListCompany = useCallback(async () => {
    const { data } = await AdminSecondaryService.getListCompany({
      limit: 1000,
      page: 1,
      type: 0, // the type = 0 is only in the list secondary
      screen: activeTab,
      side: activeSide,
    });
    setListCompany(data.data);
  }, [activeSide, activeTab]);

  const fetchInitialData = useCallback(async () => {
    try {
      setLoading(true);
      await Promise.all([loadListUser(), loadListCompany()]);
    } catch (error) {
      toast.error(String(error));
    } finally {
      setLoading(false);
    }
  }, [loadListCompany, loadListUser, setLoading]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  return (
    <Stack height="calc(100vh - 50px)">
      <Grid
        container
        sx={{ backgroundColor: "transparent", justifyContent: "space-between" }}
      >
        <Typography level="h4" sx={{ mb: 28 }}>
          Secondary
        </Typography>
        <Grid container>
          <Button
            onClick={handleNavigateToCreateSecondaryIndication}
            variant="solid"
            sx={{ height: "42px", pl: "20px" }}
            startDecorator={<RiAddLine />}
          >
            Add Indication
          </Button>
        </Grid>
      </Grid>
      <Tabs
        defaultValue={0}
        sx={{ backgroundColor: "transparent", flex: 1, gap: 24 }}
        value={activeTab}
        onChange={(_, newValue) => handleTabChange(newValue as number)}
      >
        <TabList disableUnderline>
          {[
            "Postings",
            "Accepting Backup Offers",
            "Under Contract",
            "Executed",
            "Trash",
          ].map((label) => (
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

        <TabPanel value={0} sx={{ padding: 0, flex: 1 }}>
          <NewListingsTable
            listUser={listUser}
            listCompany={listCompany}
            activeSide={activeSide}
            activeTab={activeTab}
            handleSideChange={handleSideChange}
          />
        </TabPanel>
        <TabPanel value={1} sx={{ padding: 0, flex: 1 }}>
          <AcceptingBackupOffersTable
            listUser={listUser}
            listCompany={listCompany}
            activeSide={activeSide}
            activeTab={activeTab}
            handleSideChange={handleSideChange}
          />
        </TabPanel>
        <TabPanel value={2} sx={{ padding: 0, flex: 1 }}>
          <UnderContractTable
            listUser={listUser}
            listCompany={listCompany}
            handleTabChange={handleTabChange}
            activeSide={activeSide}
            activeTab={activeTab}
            handleSideChange={handleSideChange}
          />
        </TabPanel>
        <TabPanel value={3} sx={{ padding: 0, flex: 1 }}>
          <ExecutedTable
            listUser={listUser}
            listCompany={listCompany}
            activeSide={activeSide}
            activeTab={activeTab}
            handleSideChange={handleSideChange}
          />
        </TabPanel>
        <TabPanel value={4} sx={{ padding: 0, flex: 1 }}>
          <TrashTable
            listUser={listUser}
            listCompany={listCompany}
            activeSide={activeSide}
            activeTab={activeTab}
            handleSideChange={handleSideChange}
          />
        </TabPanel>
      </Tabs>
    </Stack>
  );
}
