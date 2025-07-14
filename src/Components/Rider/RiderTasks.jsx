// // import React from "react";

// // const RiderTasks = () => {
// //   return (
// //     <div>
// //       <h1>Pendings</h1>
// //     </div>
// //   );
// // };

// // export default RiderTasks;

// // RiderTasks.jsx
// import React, { use } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { FaArrowRight } from "react-icons/fa";
// import AxiosSecure from "../Hooks/AxiosSecure";
// import Context from "../Contexts/Context";

// const RiderTasks = () => {
//   const axiosSecure = AxiosSecure();
//   const { user } = use(Context);

//   const {
//     data: tasks = [],
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["riderTasks", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/riders/tasks?email=${user.email}`);
//       return res.data;
//     },
//   });

//   if (isLoading) return <p className="text-center">⏳ Loading...</p>;
//   if (error)
//     return <p className="text-center text-red-500">❌ Error loading tasks</p>;

//   return (
//     <div className="w-11/12 mx-auto my-10">
//       <h2 className="text-2xl font-bold mb-6">📋 My Delivery Tasks</h2>
//       {tasks.length === 0 ? (
//         <p className="text-center text-gray-500">No tasks found.</p>
//       ) : (
//         <div className="overflow-x-auto bg-white shadow-md rounded-lg">
//           <table className="table table-zebra w-full">
//             <thead>
//               <tr className="bg-base-200 text-base font-semibold text-left">
//                 <th>Tracking ID</th>
//                 <th>Receiver</th>
//                 <th>Address</th>
//                 <th>Cost</th>
//                 <th>Status</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {tasks.map((task) => (
//                 <tr key={task._id}>
//                   <td>{task.trackingId}</td>
//                   <td>{task.receiverName}</td>
//                   <td>{task.receiverAddress}</td>
//                   <td>৳ {task.deliveryCost}</td>
//                   <td>
//                     <span
//                       className={`badge text-white px-3 py-1 rounded-full ${
//                         task.deliveryStatus === "rider-assigned"
//                           ? "bg-yellow-500"
//                           : "bg-blue-500"
//                       }`}
//                     >
//                       {task.deliveryStatus}
//                     </span>
//                   </td>
//                   <td>
//                     <button className="btn btn-sm btn-success flex items-center gap-2">
//                       Start Delivery <FaArrowRight />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RiderTasks;

import React, { use } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import AxiosSecure from "../Hooks/AxiosSecure";
// import { AuthContext } from "../Contexts/AuthProvider";
import { toast } from "react-toastify";
import AxiosSecure from "../Hooks/AxiosSecure";
import Context from "../Contexts/Context";

const RiderTasks = () => {
  const axiosSecure = AxiosSecure();
  const queryClient = useQueryClient();
  const { user } = use(Context);

  // Fetch rider tasks
  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["riderTasks", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/riders/tasks?email=${user.email}`);
      return res.data;
    },
  });

  // Mutation to update delivery status
  const statusMutation = useMutation({
    mutationFn: async ({ id, newStatus }) => {
      const res = await axiosSecure.patch(`/parcels/${id}/status`, {
        deliveryStatus: newStatus,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Status updated ✅");

      queryClient.invalidateQueries(["riderTasks", user?.email]);
    },
    onError: () => {
      toast.error("❌ Failed to update status");
    },
  });

  const handleStatusChange = (task) => {
    const nextStatus =
      task.deliveryStatus === "rider-assigned" ? "in-transit" : "delivered";

    statusMutation.mutate({ id: task._id, newStatus: nextStatus });
  };

  if (isLoading) return <p className="text-center">⏳ Loading tasks...</p>;
  if (error)
    return <p className="text-center text-red-500">❌ Error loading tasks.</p>;

  return (
    <div className="w-11/12 mx-auto my-10">
      <h2 className="text-2xl font-bold mb-6">Your Pending Deliveries</h2>
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">
          No assigned or in-transit deliveries found.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="bg-base-200 text-base font-semibold text-left">
                <th>Tracking ID</th>
                <th>Receiver</th>
                <th>Address</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td>{task.trackingId}</td>
                  <td>
                    <p>{task.receiverName}</p>
                    <p className="text-xs text-gray-500">
                      {task.receiverContact}
                    </p>
                  </td>
                  <td>{task.receiverAddress}</td>
                  <td>৳ {task.deliveryCost}</td>
                  <td>
                    <span
                      className={`badge ${
                        task.deliveryStatus === "rider-assigned"
                          ? "badge-warning"
                          : task.deliveryStatus === "in-transit"
                          ? "badge-info"
                          : "badge-success"
                      }`}
                    >
                      {task.deliveryStatus.replace("-", " ").toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleStatusChange(task)}
                      className={`btn btn-sm text-black ${
                        task.deliveryStatus === "rider-assigned"
                          ? "btn-primary"
                          : task.deliveryStatus === "in-transit"
                          ? "btn-success"
                          : "btn-disabled"
                      }`}
                      disabled={task.deliveryStatus === "delivered"}
                    >
                      {task.deliveryStatus === "rider-assigned"
                        ? "Picked Up"
                        : task.deliveryStatus === "in-transit"
                        ? "Delivered"
                        : "Done"}
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

export default RiderTasks;
