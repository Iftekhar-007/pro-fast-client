import { Navigate, useLocation } from "react-router";
import useUserRole from "../Components/Hooks/UseUserRole";

const AdminRoute = ({ children }) => {
  const { role, isLoading } = useUserRole();
  const location = useLocation();

  if (isLoading) return <span>Loading...</span>;
  if (role !== "admin") return <Navigate to="/" state={{ from: location }} />;

  return children;
};

export default AdminRoute;
