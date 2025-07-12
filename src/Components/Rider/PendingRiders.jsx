import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";
import AxiosSecure from "../Hooks/AxiosSecure";

const PendingRiders = () => {
  const axiosSecure = AxiosSecure();
  const queryClient = useQueryClient();
  const [selectedRider, setSelectedRider] = useState(null);

  // ✅ Fetch pending riders
  const { data: riders = [], isLoading } = useQuery({
    queryKey: ["pendingRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/pending");
      return res.data;
    },
  });

  // ✅ Approve rider
  const approveMutation = useMutation({
    mutationFn: (rider) =>
      axiosSecure.patch(`/riders/approve/${rider._id}`, {
        email: rider.email,
      }),
    onSuccess: () => {
      toast.success("Rider approved");
      queryClient.invalidateQueries(["pendingRiders"]);
    },
    onError: () => toast.error("Approval failed"),
  });

  // ✅ Cancel rider
  const cancelMutation = useMutation({
    mutationFn: (rider) => axiosSecure.delete(`/riders/cancel/${rider._id}`),
    onSuccess: () => {
      toast.success("Application cancelled");
      queryClient.invalidateQueries(["pendingRiders"]);
    },
    onError: () => toast.error("Cancel failed"),
  });

  if (isLoading) return <p className="text-center py-8">Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🚴 Pending Rider Applications</h2>
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Region</th>
              <th>District</th>
              <th>Bike</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider) => (
              <tr key={rider._id}>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.phone}</td>
                <td>{rider.region}</td>
                <td>{rider.district}</td>
                <td>{rider.bikeName}</td>
                <td className="flex gap-2 flex-wrap">
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => approveMutation.mutate(rider)}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => cancelMutation.mutate(rider._id)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => setSelectedRider(rider)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedRider && (
        <dialog id="riderModal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-2">{selectedRider.name}</h3>
            <p>
              <strong>Email:</strong> {selectedRider.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedRider.phone}
            </p>
            <p>
              <strong>Bike:</strong> {selectedRider.bikeName} —{" "}
              {selectedRider.bikeLicense}
            </p>
            <p>
              <strong>Region:</strong> {selectedRider.region}
            </p>
            <p>
              <strong>District:</strong> {selectedRider.district}
            </p>
            <p>
              <strong>Other Info:</strong> {selectedRider.otherInfo || "N/A"}
            </p>
            <div className="modal-action">
              <button
                onClick={() => setSelectedRider(null)}
                className="btn btn-sm"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default PendingRiders;
