import {
  Avatar,
  Box,
  Dropdown,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  Sheet,
  Stack,
  styled,
  Typography,
} from "@mui/joy";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "src/assets/close-line.svg";
import { LogoAstra } from "src/assets/icon";
import MenuIcon from "src/assets/menu-line.svg";
import { USER_MENU, USER_NAVIGATE } from "src/constants/router";
import { useAuthStore } from "src/store/authStore";
import { useUserStore } from "src/store/userStore";
import { colors } from "src/styles/colors";
import { shadow } from "src/styles/shadow";
import { CONTAINER_SIZE } from "src/styles/theme";
import MobileMenu from "./MobileMenu";

const StyleNavigate = styled(Box)<{ isActive: boolean }>(({ isActive }) => ({
  fontSize: "15px",
  lineHeight: "22px",
  color: isActive ? colors["primary-main"] : colors["text-primary"],
  cursor: "pointer",
  fontWeight: 500,
  padding: "0 10px",
  "&:hover": {
    color: colors["primary-main"],
  },
}));

const StyleMenuItem = styled(MenuItem)<{ isActive?: boolean }>(
  ({ isActive }) => ({
    fontSize: "15px",
    lineHeight: "22px",
    color: isActive ? colors["primary-main"] : colors["text-primary"],
    cursor: "pointer",
    fontWeight: "400",
    "&:hover": {
      color: `${colors["primary-main"]} !important`,
      backgroundColor: `${colors["primary-opacity-light"]} !important`,
    },
    padding: "8px 20px",
  })
);

const Header = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const clear = useUserStore((state) => state.clear);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = async () => {
    await logout();
    clear();
  };

  return (
    <>
      <Box
        component="header"
        sx={(theme) => ({
          padding: "20px 32px",
          display: "flex",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1100,
          height: "64px",
          backgroundColor: { mobile: colors["body-bg"], laptop: colors.paper },
          maxWidth: CONTAINER_SIZE.pc,
          m: "auto",
          borderBottomLeftRadius: "6px",
          borderBottomRightRadius: "6px",
          justifyContent: "space-between",
          boxShadow: shadow.xs,

          [theme.breakpoints.down("pc")]: {
            maxWidth: CONTAINER_SIZE.laptop,
          },

          [theme.breakpoints.down("laptop")]: {
            padding: "12px",
          },
        })}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link
            href="/"
            sx={{ display: "flex", alignItems: "center", gap: "8px" }}
          >
            <LogoAstra width={32} height={28} />
            <Typography
              sx={{
                color: colors["text-primary"],
                fontFamily: "Jost",
                fontSize: "20px",
                fontWeight: 600,
                lineHeight: "24px",
                display: { mobile: "none", laptop: "block" },
              }}
            >
              ASTRA
            </Typography>
          </Link>
          <Stack
            direction="row"
            sx={(theme) => ({
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 8,
              marginLeft: 32,
              display: "flex",

              [theme.breakpoints.down("laptop")]: {
                display: "none",
              },
            })}
          >
            {USER_NAVIGATE.map(({ label, path, subPath }) => {
              const rootPath = path ? path.split("/")[1] || "/home" : "";

              const currentPath = location.pathname.split("/")[1] || "/home";

              return (
                <StyleNavigate
                  key={path}
                  isActive={
                    rootPath === currentPath ||
                    (subPath ? subPath === location.pathname : false)
                  }
                  onClick={() => navigate(path)}
                >
                  {label}
                </StyleNavigate>
              );
            })}
          </Stack>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mr: 24,
          }}
        >
          <Dropdown>
            <MenuButton
              slots={{ root: Sheet }}
              sx={(theme) => ({
                ml: "auto",
                cursor: "pointer",
                display: "block",

                [theme.breakpoints.down("laptop")]: {
                  display: "none",
                },
              })}
            >
              <Avatar src="/image/avatar-user-customer.png" variant="soft" />
            </MenuButton>
            <Menu
              placement="bottom-end"
              sx={{
                position: "relative",
                zIndex: 1200,
                minHeight: "206px",
                width: "219px",
                overflow: "hidden",
                backgroundColor: colors["paper"],
                border: "none",
              }}
            >
              {USER_MENU.map(({ title, link }) => (
                <StyleMenuItem
                  key={link}
                  isActive={location.pathname.includes(link)}
                  onClick={() => navigate(link)}
                >
                  {title}
                </StyleMenuItem>
              ))}
              <StyleMenuItem
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </StyleMenuItem>
            </Menu>
          </Dropdown>
        </Box>
        <Box
          sx={{
            mt: "8px",
            ml: "auto",
            display: { mobile: "block", laptop: "none" },
            cursor: "pointer",
          }}
          onClick={toggleDrawer}
        >
          <img src={isDrawerOpen ? CloseIcon : MenuIcon} alt="" />
        </Box>
      </Box>
      <MobileMenu
        isDrawerOpen={isDrawerOpen}
        toggleDrawer={toggleDrawer}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Header;
