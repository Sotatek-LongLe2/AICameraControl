import TopDisplay from "./TopDisplay";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/joy";

const RegistrationLayout = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box sx={{ display: { mobile: "none", laptop: "block" } }}>
        <TopDisplay />
      </Box>
      <Container
        component="main"
        sx={(theme) => ({
          flex: 1,

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

export default RegistrationLayout;
