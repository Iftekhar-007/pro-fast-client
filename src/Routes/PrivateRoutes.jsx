import React, { use } from "react";

import { Navigate, useLocation } from "react-router";
import Context from "../Components/Contexts/Context";

const PrivateRoutes = ({ children }) => {
  const location = useLocation();
  const { user, loading } = use(Context);

  if (loading) {
    return <span className="loading loading-spinner text-error"></span>;
  }
  if (!user) {
    return <Navigate state={{ from: location }} to="/login"></Navigate>;
  }
  return children;
};

export default PrivateRoutes;
