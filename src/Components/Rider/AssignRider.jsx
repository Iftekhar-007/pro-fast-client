// AssignRider.jsx
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import useAxiosSecure from "../Hooks/AxiosSecure";
import { FaTruck } from "react-icons/fa";
import AxiosSecure from "../Hooks/AxiosSecure";
import { Button, Dialog } from "@headlessui/react";

const AssignRider = () => {
  const axiosSecure = AxiosSecure();
  const [selectedParcel, setSelectedParcel] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRider, setSelectedRider] = useState(null);
  const queryClient = useQueryClient();

  const {
    data: parcels = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["assignableParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?paymentStatus=paid&deliveryStatus=pending"
      );
      return res.data;
    },
  });

  // 2. Fetch active riders based on region/district
  const { data: riders = [] } = useQuery({
    queryKey: ["riders", selectedParcel?.receiverRegion],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(`/riders/active`);
      return res.data.filter(
        (r) =>
          r.region === selectedParcel.receiverRegion ||
          r.district === selectedParcel.receiverDistrict
      );
    },
  });

  // 3. Mutation to assign rider to parcel
  const assignMutation = useMutation({
    mutationFn: ({ parcelId, rider }) =>
      axiosSecure.patch(`/parcels/assign-rider/${parcelId}`, {
        assignedRiderId: rider._id,
        assignedRiderName: rider.name,
        assignedRiderEmail: rider.email,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["paid-pending-parcels"]);
      setIsOpen(false);
      setSelectedParcel(null);
      setSelectedRider(null);
    },
  });

  const openModal = (parcel) => {
    setSelectedParcel(parcel);
    setIsOpen(true);
  };

  if (isLoading) return <p className="text-center">⏳ Loading...</p>;
  if (error) {
    return <p className="text-center text-red-500">❌ Error loading data</p>;
  }

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Assign Rider to Parcels</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Tracking ID</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Service Center</th>
            <th>Cost</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {parcels.map((parcel) => (
            <tr key={parcel._id}>
              <td>{parcel.trackingId}</td>
              <td>{parcel.senderName}</td>
              <td>{parcel.receiverName}</td>
              <td>{parcel.receiverServiceCenter}</td>
              <td>{parcel.deliveryCost}</td>
              <td>
                <button
                  onClick={() => openModal(parcel)}
                  className="btn btn-sm btn-primary"
                >
                  Assign Rider
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/20">
          <div className="modal modal-open">
            <div className="modal-box border shadow-2xl rounded-xl">
              <h3 className="font-bold text-lg mb-4">Assign Rider to Parcel</h3>

              {riders.length === 0 ? (
                <p className="text-red-500">
                  No rider found in same region/district
                </p>
              ) : (
                <select
                  className="select select-bordered w-full mb-4"
                  value={selectedRider?._id || ""}
                  onChange={(e) => {
                    const rider = riders.find((r) => r._id === e.target.value);
                    setSelectedRider(rider);
                  }}
                >
                  <option disabled value="">
                    Select Rider
                  </option>
                  {riders.map((rider) => (
                    <option key={rider._id} value={rider._id}>
                      {rider.name} ({rider.district})
                    </option>
                  ))}
                </select>
              )}

              <div className="modal-action">
                <button className="btn" onClick={() => setIsOpen(false)}>
                  Cancel
                </button>
                <button
                  className="btn btn-success"
                  onClick={() =>
                    assignMutation.mutate({
                      parcelId: selectedParcel._id,
                      rider: selectedRider,
                    })
                  }
                  disabled={!selectedRider}
                >
                  Confirm Assign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignRider;
