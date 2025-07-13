import React, { use } from "react";
import Context from "../Components/Contexts/Context";
import useUserRole from "../Components/Hooks/UseUserRole";
import { Navigate, useLocation } from "react-router";

const RiderRoute = ({ children }) => {
  const { user, loading } = use(Context);
  const { role, isLoading } = useUserRole();
  const location = useLocation();

  if (isLoading || loading) return <span>Forbidden......</span>;
  if (!user || role !== "rider")
    return <Navigate to="/" state={{ from: location }} />;

  return children;
};

export default RiderRoute;
