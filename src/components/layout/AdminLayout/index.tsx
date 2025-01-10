import { Box, Container } from "@mui/joy";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

interface AdminLayoutProps {
  widthLayout?: number;
}

const AdminLayout = ({ widthLayout }: AdminLayoutProps = {}) => {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box flex={1} padding="24px" boxSizing="content-box">
          <Container
            component="main"
            sx={{
              height: "100%",
              boxSizing: "border-box",
              width: widthLayout,
            }}
          >
            <Outlet />
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
