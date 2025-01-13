import {
  RiBuilding4Line,
  RiCircleLine,
  RiLogoutBoxRLine,
  RiNewspaperLine,
  RiUserLine,
} from "@remixicon/react";
import { Role } from "./enumBE";

const PAGES = {
  UIKit: "/UIKit",
  LOGIN: "/",
  REGISTER: "/register",
  CREATE_PASSWORD: "/create-password",
  VERIFY_PHONE: "/verify-phone",
  RISK_DISCLOSURE: "/risk-disclosure",
  REGISTRATION: {
    STEP_1: "/registration/step-1",
    STEP_2: "/registration/step-2",
    STEP_3: "/registration/step-3",
    STEP_4: "/registration/step-4",
    STEP_5: "/registration/step-5",
    STEP_6: "/registration/step-6",
    STEP_7: "/registration/step-7",
  },
  DASHBOARD: "/",
  ANNOUNCEMENTS: "/dashboard/announcements",
  SECONDARY: "/secondary",
  SECONDARY_DETAIL: "/secondary/detail",
  SECONDARY_ENTRY: "/secondary/entry",
  SECONDARY_ENTRY_CONFIRM: "/secondary/entry/confirmation",
  WATCHLIST: "/watchlist",
  PRIMARY: {
    INDEX: "/primary",
    DETAIL: "/primary/:companyID",
  },
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  VERIFICATION_KYC: "/verify-kyc",
  KYC_STATUS: "/kyc-status",
  PRIMARY_PLACE_DEMAND: "/primary/:companyID/place-demand",
  PRIMARY_DEMAND_CONFIRMATION: "/primary/:companyID/demand-confirmation",
  SETTINGS: {
    INDEX: "/settings",
  },
  INDICATIONS: {
    INDEX: "your-indications",
  },
  YOUR_DEMANDS: {
    INDEX: "/your-demands",
  },
  BIDS_AND_OFFERS: {
    INDEX: "/your-bids-offers",
  },
  FAQ: {
    INDEX: "FAQ",
  },
  PAGE_404: "/404",
  PAGE_500: "/500",
  FOOTER: {
    TERMS_AND_CONDITIONS: "/terms-and-conditions",
    PRIVACY_POLICY: "/privacy-policy",
    RISK_WARNING: "/risk-warning",
  },
} as const;

export const PAGES_ADMIN = {
  UIKit: "/UIKit",
  LOGIN: "/",
  FORCE_PASSWORD: "/force-password",
  CHANGE_PASSWORD: "/change-password",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  //
  DASHBOARD: "/",
  ADMIN: "/admin",
  CUSTOMERS: {
    INDEX: "/customers/list",
    INVITE: "/customers/invite",
    CREATE: "/customers/create",
    EDIT: "/customers/edit/:id",
    VIEW: "/customers/view/:id",
  },
  PRIMARY: {
    INDEX: "/primary/list",
    ADD: "/primary/add",
    DETAIL: "/primary/:id",
    EDIT: "/primary/:id/edit",
    PREVIEW: "/primary/preview",
  },
  SECONDARY: {
    INDEX: "/secondary/list",
    IOI_DETAIL: "/secondary/ioi/:id",
    EXECUTION_DETAIL: "/secondary/execution/:id",
    CREATE: "/secondary/create",
    EDIT: "/secondary/edit/:id",
  },
  LIVE_VIDEO: "/live-video",
  VIP_INFO: "/vip-info",
  CAMERA_LIST: "/camera-list",
  CAMERA_CONTROL: "/camera-control",
  PAGE_404: "/404",
  PAGE_500: "/500",
} as const;

//
export const USER_NAVIGATE: {
  label: string;
  path: string;
  subPath?: string;
}[] = [
  {
    label: "Dashboard",
    path: PAGES.DASHBOARD,
    subPath: PAGES.ANNOUNCEMENTS,
  },
  { label: "Primary", path: PAGES.PRIMARY.INDEX },
  { label: "Secondary", path: PAGES.SECONDARY },
  { label: "Watchlist", path: PAGES.WATCHLIST },
] as const;

export const ADMIN_NAVIGATE = [
  {
    icon: RiBuilding4Line,
    label: "Live Video",
    path: PAGES_ADMIN.LIVE_VIDEO,
  },
  {
    icon: RiNewspaperLine,
    label: "VIP Info",
    path: PAGES_ADMIN.VIP_INFO,
  },
  {
    icon: RiUserLine,
    label: "Configurations",
    path: PAGES_ADMIN.CUSTOMERS.INDEX,
    nested: [
      {
        icon: RiCircleLine,
        label: "Camera List",
        path: PAGES_ADMIN.CAMERA_LIST,
      },
      {
        icon: RiCircleLine,
        label: "Camera Control",
        path: PAGES_ADMIN.CAMERA_CONTROL,
        roles: [Role.SUPPER_ADMIN],
      },
    ],
  },
] as const;

export enum AdminInterfaceNavigate {
  CHANGE_PASSWORD = "Change Password",
  LOG_OUT = "Log Out",
}

export const ADMIN_INTERFACE_NAVIGATE = [
  {
    icon: RiLogoutBoxRLine,
    label: AdminInterfaceNavigate.LOG_OUT,
  },
] as const;

export const USER_MENU = [
  {
    title: "Settings",
    link: PAGES.SETTINGS.INDEX,
  },
  {
    title: "Your Demands",
    link: PAGES.YOUR_DEMANDS.INDEX,
  },
  {
    title: "Your Indications",
    link: PAGES.INDICATIONS.INDEX,
  },
  {
    title: "Your Bids & Offers",
    link: PAGES.BIDS_AND_OFFERS.INDEX,
  },
  {
    title: "F.A.Q",
    link: PAGES.FAQ.INDEX,
  },
] as const;

export default PAGES;
