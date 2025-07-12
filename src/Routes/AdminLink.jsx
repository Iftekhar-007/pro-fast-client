// import useUserRole from "../Components/Hooks/useUserRole";

import useUserRole from "../Components/Hooks/UseUserRole";

const AdminLink = ({ children }) => {
  const { role, isLoading } = useUserRole();
  //   console.log(role);

  if (isLoading)
    return <span className="loading loading-spinner loading-xl"></span>;
  if (role !== "admin") return null;

  return <>{children}</>;
};

export default AdminLink;
