import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import Context from "../Contexts/Context";
import AxiosSecure from "./AxiosSecure";

const useUserRole = () => {
  const axiosSecure = AxiosSecure();
  const { user, loading } = useContext(Context);

  const { data: role, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    staleTime: 0,
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user.email}`);
      console.log("🔐 Role response:", res.data);
      return res.data?.role || "user";
    },
  });

  console.log("🎯 Role Hook - User:", user?.email, "Role:", role);

  return { role, isLoading };
};

export default useUserRole;
