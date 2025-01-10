import { Box, Container, ContainerProps } from "@mui/joy";
import { Outlet, useLocation } from "react-router-dom";
import { SITE_USER } from "src/constants/env";
import Footer from "./Footer";
import PAGES from "src/constants/router";

export function DefaultLayout({ ...props }: ContainerProps) {
  const { pathname } = useLocation();
  const isPageFooter = Object.values(PAGES.FOOTER).includes(pathname as any);

  return (
    <>
      <Container
        component="main"
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 46px)", // 46px is the height of the footer

          [theme.breakpoints.down("laptop")]: {
            padding: "12px",
          },
          // ...sx,
        })}
        {...props}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Outlet />
        </Box>
      </Container>
      {SITE_USER && !isPageFooter && <Footer />}
    </>
  );
}
