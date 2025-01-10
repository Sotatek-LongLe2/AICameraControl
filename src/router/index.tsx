import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SITE_USER } from "src/constants/env";
import AdminRouter from "./AdminRouter";
import UserRouter from "./UserRouter";
import { UserService } from "src/services/UserService";
import { useAuthStore } from "src/store/authStore";

const AppRouter: React.FC = () => {
  window.navigate = useNavigate();

  useEffect(() => {
    const token = useAuthStore.getState().token;
    if (!token) return;
    // Fix/417: Verify token
    UserService.getMe();
  }, []);

  return SITE_USER ? <UserRouter /> : <AdminRouter />;
};

export default AppRouter;
