import {
  Box,
  List,
  ListItem,
  ListItemButton,
  listItemButtonClasses,
  ListItemDecorator,
  listItemDecoratorClasses,
  Typography,
} from "@mui/joy";
import { RiArrowDownSLine } from "@remixicon/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoAstra } from "src/assets/icon";
import {
  ADMIN_INTERFACE_NAVIGATE,
  ADMIN_NAVIGATE,
  AdminInterfaceNavigate,
} from "src/constants/router";
import { useAuthStore } from "src/store/authStore";
import { useUserStore } from "src/store/userStore";
import { colors } from "src/styles/colors";

const sxItem = {
  "--variant-plainColor": colors["text-primary"],
  // "--ListItem-paddingY": "12px",
  "--ListItem-radius": "8px",
  "--List-gap": "6px",
  "--ListItem-paddingLeft": "0px",
  "--ListItemDecorator-size": "52px",
  "--ListItem-minHeight": "32px",
  paddingBottom: "8px",

  [`& .${listItemDecoratorClasses.root}`]: {
    justifyContent: "flex-end",
    pr: "8px",
  },

  [`& .${listItemButtonClasses.root}`]: {
    borderWidth: "0px",
  },

  '& [role="button"]': {
    borderRadius: "0 20px 20px 0",
  },
};

const Sidebar = () => {
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const logout = useAuthStore((state) => state.logout);
  const userInfo = useUserStore((state) => state.userInfo);

  useEffect(() => {
    // Check which nested items are selected and set their parent menus to open
    ADMIN_NAVIGATE.forEach((item: any) => {
      if (item?.nested) {
        const isAnyNestedSelected = item?.nested.some(
          (nestedItem: any) => location.pathname === nestedItem.path
        );
        if (isAnyNestedSelected) {
          setOpenMenus((prev) => ({ ...prev, [item.label]: true }));
        }
      }
    });
  }, []);

  const renderMenuItems = (items: any, level = 1) => {
    return items.map((item: any) => {
      const isLogout = item?.label === AdminInterfaceNavigate.LOG_OUT;

      const rootPath = item.path ? item.path.split("/")[1] || "/home" : "";

      const currentPath = location.pathname.split("/")[1] || "/home";

      const isSelected =
        rootPath.includes(currentPath) ||
        (item.nested &&
          item.nested.some(
            (nestedItem: any) => location.pathname === nestedItem.path
          ));

      const isOpen = openMenus[item.label];

      const handleMenuClick = () => {
        if (item.nested) {
          setOpenMenus((prev) => ({ ...prev, [item.label]: !isOpen }));
        } else {
          navigate(item.path);
        }
      };

      if (Array.isArray(item?.roles) && !item.roles.includes(userInfo.role))
        return null;

      if (item.nested) {
        return (
          <ListItem nested key={item.label}>
            <ListItemButton
              onClick={handleMenuClick}
              sx={{
                backgroundColor: isSelected
                  ? colors["active-selected"]
                  : undefined,
              }}
            >
              <ListItemDecorator>
                <item.icon size={level >= 2 ? 12 : 22} />
              </ListItemDecorator>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                {item.label}
                <RiArrowDownSLine />
              </Box>
            </ListItemButton>
            {isOpen && <List>{renderMenuItems(item.nested, level + 1)}</List>}
          </ListItem>
        );
      }

      return (
        <ListItem key={item.label}>
          <ListItemButton
            selected={isSelected}
            sx={{
              [`&.${listItemButtonClasses.selected}`]: {
                background:
                  "var(--menu-active, linear-gradient(270deg, #0089DE 0%, #4CC9F0 100%))",
              },
              fontSize: "15px",
              lineHeight: "22px",
              height: "36px",
            }}
            onClick={() => (isLogout ? logout() : navigate(item.path))}
          >
            <ListItemDecorator>
              <item.icon size={level >= 2 ? 12 : 22} />
            </ListItemDecorator>
            {item.label}
          </ListItemButton>
        </ListItem>
      );
    });
  };

  return (
    <Box
      sx={{
        width: 244,
        flexShrink: 0,
        backgroundColor: colors["body-bg"],
        color: "white",
        height: "100vh",
        position: "sticky",
        top: 0,
      }}
    >
      <Box
        sx={{
          padding: "20px",
          display: "flex",
          alignItems: "center",
          gap: "14px",
        }}
      >
        <LogoAstra width={32} height={28} />
        <Typography
          level="h6"
          sx={{
            letterSpacing: "0.15px",
          }}
        >
          ASTRA ADMIN
        </Typography>
      </Box>
      <List sx={sxItem}>{renderMenuItems(ADMIN_NAVIGATE)}</List>
      <Box
        padding="20px 2px 8px 0"
        display="flex"
        height="34px"
        gap="10px"
        alignItems="center"
        boxSizing="content-box"
      >
        <Box borderTop={`1px solid ${colors.divider}`} width="14px" />
        <Typography level="caption" sx={{ color: colors["text-disabled"] }}>
          ACCOUNT
        </Typography>
        <Box borderTop={`1px solid ${colors.divider}`} width="103px" />
      </Box>
      <List sx={sxItem}>{renderMenuItems(ADMIN_INTERFACE_NAVIGATE)}</List>
    </Box>
  );
};

export default Sidebar;
