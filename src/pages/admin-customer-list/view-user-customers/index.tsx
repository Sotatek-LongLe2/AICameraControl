import {
  Box,
  Button,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Typography,
} from "@mui/joy";
import { RiMailOpenLine, RiPencilLine, RiPhoneLine } from "@remixicon/react";
import { useCallback, useEffect, useState } from "react";
import {
  createSearchParams,
  generatePath,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { DisplayPhoneNumber } from "src/components/common/DisplayPhoneNumber";
import { PAGES_ADMIN } from "src/constants/router";
import { AdminUsersCustomersService } from "src/services/AdminUsersCustomersService";
import { AdminUserDetail } from "src/services/AdminUsersCustomersService.type";
import { colors } from "src/styles/colors";
import ActivityPage from "./Activity";
import BidOfferSection from "./bid-offers";
import DemandSection from "./demands";
import IndicationSection from "./indications";
import { toast } from "react-toastify";

const ViewUserCustomers = () => {
  const navigate = useNavigate();
  const paramsUrl = useParams();
  const id = Number(paramsUrl.id);
  const [searchParams] = useSearchParams();
  const activeTab = Number(searchParams.get("tab") || 0);

  const [customerDetail, setCustomerDetail] = useState<AdminUserDetail>();

  const handleTabChange = (newValue: number) => {
    navigate({
      pathname: generatePath(PAGES_ADMIN.CUSTOMERS.VIEW, { id: String(id) }),
      search: createSearchParams({
        tab: String(newValue),
      }).toString(),
    });
  };

  const fetchCustomerDetail = useCallback(async () => {
    try {
      const res = await AdminUsersCustomersService.getAdminUserDetail({
        userId: id,
      });
      if (res.data.statusCode === 200) {
        console.log(res.data);
        setCustomerDetail(res.data.data);
      }
    } catch (error) {
      toast.error(String(error));
    }
  }, [id]);

  useEffect(() => {
    fetchCustomerDetail();
  }, [fetchCustomerDetail]);

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: colors["paper"],
          borderRadius: "6px",
          padding: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 16,
            alignItems: "center",
          }}
        >
          <Box
            component={"img"}
            width={120}
            height={120}
            src="/image/avatar-user-customer.png"
            sx={{
              borderRadius: "6px",
            }}
          />
          <Box>
            <Box
              sx={{
                display: "flex",
                gap: "12px",
                alignItems: "center",
              }}
            >
              <Typography level="h4">
                {customerDetail?.firstName} {customerDetail?.lastName}
              </Typography>
              <Typography
                level="body1-500"
                color="text-secondary"
                sx={{
                  mt: "7px",
                  ...(customerDetail?.type !== 1 && {
                    display: "none",
                  }),
                }}
              >
                {" "}
                {customerDetail?.userCompany
                  ? `${customerDetail?.userCompany?.name ?? ""}, ${
                      customerDetail?.userCompany?.country
                    }`
                  : ""}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: "24px", mt: 8 }}>
              <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <RiPhoneLine color={colors["text-secondary"]} />
                <DisplayPhoneNumber
                  value={customerDetail?.userInfo?.phone}
                  level="body1-500"
                  color="text-secondary"
                />
              </Box>
              <Box sx={{ display: "flex", gap: "8px" }}>
                <RiMailOpenLine color={colors["text-secondary"]} />
                <Typography level="body1-500" color="text-secondary">
                  {customerDetail?.email}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box>
          <Button
            variant="outlined"
            startDecorator={<RiPencilLine />}
            onClick={() => {
              window.navigate(
                `${generatePath(PAGES_ADMIN.CUSTOMERS.EDIT, {
                  id: id.toString(),
                })}`
              );
            }}
            sx={{
              maxWidth: "192px",
              whiteSpace: "nowrap",
            }}
          >
            Edit User Details
          </Button>
        </Box>
      </Box>
      <Box mt={24}>
        <Tabs
          sx={{ backgroundColor: "transparent", flex: 1, gap: 24 }}
          value={activeTab}
          onChange={(_, newValue) => handleTabChange(newValue as number)}
        >
          <TabList disableUnderline>
            {["Activity", "Demands", "Indications", "Bids & Offers"].map(
              (label) => (
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
              )
            )}
          </TabList>
          <TabPanel value={0} sx={{ padding: 0, flex: 1 }}>
            <ActivityPage />
          </TabPanel>
          <TabPanel value={1} sx={{ padding: 0, flex: 1 }}>
            <DemandSection />
          </TabPanel>
          <TabPanel value={2} sx={{ padding: 0, flex: 1 }}>
            <IndicationSection />
          </TabPanel>
          <TabPanel value={3} sx={{ padding: 0, flex: 1 }}>
            <BidOfferSection />
          </TabPanel>
        </Tabs>
      </Box>
    </Box>
  );
};

export default ViewUserCustomers;
