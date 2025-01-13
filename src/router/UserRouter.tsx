import React, { useContext, useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { DefaultLayout } from "src/components/layout/DefaultLayout";
import UserLayout from "src/components/layout/UserLayout";
import { EventEnum } from "src/constants/enumBE";
import PAGES from "src/constants/router";
import CreatePasswordPage from "src/pages/create-password";
import Dashboard from "src/pages/dashboard";
import ForgotPasswordForm from "src/pages/forgot-password";
import LoginForm from "src/pages/login";
import RegisterForm from "src/pages/register";
import ResetPasswordForm from "src/pages/reset-password";
import { Settings } from "src/pages/settings";
import UIKit from "src/pages/uikit";
import validateStep from "src/shared/helpers/validateStep";
import { SocketContext } from "src/socket/SocketContext";
import { useAppStore } from "src/store/appStore";
import { useAuthStore } from "src/store/authStore";
import { useUserStore } from "src/store/userStore";
import { Error404Router, Error500Router } from "./ExceptionRouter";
import ProtectedRoute from "./ProtectedRoute";

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
          {/* 4. Step */}
        </Route>

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

        <Route path={PAGES.SETTINGS.INDEX} element={<Settings />} />

        {/* Other */}
        <Route path={PAGES.UIKit} element={<UIKit />} />
      </Route>
      {/* Registration */}
      {Error404Router}
      {Error500Router}
      <Route path="*" element={<Navigate to={PAGES.PAGE_404} replace />} />
    </Routes>
  );
};

export default UserRouter;
