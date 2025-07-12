import { Navigate, useLocation } from "react-router";
import useUserRole from "../Components/Hooks/UseUserRole";
import { use } from "react";
import Context from "../Components/Contexts/Context";

const AdminRoute = ({ children }) => {
  const { user, loading } = use(Context);
  const { role, isLoading } = useUserRole();
  const location = useLocation();

  if (isLoading || loading) return <span>Forbidden......</span>;
  if (!user || role !== "admin")
    return <Navigate to="/" state={{ from: location }} />;

  return children;
};

export default AdminRoute;
