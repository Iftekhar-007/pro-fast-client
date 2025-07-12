import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaUserShield, FaUserTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import AxiosSecure from "../Hooks/AxiosSecure";
// import AxiosSecure from "../Hooks/AxiosSecure";

const AdminManager = () => {
  const axiosSecure = AxiosSecure();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");

  // Fetch users with search term (only if length >= 2)
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["searchUsers", search],
    queryFn: async () => {
      if (search.length < 2) return [];
      const res = await axiosSecure.get(`/users/search?q=${search}`);
      return res.data;
    },
    enabled: search.length >= 2,
    keepPreviousData: true,
  });

  // Mutation to toggle admin role
  const roleMutation = useMutation({
    mutationFn: async ({ email, makeAdmin }) => {
      const url = makeAdmin
        ? `/users/make-admin/${email}`
        : `/users/remove-admin/${email}`;
      return axiosSecure.patch(url);
    },
    onSuccess: () => {
      // Invalidate all queries with 'searchUsers' so UI reloads fresh data
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "searchUsers",
      });
      Swal.fire("Success", "User role updated!", "success");
    },
    onError: () => {
      Swal.fire("Error", "Failed to update role", "error");
    },
  });

  // Handle click for making/removing admin
  const handleRoleToggle = (user) => {
    const makeAdmin = user.role !== "admin";

    Swal.fire({
      title: makeAdmin ? "Make Admin?" : "Remove Admin?",
      text: `Are you sure you want to ${
        makeAdmin ? "make" : "remove"
      } admin for ${user.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        roleMutation.mutate({ email: user.email, makeAdmin });
      }
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">👑 Admin Manager</h2>

      <input
        type="text"
        placeholder="Search users by email or name..."
        className="input input-bordered w-full mb-6"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {isLoading ? (
        <p className="text-center text-gray-600">Searching users...</p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-500">No users found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.role === "admin" ? "badge-success" : "badge-ghost"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      className={`btn btn-sm flex items-center gap-2 ${
                        user.role === "admin" ? "btn-warning" : "btn-success"
                      }`}
                      onClick={() => handleRoleToggle(user)}
                      disabled={roleMutation.isLoading}
                    >
                      {user.role === "admin" ? (
                        <>
                          <FaUserTimes /> Remove Admin
                        </>
                      ) : (
                        <>
                          <FaUserShield /> Make Admin
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminManager;
