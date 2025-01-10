import { Box, Container } from "@mui/joy";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const UserLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Container
        component="main"
        sx={(theme) => ({
          flex: 1,
          mt: "64px",
          padding: "24px 0",

          [theme.breakpoints.down("laptop")]: {
            padding: "12px",
          },
        })}
      >
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};

export default UserLayout;
