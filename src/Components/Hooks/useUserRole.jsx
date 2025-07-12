// // useUserRole.js
// import { useQuery } from "@tanstack/react-query";
// // import UseAxiosSecure from "./UseAxiosSecure";
// import { use } from "react";
// import Context from "../Contexts/Context";
// import AxiosSecure from "./AxiosSecure";
// // import { useContext } from "react";
// // import { AuthContext } from "../Contexts/AuthContext";

// const useUserRole = () => {
//   const axiosSecure = AxiosSecure();
//   const { user, loading } = use(Context);

//   const { data: role, isLoading } = useQuery({
//     queryKey: ["userRole", user?.email],
//     enabled: !!user?.email && !loading,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users/role/${user.email}`);
//       return res.data.role; // e.g., "admin", "user", or "rider"
//     },
//   });

//   return { role, isLoading };
// };

// export default useUserRole;

// useUserRole.js
// import { useQuery } from "@tanstack/react-query";
// import { useContext } from "react"; // ✅ useContext is correct
// import Context from "../Contexts/Context"; // your context
// import AxiosSecure from "./AxiosSecure";
// // import AxiosSecure from "./AxiosSecure";

// const useUserRole = () => {
//   //   const axiosSecure = AxiosSecure();
//   const axiosSecure = AxiosSecure();
//   const { user, loading } = useContext(Context); // ✅ Correct hook usage

//   const { data: role, isLoading } = useQuery({
//     queryKey: ["userRole", user?.email],
//     staleTime: 0,
//     enabled: !loading && !!user?.email, // ✅ Wait until auth finishes
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users/role/${user.email}`);
//       console.log(res.data);
//       return res.data?.role || "user";
//     },
//   });
//   console.log(user, role);

//   return { role, isLoading };
// };

// export default useUserRole;

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
