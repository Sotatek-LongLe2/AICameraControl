import { Box, Drawer, Stack, styled, Typography } from "@mui/joy";
import React from "react";
import { useNavigate } from "react-router-dom";
import { USER_NAVIGATE, USER_MENU } from "src/constants/router";
import { colors } from "src/styles/colors";

interface IProps {
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  onLogout: () => void;
}

const StyleNavigate = styled(Box)<{ isActive: boolean }>(({ isActive }) => ({
  fontSize: "24px",
  lineHeight: "38px",
  color: isActive ? colors["primary-main"] : colors["text-primary"],
  cursor: "pointer",
  fontWeight: 500,
  fontFamily: "Jost",
  "&:hover": {
    color: colors["primary-main"],
  },
}));

const StyleMenuItem = styled(Box)<{ isActive?: boolean }>(({ isActive }) => ({
  fontSize: "24px",
  lineHeight: "38px",
  color: isActive ? colors["primary-main"] : colors["text-primary"],
  cursor: "pointer",
  fontWeight: 500,
  fontFamily: "Jost",
  "&:hover": {
    color: `${colors["primary-main"]} !important`,
  },
}));

const MobileMenu: React.FC<IProps> = ({
  isDrawerOpen,
  toggleDrawer,
  onLogout,
}) => {
  const navigate = useNavigate();

  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={toggleDrawer}
      hideBackdrop
      sx={{
        zIndex: 1000,
      }}
      slotProps={{
        content: {
          sx: {
            top: "64px",
            width: "100vw",
          },
        },
      }}
    >
      <Box sx={{ width: "100%", height: "100%" }}>
        <Stack
          direction="column"
          spacing={8}
          sx={(theme) => ({
            justifyContent: "flex-start",
            p: 12,
            pb: 24,
            borderBottom: 1,
            borderColor: theme.color.divider,
            borderBottomLeftRadius: 6,
            borderBottomRightRadius: 6,
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
                onClick={() => {
                  toggleDrawer();
                  navigate(path);
                }}
              >
                {label}
              </StyleNavigate>
            );
          })}
        </Stack>
        <Box sx={{ p: 12, pt: 24 }}>
          <Typography
            fontSize={13}
            sx={(theme) => ({
              color: theme.color["text-secondary"],
              lineHeight: "15px",
              mb: 12,
              textTransform: "uppercase",
            })}
          >
            User Account
          </Typography>
          <Stack
            direction="column"
            spacing={16}
            sx={{
              justifyContent: "flex-start",
            }}
          >
            {USER_MENU.map(({ title, link }) => (
              <StyleMenuItem
                key={link}
                isActive={location.pathname.includes(link)}
                onClick={() => {
                  toggleDrawer();
                  navigate(link);
                }}
              >
                {title}
              </StyleMenuItem>
            ))}
            <StyleMenuItem onClick={onLogout}>Logout</StyleMenuItem>
          </Stack>
        </Box>
      </Box>
    </Drawer>
  );
};

export default MobileMenu;
