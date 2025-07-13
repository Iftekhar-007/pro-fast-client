import React, { use } from "react";
import useUserRole from "../Components/Hooks/UseUserRole";
import Context from "../Components/Contexts/Context";

const RiderLink = ({ children }) => {
  const { user } = use(Context);
  const { role, isLoading } = useUserRole();
  //   console.log(role);

  if (isLoading)
    return <span className="loading loading-spinner loading-xl"></span>;
  if (!user || role !== "rider") return null;

  return <>{children}</>;
};

export default RiderLink;
