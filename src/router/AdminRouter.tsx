import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "src/components/layout/AdminLayout";
import { DefaultLayout } from "src/components/layout/DefaultLayout";
import { PAGES_ADMIN } from "src/constants/router";
import AdminCompaniesPage from "src/pages/admin-companies";
import AdminUserCustomerList from "src/pages/admin-customer-list";
import AdminInviteCustomerForm from "src/pages/admin-invite-customers";
import AdminPrimaryList from "src/pages/admin-primary-list";
import AdminSecondaryList from "src/pages/admin-secondary-list";
import { PrimaryAdminForm } from "src/pages/admin-primary-list/PrimaryAdminForm";
import { PrimaryDetail } from "src/pages/admin-primary-list/PrimaryDetail";
import { PrimaryPreview } from "src/pages/admin-primary-list/PrimaryPreview";
import ForcePasswordPage from "src/pages/force-password";
import Dashboard from "src/pages/dashboard";
import ForgotPasswordForm from "src/pages/forgot-password";
import LoginForm from "src/pages/login";
import ResetPasswordForm from "src/pages/reset-password";
import UIKit from "src/pages/uikit";
import { useAuthStore } from "src/store/authStore";
import CreateSecondaryIndication from "src/pages/admin-secondary-indication/create";
import EditSecondaryIndication from "src/pages/admin-secondary-indication/edit";
import CreateUserCustomers from "src/pages/admin-invite-customers/create-user-customers";
import EditUserCustomers from "src/pages/admin-invite-customers/edit-user-customers";

import MatchIOIDetail from "src/pages/admin-secondary-list/MatchIOIDetail";
import { ExecutionDetailPage } from "src/pages/admin-secondary-list/ExecutionDetail";
import AdminManagementPage from "src/pages/admin-management";
import { AdminManagementEditPage } from "src/pages/admin-management/edit";
import { AdminManagementCreatePage } from "src/pages/admin-management/create";
import { UpdatePasswordPage } from "src/pages/admin-change-password";
import AnnouncementsPage from "src/pages/announcements";
import AdminAnnouncementCreate from "src/pages/admin-announcement/create";
import AdminAnnouncementEdit from "src/pages/admin-announcement/edit";
import { Error404Router, Error500Router } from "./ExceptionRouter";
import ViewUserCustomers from "src/pages/admin-customer-list/view-user-customers";
const AdminRouter: React.FC = () => {
  const isLogined = useAuthStore((state) => state.isLogined);

  if (!isLogined)
    return (
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path={PAGES_ADMIN.LOGIN} element={<LoginForm />} />
          <Route
            path={PAGES_ADMIN.FORGOT_PASSWORD}
            element={<ForgotPasswordForm />}
          />
          <Route
            path={PAGES_ADMIN.RESET_PASSWORD}
            element={<ResetPasswordForm />}
          />

          {/* Other */}
          <Route path={PAGES_ADMIN.UIKit} element={<UIKit />} />
          <Route
            path="*"
            element={<Navigate to={PAGES_ADMIN.LOGIN} replace />}
          />
        </Route>
      </Routes>
    );

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
        {/* CUSTOMERS */}
        <Route
          path={PAGES_ADMIN.CUSTOMERS.INVITE}
          element={<AdminInviteCustomerForm />}
        />
        {/* PRIMARY */}
        <Route
          path={PAGES_ADMIN.PRIMARY.INDEX}
          element={<AdminPrimaryList />}
        />
        <Route path={PAGES_ADMIN.PRIMARY.DETAIL} element={<PrimaryDetail />} />
        <Route path={PAGES_ADMIN.PRIMARY.ADD} element={<PrimaryAdminForm />} />
        <Route path={PAGES_ADMIN.PRIMARY.EDIT} element={<PrimaryAdminForm />} />

        {/* SECONDARY */}
        <Route
          path={PAGES_ADMIN.SECONDARY.INDEX}
          element={<AdminSecondaryList />}
        />
        <Route
          path={PAGES_ADMIN.SECONDARY.IOI_DETAIL}
          element={<MatchIOIDetail />}
        />
        <Route
          path={PAGES_ADMIN.SECONDARY.EXECUTION_DETAIL}
          element={<ExecutionDetailPage />}
        />
        <Route
          path={PAGES_ADMIN.SECONDARY.CREATE}
          element={<CreateSecondaryIndication />}
        />
        <Route
          path={PAGES_ADMIN.SECONDARY.EDIT}
          element={<EditSecondaryIndication />}
        />

        {/* COMPANIES */}
        <Route path={PAGES_ADMIN.COMPANIES} element={<AdminCompaniesPage />} />

        {/* ANNOUNCEMENTS */}
        <Route
          path={PAGES_ADMIN.ANNOUNCEMENTS.INDEX}
          element={<AnnouncementsPage />}
        />

        <Route
          path={PAGES_ADMIN.ANNOUNCEMENTS.CREATE}
          element={<AdminAnnouncementCreate />}
        />

        <Route
          path={PAGES_ADMIN.ANNOUNCEMENTS.EDIT}
          element={<AdminAnnouncementEdit />}
        />

        {/* CUSTOMERS */}

        <Route
          path={PAGES_ADMIN.CUSTOMERS.INDEX}
          element={<AdminUserCustomerList />}
        />

        <Route
          path={PAGES_ADMIN.CUSTOMERS.CREATE}
          element={<CreateUserCustomers />}
        />
        <Route
          path={PAGES_ADMIN.CUSTOMERS.EDIT}
          element={<EditUserCustomers />}
        />

        <Route
          path={PAGES_ADMIN.CUSTOMERS.VIEW}
          element={<ViewUserCustomers />}
        />

        {/* ADMIN MANAGEMENT */}
        <Route
          path={PAGES_ADMIN.ADMIN_MANAGEMENT.INDEX}
          element={<AdminManagementPage />}
        />
        <Route
          path={PAGES_ADMIN.ADMIN_MANAGEMENT.CREATE}
          element={<AdminManagementCreatePage />}
        />
        <Route
          path={PAGES_ADMIN.ADMIN_MANAGEMENT.EDIT}
          element={<AdminManagementEditPage />}
        />
        <Route
          path={PAGES_ADMIN.CHANGE_PASSWORD}
          element={<UpdatePasswordPage />}
        />
        {/* Other */}
        <Route path={PAGES_ADMIN.UIKit} element={<UIKit />} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route
          path={PAGES_ADMIN.PRIMARY.PREVIEW}
          element={<PrimaryPreview />}
        />
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
