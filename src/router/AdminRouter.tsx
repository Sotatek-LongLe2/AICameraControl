import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "src/components/layout/AdminLayout";
import { DefaultLayout } from "src/components/layout/DefaultLayout";
import { PAGES_ADMIN } from "src/constants/router";
import AdminLiveVideoPage from "src/pages/admin-live-video";
import Dashboard from "src/pages/dashboard";
import ForcePasswordPage from "src/pages/force-password";
// import ForgotPasswordForm from "src/pages/forgot-password";
// import LoginForm from "src/pages/login";
// import ResetPasswordForm from "src/pages/reset-password";
import UIKit from "src/pages/uikit";
// import { useAuthStore } from "src/store/authStore";

import CameraControlPage from "src/pages/admin-camera-control";
import CameraListPage from "src/pages/admin-camera-list";
import { UpdatePasswordPage } from "src/pages/admin-change-password";
import VipInfoPage from "src/pages/admin-vip-info";
import { Error404Router, Error500Router } from "./ExceptionRouter";

const AdminRouter: React.FC = () => {
  // const isLogined = useAuthStore((state) => state.isLogined);

  // if (!isLogined)
  //   return (
  //     <Routes>
  //       <Route element={<DefaultLayout />}>
  //         <Route path={PAGES_ADMIN.LOGIN} element={<LoginForm />} />
  //         <Route
  //           path={PAGES_ADMIN.FORGOT_PASSWORD}
  //           element={<ForgotPasswordForm />}
  //         />
  //         <Route
  //           path={PAGES_ADMIN.RESET_PASSWORD}
  //           element={<ResetPasswordForm />}
  //         />

  //         {/* Other */}
  //         <Route path={PAGES_ADMIN.UIKit} element={<UIKit />} />
  //         <Route
  //           path="*"
  //           element={<Navigate to={PAGES_ADMIN.LOGIN} replace />}
  //         />
  //       </Route>
  //     </Routes>
  //   );

  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route
          path={PAGES_ADMIN.FORCE_PASSWORD}
          element={<ForcePasswordPage />}
        />
      </Route>

      <Route element={<AdminLayout widthLayout={972} />}>
        <Route path={PAGES_ADMIN.DASHBOARD} element={<Dashboard />} />

        <Route path={PAGES_ADMIN.LIVE_VIDEO} element={<AdminLiveVideoPage />} />
        <Route path={PAGES_ADMIN.VIP_INFO} element={<VipInfoPage />} />
        <Route path={PAGES_ADMIN.CAMERA_LIST} element={<CameraListPage />} />
        <Route
          path={PAGES_ADMIN.CAMERA_CONTROL}
          element={<CameraControlPage />}
        />

        <Route
          path={PAGES_ADMIN.CHANGE_PASSWORD}
          element={<UpdatePasswordPage />}
        />
        {/* Other */}
        <Route path={PAGES_ADMIN.UIKit} element={<UIKit />} />
      </Route>

      {Error404Router}
      {Error500Router}
      <Route
        path="*"
        element={<Navigate to={PAGES_ADMIN.PAGE_404} replace />}
      />
    </Routes>
  );
};

export default AdminRouter;
