import React, { useContext, useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import ScrollToTop from "src/components/common/ScrollToTop";
import { DefaultLayout } from "src/components/layout/DefaultLayout";
import RegistrationLayout from "src/components/layout/RegistrationLayout";
import UserLayout from "src/components/layout/UserLayout";
import { EventEnum } from "src/constants/enumBE";
import PAGES from "src/constants/router";
import AnnouncementsAllPage from "src/pages/announcements/all";
import { BidsOffers } from "src/pages/bids-offers";
import CreatePasswordPage from "src/pages/create-password";
import Dashboard from "src/pages/dashboard";
import { FAQ } from "src/pages/FAQ";
import ForgotPasswordForm from "src/pages/forgot-password";
import { Indications } from "src/pages/indications";
import LoginForm from "src/pages/login";
import Primary from "src/pages/primary";
import DemandConfirmation from "src/pages/primary/demand-confirmation";
import PrimaryDetail from "src/pages/primary/detail";
import PlaceDemand from "src/pages/primary/place-demand";
import PrivacyPolicyPage from "src/pages/privacy-policy";
import RegisterForm from "src/pages/register";
import Step1 from "src/pages/registration/step-1";
import Step2 from "src/pages/registration/step-2";
import Step3 from "src/pages/registration/step-3";
import Step4 from "src/pages/registration/step-4";
import Step5 from "src/pages/registration/step-5";
import Step6 from "src/pages/registration/step-6";
import Step7 from "src/pages/registration/step-7";
import ResetPasswordForm from "src/pages/reset-password";
import RiskDisclosurePage from "src/pages/risk-disclosure";
import RiskWarningPage from "src/pages/risk-warning";
import Secondary from "src/pages/secondary";
import SecondaryDetailPage from "src/pages/secondary/detail";
import SecondaryEntryPage from "src/pages/secondary/entry";
import SecondaryEntryConfirmation from "src/pages/secondary/entry-confirmation";
import { Settings } from "src/pages/settings";
import TermsAndConditionsPage from "src/pages/terms-and-conditions";
import UIKit from "src/pages/uikit";
import VerifyPhoneForm from "src/pages/verify-phone";
import WatchlistPage from "src/pages/watchlist";
import { YourDemands } from "src/pages/your-demands";
import validateStep from "src/shared/helpers/validateStep";
import { useAppStore } from "src/store/appStore";
import { useAuthStore } from "src/store/authStore";
import { useUserStore } from "src/store/userStore";
import { Error404Router, Error500Router } from "./ExceptionRouter";
import ProtectedRoute from "./ProtectedRoute";
import { SocketContext } from "src/socket/SocketContext";

const UserRouter: React.FC = () => {
  window.navigate = useNavigate();
  const location = useLocation();

  const isLogined = useAuthStore((state) => state.isLogined);
  const typeAccess = useAuthStore((state) => state.typeAccess);
  const setPartialAccess = useAuthStore((state) => state.setPartialAccess);
  const logout = useAuthStore((state) => state.logout);
  const progress = useUserStore((s) => s.progress);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const clear = useUserStore((state) => state.clear);
  const setLoading = useAppStore((state) => state.setLoading);
  const socket = useContext(SocketContext);

  useEffect(() => {
    // Fix 188: When user is logined but in progress registration, if user navigate to other page, it will redirect to target page
    if (
      isLogined &&
      typeAccess !== "full" &&
      !Object.values(PAGES.REGISTRATION).includes(location.pathname as any) &&
      !Object.values(PAGES.FOOTER).includes(location.pathname as any)
    ) {
      const targetPage = validateStep(progress);
      if (
        targetPage &&
        // Fix: 225, 221
        ![PAGES.REGISTRATION.STEP_6, PAGES.REGISTRATION.STEP_7].includes(
          targetPage as any
        ) &&
        targetPage !== location.pathname
      ) {
        window.navigate(targetPage);
      }
    }
  }, [isLogined, location, progress, typeAccess]);

  // Refresh token when admin confirmed docs
  useEffect(() => {
    const handleConfirmedDocs = async () => {
      try {
        setLoading(true);
        setPartialAccess("full");
        await refreshToken();
      } catch (error) {
        console.error("Error handling confirmed docs:", error);
      } finally {
        setLoading(false);
        window.location.reload();
      }
    };

    const handleReversedConfirmedDocs = async () => {
      try {
        setLoading(true);
        setPartialAccess("partial");
        await refreshToken();
      } catch (error) {
        console.error("Error handling reversed confirmed docs:", error);
      } finally {
        setLoading(false);
        window.location.reload();
      }
    };

    const handleRemovedUser = () => {
      try {
        logout();
        clear();
      } catch (error) {
        console.error("Error handling removed user:", error);
      }
    };

    // Register event listeners
    socket?.on(EventEnum.ADMIN_CONFIRMED_DOCS, handleConfirmedDocs);
    socket?.on(
      EventEnum.ADMIN_REVERSED_CONFIRM_DOCS,
      handleReversedConfirmedDocs
    );
    socket?.on(EventEnum.ADMIN_REMOVED_USER, handleRemovedUser);

    return () => {
      // Cleanup event listeners and disconnect socket
      socket?.off(EventEnum.ADMIN_CONFIRMED_DOCS, handleConfirmedDocs);
      socket?.off(
        EventEnum.ADMIN_REVERSED_CONFIRM_DOCS,
        handleReversedConfirmedDocs
      );
      socket?.off(EventEnum.ADMIN_REMOVED_USER, handleRemovedUser);
    };
  }, [clear, logout, refreshToken, setLoading, setPartialAccess, socket]);

  if (!isLogined)
    return (
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path={PAGES.REGISTER} element={<RegisterForm />} />
          <Route
            path={PAGES.CREATE_PASSWORD}
            element={<CreatePasswordPage />}
          />

          <Route path={PAGES.LOGIN} element={<LoginForm />} />
          <Route
            path={PAGES.FORGOT_PASSWORD}
            element={<ForgotPasswordForm />}
          />
          <Route path={PAGES.RESET_PASSWORD} element={<ResetPasswordForm />} />

          {/* Other */}
          {FooterRouter}
          <Route path={PAGES.UIKit} element={<UIKit />} />
          <Route path="*" element={<Navigate to={PAGES.LOGIN} replace />} />
        </Route>
      </Routes>
    );

  // Logined but in progress registration
  if (typeAccess === "undefined")
    return (
      <Routes>
        <Route element={<ProtectedRoute />}>
          {/* 1. Risk */}
          {/* 2. Phone number */}
          {/* 3. KYC */}
          {InviteRouter}
          {/* 4. Step */}
          {RegisterRouter}
        </Route>

        {FooterRouter}
        {Error500Router}
        <Route path="*" element={<ProtectedRoute />} />

        {/* Other */}
        <Route path={PAGES.UIKit} element={<UIKit />} />
      </Routes>
    );

  // Type access partial or full
  return (
    <Routes>
      <Route element={<UserLayout />}>
        <Route path={PAGES.DASHBOARD} element={<Dashboard />} />
        <Route path={PAGES.ANNOUNCEMENTS} element={<AnnouncementsAllPage />} />

        {/* PRIMARY */}
        <Route path={PAGES.PRIMARY.INDEX} element={<Primary />} />
        <Route path={PAGES.PRIMARY.DETAIL} element={<PrimaryDetail />} />

        {/* SECONDARY */}
        <Route path={PAGES.SECONDARY} element={<Secondary />} />
        <Route
          path={PAGES.SECONDARY_DETAIL}
          element={<SecondaryDetailPage />}
        />
        <Route path={PAGES.SECONDARY_ENTRY} element={<SecondaryEntryPage />} />
        <Route
          path={PAGES.SECONDARY_ENTRY_CONFIRM}
          element={<SecondaryEntryConfirmation />}
        />
        {/* WATCHLIST */}
        <Route path={PAGES.WATCHLIST} element={<WatchlistPage />} />

        <Route path={PAGES.PRIMARY_PLACE_DEMAND} element={<PlaceDemand />} />
        <Route
          path={PAGES.PRIMARY_DEMAND_CONFIRMATION}
          element={<DemandConfirmation />}
        />
        <Route path={PAGES.SETTINGS.INDEX} element={<Settings />} />
        <Route path={PAGES.INDICATIONS.INDEX} element={<Indications />} />
        <Route path={PAGES.YOUR_DEMANDS.INDEX} element={<YourDemands />} />
        <Route path={PAGES.BIDS_AND_OFFERS.INDEX} element={<BidsOffers />} />
        <Route path={PAGES.FAQ.INDEX} element={<FAQ />} />

        {/* Other */}
        <Route path={PAGES.UIKit} element={<UIKit />} />
      </Route>
      {/* Registration */}
      {RegisterRouter}
      {FooterRouter}
      {Error404Router}
      {Error500Router}
      <Route path="*" element={<Navigate to={PAGES.PAGE_404} replace />} />
    </Routes>
  );
};

const FooterRouter = (
  <Route element={<DefaultLayout />}>
    <Route
      path={PAGES.FOOTER.TERMS_AND_CONDITIONS}
      element={<TermsAndConditionsPage />}
    />
    <Route path={PAGES.FOOTER.PRIVACY_POLICY} element={<PrivacyPolicyPage />} />
    <Route path={PAGES.FOOTER.RISK_WARNING} element={<RiskWarningPage />} />
  </Route>
);

const InviteRouter = (
  <Route element={<DefaultLayout />}>
    {/* 1. Risk */}
    <Route path={PAGES.RISK_DISCLOSURE} element={<RiskDisclosurePage />} />
    {/* 2. Phone number */}
    <Route path={PAGES.VERIFY_PHONE} element={<VerifyPhoneForm />} />
  </Route>
);

const RegisterRouter = (
  <Route
    element={
      <ScrollToTop>
        <RegistrationLayout />
      </ScrollToTop>
    }
  >
    <Route path={PAGES.REGISTRATION.STEP_1} element={<Step1 />} />
    <Route path={PAGES.REGISTRATION.STEP_2} element={<Step2 />} />
    <Route path={PAGES.REGISTRATION.STEP_3} element={<Step3 />} />
    <Route path={PAGES.REGISTRATION.STEP_4} element={<Step4 />} />
    <Route path={PAGES.REGISTRATION.STEP_5} element={<Step5 />} />
    <Route path={PAGES.REGISTRATION.STEP_6} element={<Step6 />} />
    <Route path={PAGES.REGISTRATION.STEP_7} element={<Step7 />} />
  </Route>
);

export default UserRouter;
