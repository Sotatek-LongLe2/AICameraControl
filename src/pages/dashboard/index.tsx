import { SITE_USER } from "src/constants/env";
import DashboardUser from "./DashboardUser";
import AdminLiveVideoPage from "../admin-live-video";

const Dashboard = () => {
  if (SITE_USER) return <DashboardUser />;

  return <AdminLiveVideoPage />;
};

export default Dashboard;
