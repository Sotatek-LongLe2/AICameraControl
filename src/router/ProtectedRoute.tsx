import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import validateStep from "src/shared/helpers/validateStep";
import { useUserStore } from "src/store/userStore";

const ProtectedRoute = () => {
  const progress = useUserStore((s) => s.progress);

  useEffect(() => {
    if (progress) {
      const targetPage = validateStep(progress);
      if (targetPage) {
        window.navigate(targetPage);
      }
    }
  }, [progress]);

  return <Outlet />;
};

export default ProtectedRoute;
