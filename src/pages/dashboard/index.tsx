import { SITE_USER } from "src/constants/env";
import DashboardAdmin from "./DashboardAdmin";
import DashboardUser from "./DashboardUser";

const Dashboard = () => {
  if (SITE_USER) return <DashboardUser />;

  return <DashboardAdmin />;
};

export default Dashboard;
